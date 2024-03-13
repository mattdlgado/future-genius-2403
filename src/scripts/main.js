import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function setupAnimation() {
  // Define tus breakpoints
  const breakpoints = {
    mobile: 480, // Ejemplo para móviles
    tablet: 768, // Ejemplo para tablets
    desktop: 1024, // Ejemplo para escritorios
  };

  // Calcula el ancho de la ventana aquí, antes de usarlo en las condiciones
  const windowWidth = window.innerWidth;
  
  // Inicializa la variable speed fuera de los bloques if para que su alcance sea global dentro de la función
  let speed;

  // Ajusta la animación según el tamaño de la ventana
  if (windowWidth < breakpoints.tablet) {
    // Configuración para dispositivos móviles
    speed = 2;
  } else if (windowWidth >= breakpoints.tablet && windowWidth < breakpoints.desktop) {
    // Configuración para tablets
    speed = 3;
  } else {
    // Configuración para escritorios
    speed = 4;
  }

  // Calcula el ancho de la sección aquí, después de definir speed, pero antes de usarlo en la animación
  const sectionWidth = document.querySelector("#context > p").offsetWidth + 20;

  // Solo inicia la animación si el ancho de la ventana es menor que el de la sección
  if (windowWidth < sectionWidth) {
    gsap.to("#context > p", {
      x: () => -(sectionWidth - windowWidth) + "px",
      ease: "none",
      scrollTrigger: {
        trigger: "#context",
        pin: true,
        scrub: 1,
        // markers: true,
        start: "center center",
        end: () => `+=${sectionWidth / speed} bottom`,
      },
    });
  }
}

// Ejecuta inicialmente la configuración de la animación
setupAnimation();

// Agrega un event listener para el evento resize
window.addEventListener("resize", () => {
  // Opcional: Mata todas las instancias de ScrollTrigger para evitar conflictos o comportamientos inesperados
  ScrollTrigger.getAll().forEach((st) => st.kill());

  // Vuelve a configurar la animación con las nuevas dimensiones
  setupAnimation();
});
