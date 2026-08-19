// JPS Madžar — vanilla JS only: scroll reveals + route-line draw via
// IntersectionObserver, no animation library. Respects prefers-reduced-motion.
import "./style.css";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Measure each route-line path so its stroke-dashoffset draw-in animates
// across its real length instead of a fixed guess.
document.querySelectorAll("[data-draw] path:not(.route-line__spine)").forEach((path) => {
  const length = Math.ceil(path.getTotalLength());
  path.style.setProperty("--path-len", String(length));
});

if (prefersReducedMotion) {
  document.querySelectorAll("[data-reveal], [data-reveal-group], [data-draw]").forEach((el) => {
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

  document.querySelectorAll("[data-reveal], [data-reveal-group], [data-draw]").forEach((el) => {
    observer.observe(el);
  });
} else {
  // No IntersectionObserver support: show content immediately rather than
  // leaving it hidden.
  document.querySelectorAll("[data-reveal], [data-reveal-group], [data-draw]").forEach((el) => {
    el.classList.add("is-visible");
  });
}
