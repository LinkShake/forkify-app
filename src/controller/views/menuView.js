import View from "./shared/View";

class MenuView extends View {
  _parentElement = document.querySelector(".mobile-nav");
  _menuButton = document.querySelector(".btn--menu");
  _btnCloseMenu = document.querySelector(".btn--close-menu");

  constructor() {
    super();
    this.onClickMenuButton();
    this.onClickMenuCloseButton();
    this.hideMenuNav();
    this.hideOtherViewsOnClick();
  }

  onClickMenuButton() {
    this._menuButton.addEventListener("click", () => {
      this._parentElement.classList.remove("hidden");
      document.querySelector(".recipe").classList.add("overflow-hidden-class");
    });
  }

  onClickMenuCloseButton() {
    this._btnCloseMenu.addEventListener("click", () => {
      this._parentElement.classList.add("hidden");
      document
        .querySelector(".recipe")
        .classList.remove("overflow-hidden-class");
    });
  }

  hideMenuNav() {
    window.addEventListener("resize", () => {
      if (
        window
          .getComputedStyle(this._menuButton)
          .getPropertyValue("display") === "none"
      ) {
        this._parentElement.classList.add("hidden");
      }
    });
  }

  hideOtherViewsOnClick() {
    this._parentElement.addEventListener("click", (e) => {
      const action = e.target.closest("li");
      if (!action) return;
      if (
        action
          .querySelector("button")
          .classList.contains("nav__btn--calendar-mobile")
      ) {
        document.querySelector(".search-results").classList.add("hidden");
        document.querySelector(".recipe").classList.add("full-width");
      } else {
        document.querySelector(".calendar-wrapper").classList.add("hidden");
      }
    });
  }
}

export default new MenuView();
