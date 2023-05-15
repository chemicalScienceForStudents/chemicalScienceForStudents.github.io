const itemsEl = document.querySelectorAll(".carousel__item");
const btnLeft = document.querySelector(".btn__carousel--left");
const btnRight = document.querySelector(".btn__carousel--right");

const mediaQueryPhone = 600; //600px phone
const mediaQueryTabPort = 900; //900px tab-port
const mediaQueryTabLand = 1200; //1200px tab-land
const mediaQueryDesktop = 1800; // 1800px desktop

let elemPerView;
let scrollsLeft;
let scrollsRight;
let maxScrolls;

//DETECTS THE CURRENT MEDIAQUERY
const mediaSensor = function (width) {
  if (width <= mediaQueryPhone) {
    return mediaQueryPhone;
  } else if (width <= mediaQueryTabPort) {
    return mediaQueryTabPort;
  } else if (mediaQueryTabPort < width) {
    return mediaQueryDesktop;
  }
};

let currentQuery = mediaSensor(window.innerWidth);

const carouselInit = function () {
  if (currentQuery <= mediaQueryPhone) {
    elemPerView = 1;
  } else if (currentQuery <= mediaQueryTabPort) {
    elemPerView = 2;
  } else if (currentQuery <= mediaQueryDesktop) {
    elemPerView = 3;
  }

  maxScrolls = Math.ceil(itemsEl.length / elemPerView) - 1;

  scrollsLeft = maxScrolls;
  scrollsRight = 0;

  itemsEl.forEach((c, i) => {
    c.style.left = `${(100 / elemPerView) * i}%`;
    c.style.width = `${100 / elemPerView}%`;
  });
};

carouselInit();

window.addEventListener("resize", function () {
  if (currentQuery != mediaSensor(window.innerWidth)) {
    currentQuery = mediaSensor(window.innerWidth);
    carouselInit();
  }
});

//BUTTONS CONTROLS
btnRight.addEventListener("click", function () {
  if (scrollsRight != maxScrolls) {
    itemsEl.forEach((item) => {
      item.style.left = `calc(${item.style.left} + ${-100}%)`;
    });

    scrollsLeft--;
    scrollsRight++;
  }
});

btnLeft.addEventListener("click", function () {
  if (scrollsLeft != maxScrolls) {
    itemsEl.forEach((item) => {
      item.style.left = `calc(${item.style.left} + ${100}%)`;
    });

    scrollsLeft++;
    scrollsRight--;
  }
});
