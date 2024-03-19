// Import statements for GSAP and Lenis
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

// Utility function to add smooth scrolling to specific sections
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
}

// Optimized event listener assignments
["scrollToForm", "scrollToFaqs", "top"].forEach((id) => {
  document.getElementById(id).addEventListener("click", () => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      scrollToSection(id.replace("scrollTo", "").toLowerCase());
    }
  });
});

// Optimized girl positions handling
const girl = document.getElementById("girl");
let girlPositionFixed = false;

function handleScroll() {
  const maxScrollPosition =
    document.body.offsetHeight - window.innerHeight - window.innerHeight;
  const currentPositionFixed = window.scrollY >= maxScrollPosition;

  if (currentPositionFixed !== girlPositionFixed) {
    girl.style.position = currentPositionFixed ? "fixed" : "sticky";
    girlPositionFixed = currentPositionFixed;
  }
}

window.addEventListener("scroll", handleScroll);

// GSAP setup
gsap.registerPlugin(ScrollTrigger);
const windowWidth = window.innerWidth;

function horizontalScrollAnimations() {
  const sectionWidth = document.querySelector("#title > p").offsetWidth;

  if (windowWidth < sectionWidth) {
    gsap.to("#title > p", {
      x: () => -(sectionWidth - windowWidth) + "px",
      ease: "none",
      scrollTrigger: {
        trigger: "#title",
        pin: true,
        scrub: true,
        start: "25% 25%",
        end: "+=100%",
      },
    });
  }

  const cards = gsap.utils.toArray(".card");
  const cardsContainer = document.querySelector(".cards-container");
  const horizontalTween = gsap.to(cardsContainer, {
    x: window.innerWidth - cardsContainer.scrollWidth,
    duration: cards.length,
    ease: "none",
    scrollTrigger: {
      trigger: ".pin-panel",
      start: "top 89px",
      end: "+=200%",
      pin: true,
      scrub: true,
    },
  });
  cards.shift();

  cards.forEach((card) =>
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: "left 90%",
        end: "center 90%",
        scrub: true,
        containerAnimation: horizontalTween,
      },
    })
  );
}

function initFunctions() {
  horizontalScrollAnimations();
}

function onResize() {
  ScrollTrigger.getAll().forEach((st) => st.kill());
  initFunctions();
}

window.addEventListener("resize", onResize);
initFunctions();

// Lenis for smooth scrolling
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
