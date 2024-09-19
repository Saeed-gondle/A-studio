const slider = function () {
  const slides = document.querySelectorAll(".slide");
  // const btnLeft = document.querySelector(".slider__btn--left");
  // const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");
  const imagContainer = document.querySelector(".testimonial__preview");
  // const image = document.querySelector(".testimonial__preview img");
  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    const img = document.createElement("img");
    img.src = `./src/img/img-main/users-${
      curSlide + 1
      // slide < 5 ? slide + 1 : 1
    }.jpg`;
    imagContainer.innerHTML = "";
    imagContainer.prepend(img);

    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );

    // image.onload = (e) => {
    //   slides.forEach(
    //     (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    //   );
    // };
  };

  // Next slide

  // const nextSlide = function () {
  //   if (curSlide === maxSlide - 1) {
  //     curSlide = 0;
  //   } else {
  //     curSlide++;
  //   }

  //   goToSlide(curSlide);
  //   activateDot(curSlide);
  // };

  // const prevSlide = function () {
  //   if (curSlide === 0) {
  //     curSlide = maxSlide - 1;
  //   } else {
  //     curSlide--;
  //   }
  //   goToSlide(curSlide);
  //   activateDot(curSlide);
  // };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers

  setInterval(() => {
    try {
      if (curSlide >= slides.length) curSlide = 0;
      curSlide++;
      goToSlide(curSlide);
      activateDot(curSlide);
    } catch {
      curSlide = 0;
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  }, 3000);
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      curSlide = +slide;
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  });
};
slider();

// Navlinks
const navLinks = document.querySelector("#nav-links");

const handleHover = function (e) {
  if (e.target.classList.contains("nav-link")) {
    const link = e.target;
    const siblings = link.closest("#nav-links").querySelectorAll(".nav-link");
    // const logo = link.closest('.nav-links').closest('.logo');

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    // logo.style.opacity = this;
  }
};

// Passing "argument" into handler
navLinks.addEventListener("mouseover", handleHover.bind(0.5));
navLinks.addEventListener("mouseout", handleHover.bind(1));

// Reveal section
const header = document.querySelector("#header");
const nav = document.querySelector("nav#nav-links");
const navHeight = nav.getBoundingClientRect().height;
// const navHeight=100;
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  // if (!entry.isIntersecting) {
  //   nav.closest("#header").classList.add("sticky");
  //   // nav.closest('#header').classList.add("sticky");
  // } else nav.closest("#header").classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);
// reveal
const allSections = document.querySelectorAll("section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
