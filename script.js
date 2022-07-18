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

const header = $('.header');

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

const btnScrollTo = $('.btn--scroll-to');
const section1 = $('#section--1');
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

const navLinks = $('.nav__links');
const navLink = $('.nav__link', true);
const nav = $('nav');

navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  e.target.classList.contains('nav__link') &&
    $(e.target.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
});
