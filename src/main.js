import "./style.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isWebglAvailable } from "./three/webgl-detect.js";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.getElementById("year").textContent = new Date().getFullYear();

initHeroIntro();
initReveals();
initAnchorScroll();

if (isWebglAvailable()) {
  document.documentElement.classList.add("has-webgl");
  initHeroScene();
} else {
  document.documentElement.classList.add("no-webgl");
}

function initHeroIntro() {
  const items = gsap.utils.toArray("[data-reveal-hero]");
  if (!items.length) return;

  if (prefersReducedMotion) {
    gsap.set(items, { opacity: 1, y: 0 });
    return;
  }

  gsap.set(items, { opacity: 0, y: 28 });
  gsap.to(items, {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: "power3.out",
    stagger: 0.12,
    delay: 0.3
  });
}

function initReveals() {
  const items = gsap.utils.toArray("[data-reveal]");

  items.forEach((el) => {
    const mode = el.dataset.reveal || "up";
    const fromVars = { opacity: 0 };
    if (mode === "up") fromVars.y = 32;

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(el, fromVars);
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  });
}

function initAnchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    });
  });
}

async function initHeroScene() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  const { HeroScene } = await import("./three/scene.js");
  const scene = new HeroScene(canvas, { reducedMotion: prefersReducedMotion });
  scene.init();

  const heroSection = document.getElementById("hero");
  const heroPin = heroSection.querySelector(".hero__pin");

  ScrollTrigger.create({
    trigger: heroSection,
    start: "top top",
    end: "+=100%",
    pin: heroPin,
    pinSpacing: true,
    scrub: true,
    onUpdate(self) {
      scene.setTipperProgress(self.progress);
    }
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => scene.setActive(entry.isIntersecting));
      },
      { threshold: 0.01 }
    );
    observer.observe(heroSection);
  }

  document.addEventListener("visibilitychange", () => {
    scene.setActive(document.visibilityState === "visible");
  });
}
