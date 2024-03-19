
// GSAP
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

console.clear();
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
  if (windowWidth > 768) {
    const cards = gsap.utils.toArray(".card");
    const cardsContainer = document.querySelector(".cards-container");
    const horizontalTween = gsap.to(cardsContainer, {
      x: window.innerWidth - cardsContainer.scrollWidth,
      duration: cards.length,
      ease: "none",
      scrollTrigger: {
        trigger: ".pin-panel",
        start: "top top",
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
}

function initFunctions() {
  horizontalScrollTitle();
  horizontalScrollChallenges();
}

function onResize() {
  ScrollTrigger.getAll().forEach((st) => st.kill());
  initFunctions();
}

window.addEventListener("resize", onResize);
initFunctions();
