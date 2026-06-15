const deck = document.querySelector("#deck");
const slides = Array.from(document.querySelectorAll(".slide"));
const counter = document.querySelector("#counter");
const progressBar = document.querySelector("#progressBar");
const prev = document.querySelector("#prevSlide");
const next = document.querySelector("#nextSlide");
const tocLinks = Array.from(document.querySelectorAll(".toc a"));

let activeIndex = 0;
let scrollAnimation = 0;

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function animateDeckScroll(targetTop, duration = 3000) {
  cancelAnimationFrame(scrollAnimation);
  const isPageScroll = window.matchMedia("(max-width: 960px)").matches;
  const scroller = isPageScroll ? document.scrollingElement || document.documentElement : deck;
  const startTop = scroller.scrollTop;
  const distance = targetTop - startTop;
  const startTime = performance.now();

  function step(now) {
    const elapsed = Math.min((now - startTime) / duration, 1);
    scroller.scrollTop = startTop + distance * easeInOutCubic(elapsed);
    if (elapsed < 1) {
      scrollAnimation = requestAnimationFrame(step);
    }
  }

  scrollAnimation = requestAnimationFrame(step);
}

function setActive(index) {
  const previousIndex = activeIndex;
  activeIndex = Math.max(0, Math.min(slides.length - 1, index));
  const current = slides[activeIndex];
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === activeIndex);
    slide.classList.toggle("was-active", slideIndex === previousIndex && slideIndex !== activeIndex);
  });
  counter.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${slides.length}`;
  progressBar.style.width = `${((activeIndex + 1) / slides.length) * 100}%`;
  document.title = `${current.dataset.title} - AI Coding with Codex`;
  tocLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current.id}`);
  });
}

function goTo(index) {
  const nextIndex = Math.max(0, Math.min(slides.length - 1, index));
  const isPageScroll = window.matchMedia("(max-width: 960px)").matches;
  const targetTop = isPageScroll
    ? slides[nextIndex].getBoundingClientRect().top + window.scrollY
    : slides[nextIndex].offsetTop;
  animateDeckScroll(targetTop);
  setActive(nextIndex);
}

prev.addEventListener("click", () => goTo(activeIndex - 1));
next.addEventListener("click", () => goTo(activeIndex + 1));

document.addEventListener("keydown", (event) => {
  if (["ArrowRight", "PageDown", " "].includes(event.key)) {
    event.preventDefault();
    goTo(activeIndex + 1);
  }
  if (["ArrowLeft", "PageUp"].includes(event.key)) {
    event.preventDefault();
    goTo(activeIndex - 1);
  }
  if (event.key === "Home") {
    event.preventDefault();
    goTo(0);
  }
  if (event.key === "End") {
    event.preventDefault();
    goTo(slides.length - 1);
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;
    const index = slides.indexOf(visible.target);
    if (index >= 0) setActive(index);
  },
  {
    root: window.matchMedia("(max-width: 960px)").matches ? null : deck,
    threshold: [0.52, 0.72],
  }
);

slides.forEach((slide) => observer.observe(slide));
setActive(0);
