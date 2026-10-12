# Moisés Varela · Portfolio

Personal portfolio of Moisés Eduardo Varela Almario, Environmental Engineer working in GIS, remote sensing, geospatial analysis and sustainability.

A static site (HTML, CSS and vanilla JavaScript). No framework and no build step, so it can be served by GitHub Pages as is.

## Structure

```
index.html              Home page: hero, about, experience, projects, skills, education, contact
project.html            Project detail page, rendered from the URL: project.html?id=<project-id>
404.html                Not-found page (self-contained)
assets/js/content.js    ALL site content. Edit this file to update the portfolio
assets/js/common.js     Shared helpers: project card, header/nav, theme, contour drawing
assets/js/main.js       Renders the home page
assets/js/project.js    Renders a project detail page
assets/css/styles.css   Styles, light and dark themes
assets/img/             Favicon and placeholder graphics
scripts/check.cjs       Browser smoke test (Playwright)
.github/workflows/pages.yml  GitHub Pages deployment (runs on push to main)
```

## Editing content

Everything lives in `assets/js/content.js`.

- Values set to `null` show a small "To be provided" marker on the page. Replace them with real details, or leave them until ready.
- **Projects**: each entry has a `status` (`"completed"`, `"in-progress"` or `"draft"`) and an optional `type` (`"professional"`, `"academic"`, `"personal"`). The status is shown as a badge and used by the filter buttons. A commented template at the end of the `projects` array shows a fully filled entry.
- **Images**: add files under `assets/img/` (for example `assets/img/projects/`), then reference them in `thumbnail` or `gallery`. Set `placeholder: false` for genuine visuals; `placeholder: true` adds a visible "Placeholder image" label.
- **Portrait and CV**: set `profile.photo` and `profile.cvUrl`. The "Download CV" button appears only when `cvUrl` is set.

The hero illustration is a procedurally generated contour pattern drawn on a canvas. It is decorative, labelled as such, and does not represent real data.

## Preview locally

Any static file server works, from the repository root:

```bash
python3 -m http.server 8000
# or
npx serve .
```

Then open http://localhost:8000.

## Test

```bash
npm install --no-save playwright
npx playwright install chromium
node scripts/check.cjs                 # add --screenshots shots/ to save screenshots
```

The script checks desktop and mobile layouts for JavaScript errors, broken images, missing alt text, broken in-page anchors, horizontal overflow, the mobile menu, every project page, and the 404 page.

## Publish with GitHub Pages

1. Make sure the site is on the `main` branch (merge the working branch into `main`).
2. In the repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
3. Push to `main` (or run the "Deploy to GitHub Pages" workflow manually from the **Actions** tab).

The site will be available at `https://moiseszion.github.io/MV_Portfolio/`. All paths are relative, so it also works on a custom domain or a `<username>.github.io` repository.

Alternative without Actions: **Settings → Pages → Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
