/* Renders the single-page home (index.html) from SITE_CONTENT. */
(function () {
  "use strict";

  var S = window.Site;
  var C = S.C;
  var esc = S.esc;

  function $(id) { return document.getElementById(id); }

  function get(path) {
    return path.split(".").reduce(function (o, k) { return o ? o[k] : undefined; }, C);
  }

  /* Simple text bindings: <el data-bind="profile.name"> */
  document.querySelectorAll("[data-bind]").forEach(function (el) {
    var v = get(el.getAttribute("data-bind"));
    if (v) el.textContent = v;
  });

  /* ---------- hero ---------- */
  var kw = $("hero-keywords");
  if (kw) kw.innerHTML = (C.profile.keywords || []).map(function (k) { return "<li>" + esc(k) + "</li>"; }).join("");

  if (C.profile.cvUrl) {
    var cv = $("cv-link");
    cv.href = C.profile.cvUrl;
    cv.hidden = false;
  }

  /* ---------- about ---------- */
  var photo = $("about-photo");
  if (photo) {
    photo.innerHTML = C.profile.photo
      ? '<img src="' + esc(C.profile.photo) + '" alt="Portrait of ' + esc(C.profile.name) + '" />'
      : '<div class="initials" aria-hidden="true"><span>' + esc(C.profile.initials) + "</span></div>";
  }
  $("about-text").innerHTML = (C.profile.about || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
  $("about-facts").innerHTML = (C.profile.facts || [])
    .map(function (f) {
      return '<div class="fact"><dt class="mono">' + esc(f.label) + "</dt><dd>" + S.valueOrTodo(f.value) + "</dd></div>";
    })
    .join("");

  /* ---------- experience ---------- */
  $("experience-list").innerHTML = (C.experience || [])
    .map(function (x) {
      var org = x.organizationUrl
        ? '<a href="' + esc(x.organizationUrl) + '" target="_blank" rel="noopener">' + esc(x.organization) + "</a>"
        : esc(x.organization);
      var hl = x.highlights && x.highlights.length
        ? "<ul class=\"highlights\">" + x.highlights.map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("") + "</ul>"
        : '<p class="muted">' + S.todo("Responsibilities to be added") + "</p>";
      var tags = (x.tags || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
      return (
        '<li class="timeline-item">' +
        '<div class="timeline-period mono">' + esc(x.start) + " — " + esc(x.end) + "</div>" +
        '<div class="timeline-body">' +
        "<h3>" + esc(x.role) + "</h3>" +
        '<p class="timeline-org">' + org + (x.location ? ' <span class="muted">· ' + esc(x.location) + "</span>" : "") + "</p>" +
        hl +
        (tags ? '<ul class="tag-list">' + tags + "</ul>" : "") +
        "</div></li>"
      );
    })
    .join("");

  /* ---------- projects + filters ---------- */
  var projects = C.projects || [];
  var grid = $("project-grid");
  var filters = $("project-filters");

  var filterDefs = [{ key: "all", label: "All" }];
  ["completed", "in-progress", "draft"].forEach(function (k) {
    var n = projects.filter(function (p) { return (p.status || "draft") === k; }).length;
    if (n) filterDefs.push({ key: k, label: S.STATUS[k].label.split(" ·")[0], count: n });
  });
  ["academic", "professional"].forEach(function (k) {
    var n = projects.filter(function (p) { return p.type === k; }).length;
    if (n) filterDefs.push({ key: "type:" + k, label: S.TYPE[k], count: n });
  });

  function renderProjects(key) {
    var list = projects.filter(function (p) {
      if (key === "all") return true;
      if (key.indexOf("type:") === 0) return p.type === key.slice(5);
      return (p.status || "draft") === key;
    });
    grid.innerHTML = list.length
      ? list.map(S.projectCard).join("")
      : '<p class="muted">No projects in this category yet.</p>';
  }

  if (filterDefs.length > 2) {
    filters.innerHTML = filterDefs
      .map(function (f, i) {
        return (
          '<button type="button" class="chip" data-filter="' + esc(f.key) + '" aria-pressed="' + (i === 0) + '">' +
          esc(f.label) + (f.count ? ' <span class="chip-count">' + f.count + "</span>" : "") + "</button>"
        );
      })
      .join("");
    filters.addEventListener("click", function (e) {
      var btn = e.target.closest(".chip");
      if (!btn) return;
      filters.querySelectorAll(".chip").forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      renderProjects(btn.getAttribute("data-filter"));
    });
  } else {
    filters.hidden = true;
  }
  renderProjects("all");

  /* ---------- skills ---------- */
  $("skills-grid").innerHTML = (C.skills || [])
    .map(function (g, i) {
      return (
        '<div class="skill-group">' +
        '<h3><span class="mono skill-index">' + String(i + 1).padStart(2, "0") + "</span>" + esc(g.group) + "</h3>" +
        "<ul>" + g.items.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>" +
        "</div>"
      );
    })
    .join("");

  /* ---------- education & certifications ---------- */
  $("education-list").innerHTML = (C.education || [])
    .map(function (e) {
      var badgeCls = /progress/i.test(e.status || "") ? "status-progress" : "status-completed";
      return (
        '<li class="edu-item">' +
        '<div class="edu-top"><h4>' + esc(e.title) + "</h4>" +
        (e.status ? '<span class="badge ' + badgeCls + '">' + esc(e.status) + "</span>" : "") + "</div>" +
        '<p class="edu-inst">' + S.valueOrTodo(e.institution, "Institution to be provided") + "</p>" +
        '<p class="mono muted">' + S.valueOrTodo(e.period, "Dates to be provided") + "</p>" +
        (e.notes ? "<p>" + esc(e.notes) + "</p>" : "") +
        "</li>"
      );
    })
    .join("");

  var certs = C.certifications || [];
  $("cert-list").innerHTML = certs.length
    ? certs
        .map(function (c) {
          var title = c.url
            ? '<a href="' + esc(c.url) + '" target="_blank" rel="noopener">' + esc(c.title) + "</a>"
            : esc(c.title);
          return (
            '<li class="edu-item cert-item"><h4>' + title + "</h4>" +
            '<p class="edu-inst">' + S.valueOrTodo(c.issuer, "Issuer to be provided") + "</p>" +
            (c.year ? '<p class="mono muted">' + esc(c.year) + "</p>" : "") + "</li>"
          );
        })
        .join("")
    : '<li class="edu-item edu-empty">' + S.todo("Certifications to be added") + "</li>";

  /* ---------- contact ---------- */
  var ct = C.contact || {};
  $("contact-intro").textContent = ct.intro || "";
  var items = [];
  if (ct.email) items.push({ label: "Email", value: ct.email, href: "mailto:" + ct.email });
  if (ct.linkedin) items.push({ label: "LinkedIn", value: ct.linkedin.replace(/^https?:\/\/(www\.)?/, ""), href: ct.linkedin });
  if (ct.github) items.push({ label: "GitHub", value: ct.github.replace(/^https?:\/\/(www\.)?/, ""), href: ct.github });
  if (ct.location) items.push({ label: "Location", value: ct.location });

  $("contact-list").innerHTML = items.length
    ? items
        .map(function (it) {
          var val = it.href
            ? '<a href="' + esc(it.href) + '"' + (/^http/.test(it.href) ? ' target="_blank" rel="noopener"' : "") + ">" + esc(it.value) + "</a>"
            : esc(it.value);
          return '<li><span class="mono contact-label">' + esc(it.label) + "</span>" + val + "</li>";
        })
        .join("")
    : '<li><span class="mono contact-label">Email · LinkedIn · GitHub</span>' + S.todo("Contact details to be provided") + "</li>";

  /* ---------- behaviour ---------- */
  S.initHeader();
  S.drawContours($("contour-canvas"), 11);

  // Highlight the nav link for the section in view.
  var links = Array.prototype.slice.call(document.querySelectorAll(".site-nav a[href^='#']"));
  if ("IntersectionObserver" in window && links.length) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && map[en.target.id]) {
            links.forEach(function (a) { a.removeAttribute("aria-current"); });
            map[en.target.id].setAttribute("aria-current", "true");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    Object.keys(map).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) io.observe(sec);
    });
  }

  // Gentle reveal on scroll (skipped when the user prefers reduced motion).
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var revealIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            revealIO.unobserve(en.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".section .container").forEach(function (el) {
      el.classList.add("reveal");
      revealIO.observe(el);
    });
  }
})();
