(function () {
  "use strict";

  var body = document.body;
  if (!body.classList.contains("is-archive-page")) return;

  var archive = document.querySelector(".archive");
  var metrics = document.getElementById("subpage-metrics");
  if (!archive) return;

  function addMetric(value, label) {
    if (!metrics) return;
    var item = document.createElement("span");
    item.className = "subpage-metric";
    item.innerHTML = "<strong>" + value + "</strong><span>" + label + "</span>";
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

    addMetric(themes.length, "research themes");
    addMetric(findings.length, "selected results");
    reveal(archive.querySelectorAll(":scope > h1:not(.page__title), :scope > ul > li"));
  }

  if (body.classList.contains("is-publications")) {
    var publicationLists = archive.querySelectorAll(":scope > ol");
    var publicationItems = archive.querySelectorAll(":scope > ol > li");
    publicationItems.forEach(addYearBadge);

    var preprints = publicationLists.length > 0 ? publicationLists[0].children.length : 0;
    var peerReviewed = publicationLists.length > 1 ? publicationLists[1].children.length : 0;
    var files = archive.querySelectorAll("a.btn").length;

    addMetric(publicationItems.length, "works");
    addMetric(peerReviewed, "peer-reviewed");
    addMetric(preprints, "preprints");
    addMetric(files, "PDF links");
    reveal(archive.querySelectorAll(":scope > h2, :scope > ol > li"));
  }

  if (body.classList.contains("is-cv")) {
    var cvSections = archive.querySelectorAll(":scope > h2");
    var cvItems = archive.querySelectorAll(":scope > h2 + ul > li");
    cvItems.forEach(addYearBadge);

    addMetric(cvSections.length, "sections");
    addMetric(cvItems.length, "entries");
    reveal(archive.querySelectorAll(":scope > h2, :scope > h2 + ul > li"));
  }

  if (body.classList.contains("is-talks")) {
    var talkItems = archive.querySelectorAll(":scope > ol > li");
    talkItems.forEach(addYearBadge);
    var invited = Array.prototype.filter.call(talkItems, function (item) {
      return /invited seminar/i.test(item.textContent || "");
    }).length;

    addMetric(talkItems.length, "presentations");
    addMetric(invited, "invited seminars");
    reveal(archive.querySelectorAll(":scope > h2, :scope > ol > li"));
  }

  if (body.classList.contains("is-teaching")) {
    var teachingSections = archive.querySelectorAll(":scope > h2");
    var teachingItems = archive.querySelectorAll(":scope > h2 + ol > li");
    teachingItems.forEach(addYearBadge);

    addMetric(teachingSections.length, "sections");
    addMetric(teachingItems.length, "teaching entries");
    reveal(archive.querySelectorAll(":scope > h2, :scope > h2 + ol > li"));
  }
})();
