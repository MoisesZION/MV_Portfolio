/* Renders a project detail page (project.html?id=...) from SITE_CONTENT. */
(function () {
  "use strict";

  var S = window.Site;
  var C = S.C;
  var esc = S.esc;
  var root = document.getElementById("project-root");

  S.initHeader();

  var id = new URLSearchParams(window.location.search).get("id");
  var projects = C.projects || [];
  var index = -1;
  for (var i = 0; i < projects.length; i++) {
    if (projects[i].id === id) { index = i; break; }
  }

  if (index === -1) {
    document.title = "Project not found · " + C.profile.shortName;
    root.innerHTML =
      '<nav class="breadcrumb mono" aria-label="Breadcrumb"><a href="index.html#projects">Projects</a></nav>' +
      "<h1>Project not found</h1>" +
      '<p>The project you are looking for does not exist or has been moved.</p>' +
      '<p><a class="btn btn-primary" href="index.html#projects">Back to all projects</a></p>';
    return;
  }

  var p = projects[index];
  document.title = p.title + " · " + C.profile.shortName;
  var desc = document.querySelector('meta[name="description"]');
  if (desc && p.summary) desc.setAttribute("content", p.summary);

  var SECTION_TITLES = {
    context: "Context",
    objectives: "Objectives",
    methods: "Data & methods",
    results: "Results",
  };

  var sections = Object.keys(SECTION_TITLES)
    .map(function (k) {
      var v = p.sections && p.sections[k];
      var body;
      if (Array.isArray(v)) body = v.map(function (para) { return "<p>" + esc(para) + "</p>"; }).join("");
      else if (v) body = "<p>" + esc(v) + "</p>";
      else if (k === "results" && p.status !== "completed")
        body = '<p class="muted">Results will be published once the work is complete and verified.</p>';
      else body = "<p>" + S.todo("Content to be provided") + "</p>";
      return '<section class="detail-section"><h2>' + SECTION_TITLES[k] + "</h2>" + body + "</section>";
    })
    .join("");

  function list(arr, empty) {
    return arr && arr.length
      ? "<ul>" + arr.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>"
      : "<p>" + S.todo(empty) + "</p>";
  }

  var gallery = (p.gallery || []).length
    ? '<section class="detail-section"><h2>Figures</h2><div class="gallery">' +
      p.gallery.map(function (g) { return S.figure(g); }).join("") + "</div></section>"
    : "";

  var links = (p.links || []).length
    ? "<ul class=\"link-list\">" +
      p.links.map(function (l) {
        return '<li><a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + " ↗</a></li>";
      }).join("") + "</ul>"
    : "<p>" + S.todo("No links yet") + "</p>";

  var notice = p.status === "draft"
    ? '<div class="notice" role="note"><strong>Draft entry.</strong> This page is a placeholder for a project topic. ' +
      "Its description, data, methods and results have not been confirmed yet, and images shown are placeholders.</div>"
    : p.status === "in-progress"
      ? '<div class="notice notice-progress" role="note"><strong>Work in progress.</strong> This project is still being developed; content may change.</div>'
      : "";

  var prev = projects[(index - 1 + projects.length) % projects.length];
  var next = projects[(index + 1) % projects.length];
  var pager = projects.length > 1
    ? '<nav class="pager" aria-label="More projects">' +
      '<a href="project.html?id=' + encodeURIComponent(prev.id) + '"><span class="mono">← Previous</span>' + esc(prev.title) + "</a>" +
      '<a href="project.html?id=' + encodeURIComponent(next.id) + '"><span class="mono">Next →</span>' + esc(next.title) + "</a>" +
      "</nav>"
    : "";

  root.innerHTML =
    '<nav class="breadcrumb mono" aria-label="Breadcrumb"><a href="index.html#projects">Projects</a> <span aria-hidden="true">/</span> <span aria-current="page">' + esc(p.title) + "</span></nav>" +
    '<header class="detail-head">' +
    '<div class="project-meta">' + S.statusBadge(p.status) + S.typeLabel(p.type) + (p.year ? '<span class="mono muted">' + esc(p.year) + "</span>" : "") + "</div>" +
    "<h1>" + esc(p.title) + "</h1>" +
    '<p class="detail-lead">' + esc(p.summary || "") + "</p>" +
    "</header>" +
    notice +
    S.figure(p.thumbnail, "detail-hero") +
    '<div class="detail-grid">' +
    '<div class="detail-main">' + sections + gallery + "</div>" +
    '<aside class="detail-aside" aria-label="Project facts">' +
    '<div class="aside-block"><h3 class="mono">Tools</h3>' + list(p.tools, "To be provided") + "</div>" +
    '<div class="aside-block"><h3 class="mono">Data</h3>' + list(p.data, "To be provided") + "</div>" +
    '<div class="aside-block"><h3 class="mono">Topics</h3>' + list(p.tags, "—") + "</div>" +
    '<div class="aside-block"><h3 class="mono">Links</h3>' + links + "</div>" +
    "</aside>" +
    "</div>" +
    pager;
})();
