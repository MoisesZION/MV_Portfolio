/* Shared helpers used by index.html and project.html. */
(function () {
  "use strict";

  var C = window.SITE_CONTENT;

  /* ---------- small DOM helpers ---------- */
  function esc(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function todo(label) {
    return '<span class="todo" title="Not provided yet">' + esc(label || "To be provided") + "</span>";
  }

  function valueOrTodo(v, label) {
    return v ? esc(v) : todo(label);
  }

  var STATUS = {
    completed: { label: "Completed", cls: "status-completed" },
    "in-progress": { label: "In progress", cls: "status-progress" },
    draft: { label: "Draft · details pending", cls: "status-draft" },
  };

  var TYPE = {
    professional: "Professional",
    academic: "Academic",
    personal: "Personal",
  };

  function statusBadge(status) {
    var s = STATUS[status] || STATUS.draft;
    return '<span class="badge ' + s.cls + '">' + esc(s.label) + "</span>";
  }

  function typeLabel(type) {
    return type && TYPE[type] ? '<span class="type-label mono">' + esc(TYPE[type]) + "</span>" : "";
  }

  function figure(img, extraClass) {
    if (!img || !img.src) return "";
    return (
      '<figure class="media ' + (extraClass || "") + (img.placeholder ? " is-placeholder" : "") + '">' +
      '<img src="' + esc(img.src) + '" alt="' + esc(img.alt || "") + '" loading="lazy" decoding="async" />' +
      (img.placeholder ? '<span class="placeholder-tag mono">Placeholder image</span>' : "") +
      (img.caption ? "<figcaption>" + esc(img.caption) + "</figcaption>" : "") +
      "</figure>"
    );
  }

  /* Reusable project card. */
  function projectCard(p) {
    var tags = (p.tags || [])
      .map(function (t) { return "<li>" + esc(t) + "</li>"; })
      .join("");
    return (
      '<article class="project-card" data-status="' + esc(p.status || "draft") + '">' +
      '<a class="project-card-link" href="project.html?id=' + encodeURIComponent(p.id) + '">' +
      figure(p.thumbnail, "card-media") +
      '<div class="project-card-body">' +
      '<div class="project-meta">' + statusBadge(p.status) + typeLabel(p.type) +
      (p.year ? '<span class="mono muted">' + esc(p.year) + "</span>" : "") + "</div>" +
      "<h3>" + esc(p.title) + "</h3>" +
      "<p>" + esc(p.summary || "") + "</p>" +
      (tags ? '<ul class="tag-list">' + tags + "</ul>" : "") +
      '<span class="card-cta mono">View details <span aria-hidden="true">→</span></span>' +
      "</div></a></article>"
    );
  }

  /* ---------- header: mobile nav + theme ---------- */
  function initHeader() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!open));
        nav.classList.toggle("is-open", !open);
      });
      nav.addEventListener("click", function (e) {
        if (e.target.closest("a")) {
          toggle.setAttribute("aria-expanded", "false");
          nav.classList.remove("is-open");
        }
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && nav.classList.contains("is-open")) {
          toggle.setAttribute("aria-expanded", "false");
          nav.classList.remove("is-open");
          toggle.focus();
        }
      });
    }

    var themeBtn = document.querySelector(".theme-toggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", function () {
        var root = document.documentElement;
        var current = root.getAttribute("data-theme");
        if (!current) {
          current = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }
        var next = current === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        try { localStorage.setItem("theme", next); } catch (e) {}
        document.dispatchEvent(new CustomEvent("themechange"));
      });
    }

    var header = document.querySelector(".site-header");
    if (header) {
      var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  }

  /* ---------- decorative contour lines (procedural, not real data) ---------- */
  function drawContours(canvas, seed) {
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");

    // Deterministic pseudo-random generator so the pattern is stable.
    function rng(s) {
      return function () {
        s = (s * 1664525 + 1013904223) % 4294967296;
        return s / 4294967296;
      };
    }

    function render() {
      var rect = canvas.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = Math.max(1, Math.round(rect.width));
      var h = Math.max(1, Math.round(rect.height));
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      var styles = getComputedStyle(document.documentElement);
      var lineColor = styles.getPropertyValue("--contour").trim() || "#3a6b55";
      var majorColor = styles.getPropertyValue("--contour-major").trim() || lineColor;

      // Sum of a few gaussian "hills" gives a smooth terrain-like field.
      var r = rng(seed || 7);
      var hills = [];
      for (var i = 0; i < 10; i++) {
        hills.push({
          x: r() * w, y: r() * h,
          s: (0.12 + r() * 0.22) * Math.max(w, h),
          a: (r() > 0.25 ? 1 : -0.6) * (0.5 + r()),
        });
      }
      function field(x, y) {
        var v = 0;
        for (var k = 0; k < hills.length; k++) {
          var hh = hills[k], dx = x - hh.x, dy = y - hh.y;
          v += hh.a * Math.exp(-(dx * dx + dy * dy) / (2 * hh.s * hh.s));
        }
        return v;
      }

      var step = 6;
      var cols = Math.ceil(w / step) + 1, rows = Math.ceil(h / step) + 1;
      var grid = new Float32Array(cols * rows);
      var min = Infinity, max = -Infinity;
      for (var y = 0; y < rows; y++) {
        for (var x = 0; x < cols; x++) {
          var v = field(x * step, y * step);
          grid[y * cols + x] = v;
          if (v < min) min = v;
          if (v > max) max = v;
        }
      }

      var levels = 24;
      for (var l = 1; l < levels; l++) {
        var iso = min + ((max - min) * l) / levels;
        var major = l % 5 === 0;
        ctx.strokeStyle = major ? majorColor : lineColor;
        ctx.lineWidth = major ? 1.4 : 0.8;
        ctx.beginPath();
        // Marching squares, emitting one segment per cell.
        for (var cy = 0; cy < rows - 1; cy++) {
          for (var cx = 0; cx < cols - 1; cx++) {
            var a = grid[cy * cols + cx], b = grid[cy * cols + cx + 1];
            var c = grid[(cy + 1) * cols + cx + 1], d = grid[(cy + 1) * cols + cx];
            var idx = (a > iso ? 8 : 0) | (b > iso ? 4 : 0) | (c > iso ? 2 : 0) | (d > iso ? 1 : 0);
            if (idx === 0 || idx === 15) continue;
            var x0 = cx * step, y0 = cy * step;
            var top = [x0 + step * ((iso - a) / (b - a)), y0];
            var right = [x0 + step, y0 + step * ((iso - b) / (c - b))];
            var bottom = [x0 + step * ((iso - d) / (c - d)), y0 + step];
            var left = [x0, y0 + step * ((iso - a) / (d - a))];
            var segs;
            switch (idx) {
              case 1: case 14: segs = [left, bottom]; break;
              case 2: case 13: segs = [bottom, right]; break;
              case 3: case 12: segs = [left, right]; break;
              case 4: case 11: segs = [top, right]; break;
              case 6: case 9: segs = [top, bottom]; break;
              case 7: case 8: segs = [left, top]; break;
              case 5: segs = [left, top, bottom, right]; break;
              case 10: segs = [left, bottom, top, right]; break;
            }
            for (var sgi = 0; sgi < segs.length; sgi += 2) {
              ctx.moveTo(segs[sgi][0], segs[sgi][1]);
              ctx.lineTo(segs[sgi + 1][0], segs[sgi + 1][1]);
            }
          }
        }
        ctx.stroke();
      }
    }

    render();
    var t;
    window.addEventListener("resize", function () {
      clearTimeout(t);
      t = setTimeout(render, 150);
    });
    document.addEventListener("themechange", render);
    if (window.matchMedia) {
      var mq = window.matchMedia("(prefers-color-scheme: dark)");
      if (mq.addEventListener) mq.addEventListener("change", render);
    }
  }

  window.Site = {
    C: C,
    esc: esc,
    todo: todo,
    valueOrTodo: valueOrTodo,
    STATUS: STATUS,
    TYPE: TYPE,
    statusBadge: statusBadge,
    typeLabel: typeLabel,
    figure: figure,
    projectCard: projectCard,
    initHeader: initHeader,
    drawContours: drawContours,
  };
})();
