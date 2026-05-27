document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap === "undefined") {
    return;
  }

  gsap.from(".home-hero", {
    y: 24,
    duration: 0.75,
    ease: "power2.out",
    clearProps: "transform"
  });

  gsap.from(".home-quick-link", {
    y: 16,
    duration: 0.5,
    stagger: 0.06,
    delay: 0.12,
    ease: "power2.out",
    clearProps: "transform"
  });

  gsap.from(".home-card, .home-media-card", {
    y: 20,
    duration: 0.55,
    stagger: 0.07,
    delay: 0.2,
    ease: "power2.out",
    clearProps: "transform"
  });
});