import "./js/swiper.js";
import "./js/cart.js";
import "./js/login.js";
import "./scss/styles.scss";

const buttonMenu = document.querySelector("[data-menu-button]");
const burgerMenu = document.querySelector("[data-menu]");

buttonMenu.addEventListener("click", hadleToggle);

function hadleToggle(e) {
  const expanded = buttonMenu.getAttribute("aria-expended") === "true" || false;
  buttonMenu.classList.toggle("is-open");
  buttonMenu.setAttribute("aria-expended", !expanded);

  burgerMenu.classList.toggle("is-open");
}

// ========
const tab = function () {
  const tabNav = document.querySelectorAll(".tabs-nav__item");
  const tabContent = document.querySelectorAll(".tab");
  let tabName;

  tabNav.forEach((item) => {
    item.addEventListener("click", selectTabNav);
  });

  function selectTabNav() {
    tabNav.forEach((item) => {
      item.classList.remove("is-active");
    });
    this.classList.add("is-active");
    tabName = this.getAttribute("data-tab-name");
    selectTabContent(tabName);
  }

  function selectTabContent(tabName) {
    tabContent.forEach((item) => {
      item.classList.contains(tabName)
        ? item.classList.add("is-active")
        : item.classList.remove("is-active");
    });
  }
};
tab();

// ==================

const accordion = function () {
  const accordionList = document.querySelectorAll(".accordion__item");
  accordionList.forEach((item) => {
    item.addEventListener("click", selectItem);
  });

  function selectItem(e) {
    accordionList.forEach((item) => {
      item.classList.remove("is-open");
    });
    this.classList.add("is-open");
  }
};

accordion();

// ====================

function scrollDownFromMenu() {
  const menu = document.querySelector(".menu");
  menu.addEventListener("click", handleLink);

  function handleLink(e) {
    e.preventDefault();
    const attribute = e.target.getAttribute("href");

    if (e.target.nodeName === "A") {
      document.querySelector("" + attribute).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    if (e.target === e.currentTarget) {
      return;
    }

    const currentLink = e.target;
    const activeLink = e.currentTarget.querySelector(".menu__link--active");

    if (activeLink) {
      activeLink.classList.remove("menu__link--active");
    }

    currentLink.classList.add("menu__link--active");
  }
}

scrollDownFromMenu();

// ======

function scrollDownToProjects() {
  const arrow = document.querySelector(".arrow");

  arrow.addEventListener("click", handleLink);

  function handleLink(e) {
    e.preventDefault();
    const attribute = e.target.parentNode.getAttribute("href");
    console.log(attribute);
    document.querySelector("" + attribute).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

scrollDownToProjects();

// ========

function changeBcgColorMenu() {
  const nav = document.querySelector(".navigation");
  const cartCont = document.querySelector(".cart");
  window.addEventListener("scroll", handleNewcolor);

  function handleNewcolor(e) {
    e.preventDefault();

    if (pageYOffset > 60) {
      nav.classList.add("navigation--active");
      cartCont.classList.remove("is-open");
    } else {
      nav.classList.remove("navigation--active");
    }
  }
}
changeBcgColorMenu();


// ==============
