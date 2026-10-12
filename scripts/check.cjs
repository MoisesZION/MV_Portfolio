/*
 * Smoke test for the static site.
 *   npm i -D playwright   (or have it installed globally)
 *   node scripts/check.cjs [--screenshots DIR]
 *
 * Serves the repository root, then for desktop and mobile viewports checks:
 * console/page errors, broken images, broken in-page anchors, every project
 * detail page, the unknown-project fallback, horizontal overflow, mobile nav.
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const shotsIdx = process.argv.indexOf("--screenshots");
const SHOTS = shotsIdx > -1 ? process.argv[shotsIdx + 1] : null;
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".pdf": "application/pdf" };

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (p.endsWith("/")) p += "index.html";
  const file = path.join(ROOT, p);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404, { "content-type": "text/html" });
    return fs.createReadStream(path.join(ROOT, "404.html")).pipe(res);
  }
  res.writeHead(200, { "content-type": TYPES[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});

const failures = [];
const fail = (msg) => { failures.push(msg); console.log("  ✗ " + msg); };
const ok = (msg) => console.log("  ✓ " + msg);

async function checkPage(page, url, label) {
  const errors = [];
  page.removeAllListeners("console");
  page.removeAllListeners("pageerror");
  page.on("console", (m) => { if (m.type() === "error" && !/fonts\.(googleapis|gstatic)/.test(m.text())) errors.push(m.text()); });
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(url, { waitUntil: "load" });
  await page.waitForTimeout(300);
  errors.length ? fail(`${label}: JS errors: ${errors.join(" | ")}`) : ok(`${label}: no JS errors`);

  // Scroll through the page so lazy-loaded images are requested.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState("networkidle");
  const broken = await page.$$eval("img", (imgs) => imgs.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.getAttribute("src")));
  broken.length ? fail(`${label}: broken images ${broken}`) : ok(`${label}: all images loaded`);

  const missingAlt = await page.$$eval("img", (imgs) => imgs.filter((i) => !i.hasAttribute("alt")).length);
  missingAlt ? fail(`${label}: ${missingAlt} images without alt`) : ok(`${label}: images have alt text`);

  const badAnchors = await page.$$eval("a[href^='#']", (as) => as.map((a) => a.getAttribute("href")).filter((h) => h.length > 1 && !document.getElementById(h.slice(1))));
  badAnchors.length ? fail(`${label}: missing anchor targets ${badAnchors}`) : ok(`${label}: in-page anchors resolve`);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  overflow > 1 ? fail(`${label}: horizontal overflow ${overflow}px`) : ok(`${label}: no horizontal overflow`);

  const h1 = await page.$$eval("h1", (h) => h.length);
  h1 === 1 ? ok(`${label}: one h1`) : fail(`${label}: ${h1} h1 elements`);
}

(async () => {
  await new Promise((r) => server.listen(0, r));
  const base = `http://127.0.0.1:${server.address().port}/`;
  const browser = await chromium.launch();
  const content = fs.readFileSync(path.join(ROOT, "assets/js/content.js"), "utf8");
  const ids = [...content.matchAll(/^\s{6}id: "([^"]+)"/gm)].map((m) => m[1]);

  for (const vp of [{ name: "desktop", width: 1366, height: 860 }, { name: "mobile", width: 390, height: 844, isMobile: true, hasTouch: true }]) {
    console.log(`\n[${vp.name}]`);
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: !!vp.isMobile, hasTouch: !!vp.hasTouch, reducedMotion: "reduce" });
    const page = await ctx.newPage();

    await checkPage(page, base, "home");
    const cards = await page.$$eval(".project-card", (c) => c.length);
    cards === ids.length ? ok(`home: ${cards} project cards rendered`) : fail(`home: ${cards} cards, expected ${ids.length}`);
    for (const sec of ["about", "experience", "projects", "skills", "education", "contact"]) {
      const filled = await page.$eval(`#${sec}`, (s) => s.innerText.trim().length > 40).catch(() => false);
      filled ? ok(`home: #${sec} has content`) : fail(`home: #${sec} empty or missing`);
    }

    if (vp.name === "mobile") {
      const navHidden = await page.$eval("#site-nav", (n) => getComputedStyle(n).display === "none");
      await page.click(".nav-toggle");
      const navShown = await page.$eval("#site-nav", (n) => getComputedStyle(n).display !== "none");
      await page.click("#site-nav a[href='#skills']");
      await page.waitForTimeout(400);
      const closed = await page.$eval(".nav-toggle", (b) => b.getAttribute("aria-expanded") === "false");
      navHidden && navShown && closed ? ok("mobile nav opens, navigates and closes") : fail("mobile nav toggle misbehaves");
    }

    if (SHOTS) {
      fs.mkdirSync(SHOTS, { recursive: true });
      await page.goto(base, { waitUntil: "load" });
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(SHOTS, `${vp.name}-home.png`), fullPage: true });
      await page.emulateMedia({ colorScheme: "dark" });
      await page.screenshot({ path: path.join(SHOTS, `${vp.name}-home-dark.png`) });
      await page.emulateMedia({ colorScheme: "light" });
    }

    for (const id of ids) {
      await checkPage(page, `${base}project.html?id=${id}`, `project ${id}`);
      if (SHOTS && id === ids[0]) await page.screenshot({ path: path.join(SHOTS, `${vp.name}-project.png`), fullPage: true });
    }

    await page.goto(`${base}project.html?id=does-not-exist`);
    (await page.textContent("h1")) === "Project not found" ? ok("unknown project shows fallback") : fail("unknown project fallback missing");

    const res = await page.goto(`${base}nope/missing`);
    res.status() === 404 && (await page.textContent("h1")) === "Page not found" ? ok("404 page served") : fail("404 page not served");
    await ctx.close();
  }

  await browser.close();
  server.close();
  console.log(failures.length ? `\n${failures.length} check(s) failed` : "\nAll checks passed");
  process.exit(failures.length ? 1 : 0);
})().catch((e) => { console.error(e); server.close(); process.exit(1); });
