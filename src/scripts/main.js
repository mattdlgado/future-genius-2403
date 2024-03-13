//
document.addEventListener("DOMContentLoaded", (event) => {
  // Encuentra el enlace por su ID
  const enlace = document.getElementById("info");

  enlace.addEventListener("click", function (e) {
    // Previene el comportamiento predeterminado del enlace
    e.preventDefault();

    // Obtiene el ID del elemento de destino desde el atributo href
    const destinoID = this.getAttribute("href").substring(1);
    const destino = document.getElementById(destinoID);

    // Desplaza hacia el elemento destino
    destino.scrollIntoView({
      behavior: "smooth", // Define el desplazamiento suave
      block: "start", // Alinea el elemento destino al inicio de la ventana
    });
  });
});

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

function historySection() {
  gsap.set("#background", { scale: 1 });
  gsap.to("#background", {
    scrollTrigger: {
      trigger: "#history",
      start: "top bottom",
      end: "bottom top",
      scrub: 10,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to("#background", { scale: 1 + progress * 0.5 });
      },
    },
  });
}

function showGlitch() {
  gsap.set("#glitch", { opacity: 0 });
  gsap.to("#glitch", {
    scrollTrigger: {
      trigger: "#main",
      start: "-50% center",
      end: "center center",
      scrub: 10,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to("#glitch", { opacity: progress });
      },
    },
  });
}

function initFunctions() {
  horizontalTitle();
  historySection();
  showGlitch();
}

function onResize() {
  ScrollTrigger.getAll().forEach((st) => st.kill());
  initFunctions();
}

window.addEventListener("resize", onResize);
initFunctions();
