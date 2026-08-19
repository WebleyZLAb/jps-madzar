// JPS Madžar — vanilla JS only: scroll reveals + route-line draw via
// IntersectionObserver, no animation library. Respects prefers-reduced-motion.
import "./style.css";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

const REVEAL_SELECTOR = "[data-reveal], [data-reveal-group], [data-reveal-right]";

if (prefersReducedMotion) {
  document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
    el.classList.add("is-visible");
  });
} else if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
  );

  document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
    observer.observe(el);
  });
} else {
  // No IntersectionObserver support: show content immediately rather than
  // leaving it hidden.
  document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
    el.classList.add("is-visible");
  });
}

// Top bar owns the hero; once it scrolls out of view, hand off to the fixed
// mobile contact bar instead of showing both at once (mobile only via CSS —
// see .top-bar / .mobile-bar). Not gated on prefers-reduced-motion: this is
// a functional visibility state, not decorative entrance motion (the CSS
// transition itself is disabled under reduced motion).
const hero = document.getElementById("hero");
if (hero && "IntersectionObserver" in window) {
  const heroObserver = new IntersectionObserver(
    ([entry]) => {
      document.body.classList.toggle("past-hero", !entry.isIntersecting);
    },
    { threshold: 0, rootMargin: "-1px 0px 0px 0px" }
  );
  heroObserver.observe(hero);
}
