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

The site is published straight from the `main` branch. One-time setup:

1. Open **Settings → Pages** in the repository.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose **main** and **/ (root)**, and save.

After a minute or two the site is live at `https://moiseszion.github.io/MV_Portfolio/`.

## Updating the site

The repository folder *is* the website. Whatever is on `main` is what visitors see, and GitHub republishes automatically a minute or two after every change.

- **On github.com:** open the folder you want (for example `assets/img/projects/`), click **Add file → Upload files**, drop your files and click **Commit changes**. To change text, open `assets/js/content.js`, click the pencil icon, edit and commit.
- **From your computer:** clone the repository with GitHub Desktop, edit or copy files into that local folder, then **Commit to main** and **Push origin**.

Typical changes:

| You want to… | Do this |
|---|---|
| Change any text | Edit `assets/js/content.js` |
| Add a project image | Upload it to `assets/img/projects/` and set its path in the project's `thumbnail` or `gallery` |
| Add your photo | Upload `assets/img/profile.jpg` and set `profile.photo` |
| Add your CV | Upload `assets/docs/CV.pdf` and set `profile.cvUrl` |
| Change colours or fonts | Edit `assets/css/styles.css` (the variables at the top) |
