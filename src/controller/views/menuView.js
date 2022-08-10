import View from "./shared/View";

class MenuView extends View {
  _parentElement = document.querySelector(".mobile-nav");
  _menuButton = document.querySelector(".btn--menu");
  _btnCloseMenu = document.querySelector(".btn--close-menu");

  constructor() {
    super();
    this.addHandlerClickMenuButton();
    this.addHandlerClickMenuCloseButton();
    this.hideMenuNav();
  }

  addHandlerClickMenuButton() {
    this._menuButton.addEventListener(
      "click",
      function () {
        this._parentElement.classList.remove("hidden");
      }.bind(this)
    );
  }
  addHandlerClickMenuCloseButton() {
    this._btnCloseMenu.addEventListener("click", () => {
      this._parentElement.classList.add("hidden");
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
}

export default new MenuView();
