/**
 * ScentLab — minimal landing page scripts
 * Mobile nav toggle and optional enhancements
 */

(function () {
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("is-open");
      navToggle.setAttribute(
        "aria-label",
        navLinks.classList.contains("is-open") ? "Close menu" : "Open menu"
      );
    });

    // Close menu when a link is clicked (for in-page anchors)
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("is-open");
      });
    });
  }
})();
