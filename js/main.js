const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".global-nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

const header = document.querySelector(".site-header");
const setHeaderState = () => {
  if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
};
setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

const revealTargets = document.querySelectorAll(".reveal, .card, .panel, .price-list p, .rounded, .price-grid img, .access dl, iframe");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.14 });

  revealTargets.forEach((target, index) => {
    target.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 90}ms`);
    revealObserver.observe(target);
  });
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}
