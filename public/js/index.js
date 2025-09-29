// ===========================================================index js=========================================================//
let mouse = { x: 0, y: 0 }; // Cursor position
let pos = { x: 0, y: 0 };   // Ball position
let ratio = 0.05;
let active = false;

let ball = document.getElementById("ball");
let navLinks = document.querySelectorAll("a");
let text = document.querySelectorAll("h1");

// Set initial position of ball
gsap.set(ball, { xPercent: -50, yPercent: -50 });

// Animations
gsap.from(".fixed", {
  duration: 2,
  x: -400,
  skewX: 30
});

gsap.from(".logo", {
  duration: 2,
  x: 400,
  skewX: 30
});

gsap.from("img", {
  duration: 2,
  opacity: 0,
  stagger: 0.5,
  scale: 4,
  delay: 3
});

gsap.from(text, {
  duration: 1.3,
  skewY: 20,
  ease: "bounce.out",
  y: 200,
  delay: 5,
  stagger: 0.3
});

gsap.from(".heading p", {
  duration: 1.3,
  y: 10,
  delay: 6,
  opacity: 0
});

gsap.from(".heading a", {
  duration: 1.3,
  y: 10,
  delay: 6,
  opacity: 0
});

// Mouse follower animation
gsap.ticker.add(updatePosition);

function updatePosition() {
  if (!active) {
    pos.x += (mouse.x - pos.x) * ratio;
    pos.y += (mouse.y - pos.y) * ratio;
    gsap.set(ball, { x: pos.x, y: pos.y });
  }
}

document.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Hover effects
navLinks.forEach((link) => {
  link.addEventListener("mouseleave", () => {
    ball.classList.remove("link_grow");
  });
  link.addEventListener("mouseover", () => {
    ball.classList.add("link_grow");
  });
});

text.forEach((link) => {
  link.addEventListener("mouseleave", () => {
    ball.classList.remove("text_grow");
  });
  link.addEventListener("mouseover", () => {
    ball.classList.add("text_grow");
  });
});