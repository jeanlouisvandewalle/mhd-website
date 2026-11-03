(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");
  var root = document.body.getAttribute("data-root") || "";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Header: transparant boven de hero, vast zodra je scrolt, verbergt bij naar beneden scrollen */
  var header = document.querySelector(".site-header");
  var lastY = window.scrollY;
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle("is-solid", y > 40);
    header.classList.toggle("is-hidden", y > 400 && y > lastY && !document.body.classList.contains("menu-open"));
    lastY = y;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobiel menu */
  var burger = document.querySelector(".burger");
  if (burger) {
    burger.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      burger.setAttribute("aria-expanded", open);
    });
    document.querySelectorAll(".nav a").forEach(function (a) {
      a.addEventListener("click", function () { document.body.classList.remove("menu-open"); });
    });
  }

  /* Elementen laten verschijnen bij het scrollen */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    document.querySelectorAll(".reveal, .reveal-img").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal, .reveal-img").forEach(function (el) { el.classList.add("is-in"); });
  }

  /* Lichte parallax op brede beeldbanden */
  var bands = document.querySelectorAll(".band img");
  if (bands.length && !reduce) {
    var tick = false;
    var para = function () {
      bands.forEach(function (img) {
        var r = img.parentNode.getBoundingClientRect();
        var p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        img.style.transform = "translate3d(0," + (p * -8) + "%,0)";
      });
      tick = false;
    };
    window.addEventListener("scroll", function () { if (!tick) { tick = true; requestAnimationFrame(para); } }, { passive: true });
    para();
  }

  /* Filter op realisaties */
  var filterBar = document.querySelector(".filters");
  if (filterBar) {
    filterBar.addEventListener("click", function (e) {
      var btn = e.target.closest("button");
      if (!btn) return;
      var cat = btn.getAttribute("data-filter");
      filterBar.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", b === btn); });
      document.querySelectorAll(".projects .project").forEach(function (p) {
        var show = cat === "alles" || (p.getAttribute("data-cats") || "").split(" ").indexOf(cat) > -1;
        p.classList.toggle("is-hidden", !show);
      });
    });
  }

  /* Projectviewer: klik op een cover en blader door het volledige project */
  var data = window.MHD_PROJECTS || [];
  var viewer, track, countEl, bar, prevBtn, nextBtn, current = null, lastFocus = null;
  var arrowL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M15 5l-7 7 7 7"/></svg>';
  var arrowR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M9 5l7 7-7 7"/></svg>';

  function buildViewer() {
    viewer = document.createElement("div");
    viewer.className = "viewer";
    viewer.setAttribute("role", "dialog");
    viewer.setAttribute("aria-modal", "true");
    viewer.setAttribute("aria-label", "Project");
    viewer.innerHTML =
      '<div class="viewer__bar"><div class="viewer__title"></div>' +
      '<button class="viewer__close" aria-label="Sluiten"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M5 5l14 14M19 5L5 19"/></svg></button></div>' +
      '<div class="viewer__track" tabindex="0"></div>' +
      '<div class="viewer__foot"><div class="viewer__count"></div><div class="viewer__progress"><i></i></div>' +
      '<div class="viewer__arrows"><button class="v-prev" aria-label="Vorige foto">' + arrowL + '</button><button class="v-next" aria-label="Volgende foto">' + arrowR + "</button></div></div>";
    document.body.appendChild(viewer);
    track = viewer.querySelector(".viewer__track");
    countEl = viewer.querySelector(".viewer__count");
    bar = viewer.querySelector(".viewer__progress i");
    prevBtn = viewer.querySelector(".v-prev");
    nextBtn = viewer.querySelector(".v-next");
    viewer.querySelector(".viewer__close").addEventListener("click", closeViewer);
    prevBtn.addEventListener("click", function () { go(-1); });
    nextBtn.addEventListener("click", function () { go(1); });
    track.addEventListener("scroll", function () { requestAnimationFrame(update); }, { passive: true });

    /* Verticaal scrollen (muiswiel / trackpad) bladert ook door de foto's */
    var wheelLock = false;
    track.addEventListener("wheel", function (e) {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      if (wheelLock || Math.abs(e.deltaY) < 8) return;
      wheelLock = true;
      go(e.deltaY > 0 ? 1 : -1);
      setTimeout(function () { wheelLock = false; }, 650);
    }, { passive: false });

    document.addEventListener("keydown", function (e) {
      if (!viewer.classList.contains("is-open")) return;
      if (e.key === "Escape") closeViewer();
      else if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); go(1); }
      else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); go(-1); }
      else if (e.key === "Tab") {
        var f = viewer.querySelectorAll("button, [tabindex='0']");
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    });
  }

  function slideIndex() { return Math.round(track.scrollLeft / track.clientWidth); }
  function total() { return track.children.length; }
  function go(d) {
    var i = Math.max(0, Math.min(total() - 1, slideIndex() + d));
    track.scrollTo({ left: i * track.clientWidth, behavior: reduce ? "auto" : "smooth" });
  }
  function update() {
    if (!current) return;
    var i = slideIndex(), n = current.images.length;
    countEl.textContent = i === 0 ? "Intro" : i + " / " + n;
    bar.style.width = (i / n) * 100 + "%";
    prevBtn.disabled = i === 0;
    nextBtn.disabled = i >= total() - 1;
  }

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function openViewer(slug, push) {
    var p = data.filter(function (x) { return x.slug === slug; })[0];
    if (!p) return;
    if (!viewer) buildViewer();
    current = p;
    lastFocus = document.activeElement;
    var base = root + "assets/img/projecten/" + p.slug + "/";
    viewer.setAttribute("aria-label", p.title);
    viewer.querySelector(".viewer__title").innerHTML = esc(p.title) + "<small>" + esc(p.location) + " · " + esc(p.tags) + "</small>";
    var html =
      '<div class="viewer__slide viewer__slide--intro"><div class="viewer__intro"><span class="eyebrow">Project ' + esc(p.no) + "</span>" +
      "<h2>" + esc(p.title) + "</h2><p>" + esc(p.text) + "</p><dl>" +
      p.specs.map(function (s) { return "<dt>" + esc(s[0]) + "</dt><dd>" + esc(s[1]) + "</dd>"; }).join("") +
      '</dl><p style="margin-top:34px"><button class="link v-start">Bekijk de foto\'s ' + arrowR + "</button></p></div></div>";
    p.images.forEach(function (im, i) {
      html += '<figure class="viewer__slide" style="margin:0"><img src="' + base + im.f + '.webp" width="' + im.w + '" height="' + im.h +
        '" alt="' + esc(p.title) + " — foto " + (i + 1) + '" ' + (i > 1 ? 'loading="lazy"' : "") + ' decoding="async"></figure>';
    });
    track.innerHTML = html;
    track.querySelector(".v-start").addEventListener("click", function () { go(1); });
    track.scrollLeft = 0;
    viewer.classList.add("is-open");
    document.body.classList.add("viewer-open");
    update();
    setTimeout(function () { viewer.querySelector(".viewer__close").focus(); }, 50);
    if (push !== false) history.pushState({ project: slug }, "", "#" + slug);
  }

  function closeViewer(fromPop) {
    if (!viewer || !viewer.classList.contains("is-open")) return;
    viewer.classList.remove("is-open");
    document.body.classList.remove("viewer-open");
    current = null;
    if (fromPop !== true && location.hash) history.pushState({}, "", location.pathname + location.search);
    if (lastFocus) lastFocus.focus();
  }

  document.addEventListener("click", function (e) {
    var card = e.target.closest("[data-project]");
    if (card) { e.preventDefault(); openViewer(card.getAttribute("data-project")); }
  });
  window.addEventListener("popstate", function () {
    var slug = location.hash.slice(1);
    if (slug && data.some(function (x) { return x.slug === slug; })) openViewer(slug, false);
    else closeViewer(true);
  });
  window.addEventListener("resize", function () {
    if (current) track.scrollLeft = slideIndex() * track.clientWidth;
  });
  if (location.hash.length > 1 && data.some(function (x) { return x.slug === location.hash.slice(1); })) {
    openViewer(location.hash.slice(1), false);
  }

  /* Contactformulier (statische site: verzonden via FormSubmit) */
  var form = document.querySelector("form[data-endpoint]");
  if (form) {
    var status = form.querySelector(".form__status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var btn = form.querySelector("[type=submit]");
      btn.disabled = true;
      status.className = "form__status";
      status.textContent = "Bericht wordt verzonden…";
      fetch(form.getAttribute("data-endpoint"), {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      }).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        form.reset();
        status.className = "form__status is-ok";
        status.textContent = "Dank u. We nemen binnen twee werkdagen contact met u op.";
      }).catch(function () {
        status.className = "form__status is-error";
        status.innerHTML = 'Verzenden lukte niet. Mail ons gerust rechtstreeks via <a href="mailto:info@totaalprojecten-mhd.be">info@totaalprojecten-mhd.be</a>.';
      }).then(function () { btn.disabled = false; });
    });
  }
})();
