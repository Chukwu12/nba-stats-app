// ===========================================GASP animation ========================//
    // Animate header
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM fully loaded");

  // Animate header
  gsap.from("#players-page h1", { opacity: 0, y: -20, duration: 0.8 });

  // Animate search form
  gsap.from("form", { opacity: 0, y: -10, duration: 0.8, delay: 0.4 });

  // Animate each player card
  gsap.from(".player-card", {
    opacity: 1,
    y: 20,
    duration: 0.6,
    delay: 0.6,
    stagger: 0.1
  });
});
