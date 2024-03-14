//

// GSAP
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const breakpoints = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
};

function getSpeed(windowWidth) {
  if (windowWidth < breakpoints.tablet) {
    return 1; // móviles
  } else if (windowWidth < breakpoints.desktop) {
    return 2; // tablets
  }
  return 3; // escritorios
}

function horizontalTitle() {
  const windowWidth = window.innerWidth;
  const speed = getSpeed(windowWidth);
  const sectionWidth = document.querySelector("#title > p").offsetWidth;

  if (windowWidth < sectionWidth) {
    gsap.to("#title > p", {
      x: () => -(sectionWidth - windowWidth) + "px",
      ease: "none",
      scrollTrigger: {
        trigger: "#title",
        pin: true,
        scrub: 1,
        start: "25% 25%",
        end: () => `+=${sectionWidth / speed} bottom`,
      },
    });
  }
}

function challenges() {
  let sections = gsap.utils.toArray(".challenge");
  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: "#main",
      pin: true,
      scrub: true,
      end: () => "+=" + document.querySelector("#main").offsetWidth,
    },
  });
}

function initFunctions() {
  horizontalTitle();
  challenges();
}

function onResize() {
  ScrollTrigger.getAll().forEach((st) => st.kill());
  initFunctions();
}

window.addEventListener("resize", onResize);
initFunctions();
