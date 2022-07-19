'use strict';

function $(id, slectAll = false) {
  return slectAll ? document.querySelectorAll(id) : document.querySelector(id);
}

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = $('.btn--scroll-to');
const section1 = $('#section--1');
const header = $('.header');
const navLinks = $('.nav__links');
const navLink = $('.nav__link', true);
const nav = $('nav');
const tabsContainer = $('.operations__tab-container');
const tabs = $('.operations__tab', true);
const tabsContent = $('.operations__content', true);

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(el => el.addEventListener('click', openModal));

/* for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);
 */
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const message = document.createElement('div');
message.classList.add('cookie-message2');
message.innerHTML = `<p>We use cookies to improve our services and use experience.</p> <button class="btn btn--close-cookie" >Got it</button>`;
message.style.width = '98.9vw';
message.querySelector('p').style.color = 'white';
message.style.backgroundColor = '#37383d';
header.prepend(message);
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 20 + 'px';
// header.before(message);
// header.append(message.cloneNode(true));

const btnCloseCookie = $('.btn--close-cookie');
btnCloseCookie.addEventListener('click', () => message.remove());

// document.documentElement.style.setProperty('--color-primary', '#195BFF');
// document.documentElement.style.setProperty('--color-primary-darker', '#1752E6');
// document.documentElement.style.setProperty(
//   '--color-primary-opacity',
//   '#E8EFFF'
// );

// document.documentElement.style.setProperty(
//   '--gradient-primary',
//   'linear-gradient(28.71deg, #1752E6 -6.25%, #3A89F1 16.75%, #67CFFF 47.13%, #9ADACB 74.54%, #FAE3E6 97.7%, #D4BFFC 141.28%)'
// );

btnScrollTo.addEventListener('click', e => {
  // const scrolls2 = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left: scrolls2.left + window.scrollX,
  //   top: scrolls2.top + window.scrollY,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  e.target.classList.contains('nav__link') &&
    $(e.target.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
});

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  if (!clicked) return;
  clicked.classList.add('operations__tab--active');
  const activeContent = clicked.dataset.tab;
  console.log(activeContent);
  tabsContent.forEach(tab =>
    tab.classList.remove('operations__content--active')
  );
  $(`.operations__content--${activeContent}`).classList.add(
    'operations__content--active'
  );
});
function handleHover(e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
}

nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});

nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});

// window.addEventListener('scroll', function () {
//   const intialCrd = section1.getBoundingClientRect();
//   const headerCrd = header.getBoundingClientRect();
//   if (
//     intialCrd.y <=
//     section1.previousElementSibling.getBoundingClientRect().height
//   ) {
//     section1.classList.remove('section--hidden');
//   }
// });

const stickyNav = function (entries) {
  const [entry] = entries;
  !entry.isIntersecting
    ? nav.classList.add('sticky')
    : nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${Number.parseFloat(getComputedStyle(nav).height)}px`,
});
headerObserver.observe(header);

//Receal sections
const allSections = $('.section', true);
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy image loading

const imgTarget = $('img[data-src]', true);
function loadImg(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
}
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTarget.forEach(img => imgObserver.observe(img));

//Sliders
const slideContainer = $('.slider');
const slides = $('.slide', true);
const sliderBtnLeft = $('.slider__btn--left');
const sliderBtnRight = $('.slider__btn--right');
const dotContainer = $('.dots');
let curSlide = 0;

const activateDots = function (slides) {
  $('.dots__dot', true).forEach(dot =>
    dot.classList.remove('dots__dot--active')
  );

  $(`.dots__dot[data-slider="${slides}"]`).classList.add('dots__dot--active');
};

slides.forEach(
  (slide, i) => (slide.style.transform = ` translateX(${100 * i}%)`)
);

const createDots = function () {
  slides.forEach((_, i) => {
    const insertedHTML = `<button class="dots__dot" data-slider=${i}></button>`;
    dotContainer.insertAdjacentHTML('beforeend', insertedHTML);
  });
};
createDots();
const gotToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = ` translateX(${100 * (i - slide)}%)`;
  });
};

gotToSlide(0);

const nextSlide = function () {
  curSlide++;
  if (curSlide === slides.length) {
    curSlide = 0;
  }
  gotToSlide(curSlide);
  activateDots(curSlide);
};
const prevSlide = function () {
  curSlide--;
  if (curSlide < 0) {
    curSlide = slides.length - 1;
  }
  gotToSlide(curSlide);
  activateDots(curSlide);
};
sliderBtnRight.addEventListener('click', nextSlide);
sliderBtnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', e => {
  e.key === 'ArrowRight' && nextSlide();
  e.key === 'ArrowLeft' && prevSlide();
});
$('.dots__dot', true)[0].classList.add('dots__dot--active');

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slider } = e.target.dataset;
    curSlide = slider;
    gotToSlide(slider);
    activateDots(curSlide);
  }
});
