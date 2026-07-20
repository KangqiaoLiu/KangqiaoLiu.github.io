(function () {
  "use strict";

  var body = document.body;
  if (!body.classList.contains("is-archive-page")) return;

  var archive = document.querySelector(".archive");
  var metrics = document.getElementById("subpage-metrics");
  var isZh = body.classList.contains("is-zh");
  if (!archive) return;

  function label(en, zh) {
    return isZh ? zh : en;
  }

  function addMetric(value, text) {
    if (!metrics) return;
    var item = document.createElement("span");
    item.className = "subpage-metric";
    item.innerHTML = "<strong>" + value + "</strong><span>" + text + "</span>";
    metrics.appendChild(item);
  }

  function firstYear(text) {
    var match = text.match(/\b(?:19|20)\d{2}\b/);
    return match ? match[0] : "";
  }

  function addYearBadge(item) {
    var year = firstYear(item.textContent || "");
    if (!year || item.querySelector(":scope > .entry-year")) return;
    var badge = document.createElement("span");
    badge.className = "entry-year";
    badge.textContent = year;
    item.insertBefore(badge, item.firstChild);
  }

  function promoteLeadingDate(item) {
    var nodes = Array.prototype.slice.call(item.childNodes);
    for (var index = 0; index < nodes.length; index += 1) {
      var node = nodes[index];
      if (node.nodeType !== Node.TEXT_NODE) continue;
      var match = node.nodeValue.match(/^\s*((?:19|20)\d{2}[^\n]*)\s*(?:\n|$)/);
      if (!match) continue;

      var badge = document.createElement("span");
      badge.className = "entry-year";
      badge.textContent = match[1].trim();
      node.nodeValue = node.nodeValue.slice(match[0].length);
      item.insertBefore(badge, node);
      return;
    }
  }

  function promoteTeachingDate(item) {
    var date = item.querySelector(":scope > strong:first-child, :scope > p > strong:first-child");
    if (date && firstYear(date.textContent || "")) date.classList.add("entry-year");
  }

  function reveal(elements) {
    var targets = Array.prototype.slice.call(elements);
    targets.forEach(function (element, index) {
      element.classList.add("subpage-reveal");
      element.style.transitionDelay = Math.min(index % 5, 4) * 55 + "ms";
    });

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach(function (element) { element.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries, activeObserver) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        activeObserver.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -7% 0px", threshold: 0.06 });

    targets.forEach(function (element) { observer.observe(element); });
  }

  if (body.classList.contains("is-research")) {
    var themes = archive.querySelectorAll(":scope > ul > li");
    var findings = archive.querySelectorAll(":scope > ul > li > ul > li");

    themes.forEach(function (item, index) {
      var number = document.createElement("span");
      number.className = "subpage-card-number";
      number.textContent = String(index + 1).padStart(2, "0");
      item.appendChild(number);
    });

    addMetric(themes.length, label("research themes", "研究主题"));
    addMetric(findings.length, label("selected results", "代表性结果"));
    reveal(archive.querySelectorAll(":scope > h1:not(.page__title), :scope > ul > li"));
  }

  if (body.classList.contains("is-publications")) {
    var publicationLists = archive.querySelectorAll(":scope > ol");
    var publicationItems = archive.querySelectorAll(":scope > ol > li");
    publicationItems.forEach(addYearBadge);

    var preprints = publicationLists.length > 0 ? publicationLists[0].children.length : 0;
    var peerReviewed = publicationLists.length > 1 ? publicationLists[1].children.length : 0;
    var files = archive.querySelectorAll("a.btn").length;

    addMetric(publicationItems.length, label("works", "成果"));
    addMetric(peerReviewed, label("peer-reviewed", "同行评审"));
    addMetric(preprints, label("preprints", "预印本"));
    addMetric(files, label("PDF links", "PDF 链接"));
    reveal(archive.querySelectorAll(":scope > h2, :scope > ol > li"));
  }

  if (body.classList.contains("is-cv")) {
    var cvSections = archive.querySelectorAll(":scope > h2");
    var cvItems = archive.querySelectorAll(":scope > h2 + ul > li");
    cvItems.forEach(promoteLeadingDate);

    addMetric(cvSections.length, label("sections", "分区"));
    addMetric(cvItems.length, label("entries", "条目"));
    reveal(archive.querySelectorAll(":scope > h2, :scope > h2 + ul > li"));
  }

  if (body.classList.contains("is-talks")) {
    var talkItems = archive.querySelectorAll(":scope > ol > li");
    talkItems.forEach(addYearBadge);
    var invited = Array.prototype.filter.call(talkItems, function (item) {
      return /invited seminar|邀请报告/i.test(item.textContent || "");
    }).length;

    addMetric(talkItems.length, label("presentations", "学术报告"));
    addMetric(invited, label("invited seminars", "邀请报告"));
    reveal(archive.querySelectorAll(":scope > h2, :scope > ol > li"));
  }

  if (body.classList.contains("is-teaching")) {
    var teachingSections = archive.querySelectorAll(":scope > h2");
    var teachingItems = archive.querySelectorAll(":scope > h2 + ol > li");
    teachingItems.forEach(promoteTeachingDate);

    addMetric(teachingSections.length, label("sections", "分区"));
    addMetric(teachingItems.length, label("teaching entries", "教学条目"));
    reveal(archive.querySelectorAll(":scope > h2, :scope > h2 + ol > li"));
  }
})();
