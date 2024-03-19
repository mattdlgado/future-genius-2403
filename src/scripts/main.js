// Scroll to form
document.getElementById("top").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Positions
window.addEventListener("scroll", function () {
  var elemento = document.getElementById("girl");
  if (window.scrollY > 300) {
    elemento.style.position = "fixed";
  } else {
    elemento.style.position = "-webkit-sticky"; /* Para Safari */
    elemento.style.position = "sticky";
  }
});

// GSAP
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const windowWidth = window.innerWidth;

function horizontalScrollTitle() {
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
}

function horizontalScrollChallenges() {
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
  horizontalScrollTitle();
  if (windowWidth > 768) {
    horizontalScrollChallenges();
  }
}

function onResize() {
  ScrollTrigger.getAll().forEach((st) => st.kill());
  initFunctions();
}

window.addEventListener("resize", onResize);
initFunctions();
