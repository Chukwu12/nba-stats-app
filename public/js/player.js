document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap === "undefined") {
    return;
  }

  gsap.from(".players-hero", {
    opacity: 0,
    y: 28,
    duration: 0.85,
    ease: "power2.out"
  });

  gsap.from(".player-search-panel", {
    opacity: 0,
    y: 18,
    duration: 0.65,
    delay: 0.15,
    ease: "power2.out"
  });

  const cards = document.querySelectorAll(".player-card");
  if (cards.length > 0) {
    gsap.from(cards, {
      opacity: 0,
      y: 24,
      duration: 0.6,
      delay: 0.25,
      stagger: 0.08,
      ease: "power2.out"
    });
  }
});



