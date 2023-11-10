'use strict';

//////////////////////////////////////////////////////////////////////////////
////////////////////////////////// SELECTORS /////////////////////////////////

const yearEl = document.querySelector('.copyright-year');
const currentYear = new Date().getFullYear();
const mobileNav = document.querySelector('.btn-mobile-nav');
const header = document.querySelector('.header');
const allLinks = document.querySelectorAll('a:link');
const sectionHero = document.querySelector('.section-hero');

//////////////////////////////////////////////////////////////////////////////
///////////////////////////// SAFARI FLEXBOX FIX /////////////////////////////

const checkFlexGap = function () {
  const flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  flex.style.rowGap = '1px';

  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));

  document.body.appendChild(flex);

  const isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);

  if (!isSupported) document.body.classList.add('no-flexbox-gap');
};

//////////////////////////////////////////////////////////////////////////////
////////////////////////////// TOGGLE NAVIGATION /////////////////////////////

const toggleNav = function () {
  header.classList.toggle('nav-open');
};

//////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// YEAR ///////////////////////////////////

yearEl.textContent = currentYear;

//////////////////////////////////////////////////////////////////////////////
///////////////////////// SMOOTH SCROLLING NAVIGATION ////////////////////////

const linkScroll = link =>
  function (e) {
    e.preventDefault();
    const href = link.getAttribute('href');

    if (href === '#')
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    else if (href !== '#' && href.startsWith('#')) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: 'smooth' });
    }

    if (link.classList.contains('main-nav-link')) toggleNav();
  };

//////////////////////////////////////////////////////////////////////////////
////////////////////////////// STICKY NAVIGATION /////////////////////////////

const intersectionCallback = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) document.body.classList.add('sticky');
  else document.body.classList.remove('sticky');
};

const intersectionOptions = {
  root: null,
  threshold: 0,
  rootMargin: '-80px',
};

//////////////////////////////////////////////////////////////////////////////
/////////////////////////////// EVENT LISTENERS //////////////////////////////

mobileNav.addEventListener('click', toggleNav);
allLinks.forEach(link => link.addEventListener('click', linkScroll(link)));
const observer = new IntersectionObserver(intersectionCallback, intersectionOptions);
observer.observe(sectionHero);
checkFlexGap();
