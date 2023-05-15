// change navbar color on scroll on large devices
var nav = document.getElementById('nav');
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 250) {
      nav.classList.add('bg-nav');
    } else {
      nav.classList.remove('bg-nav');
    }
});

// slightly move banner image w cursor
const img = document.getElementById('fennex-image');
const imgWidth = img.offsetWidth;

img.addEventListener('mousemove', e => {
    const xPos = e.clientX;
    const xPercent = (xPos / window.innerWidth) * 100;
    const xMovement = (xPercent - 50) / 10;

    img.style.transform = `translate(${xMovement}px, 0`; 
});
img.addEventListener('mouseleave', e => {
    img.style.transform = 'translate(0px, 0px)';
});

// parallax effect
const parallaxBackground = document.querySelector('.parallax');
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset;
    const parallaxPosition = scrollTop * 0.5;
});

// fading in images from below, using jquery for selector simplicity
$(document).on("scroll", function() {
  var pageTop = $(document).scrollTop();
  var pageBottom = pageTop + $(window).height();
  var tags = $(".tag");

  for (var i = 0; i < tags.length; i++) {
    var tag = tags[i];

    if ($(tag).position().top < pageBottom) {
      $(tag).addClass("visible");
    } else {
      $(tag).removeClass("visible");
    }
  }
});

// video carousel for tutorials section
const carouselContainer = document.querySelector('.carousel-container');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');

let currentIndex = 0;
const slideWidth = carouselContainer.clientWidth;

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + carouselContainer.children.length) % carouselContainer.children.length;
  carouselContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
});

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % carouselContainer.children.length;
  carouselContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
});
