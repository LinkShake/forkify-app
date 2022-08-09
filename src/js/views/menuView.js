import View from "./View.js";

class MenuView extends View {
  _parentElement = document.querySelector(".mobile-nav");
  _menuButton = document.querySelector(".btn--menu");

  constructor() {
    super();
    this.addHandlerClickMenuButton();
    this.hideMenuNav();
  }

  addHandlerClickMenuButton() {
    this._menuButton.addEventListener(
      "click",
      function () {
        this._parentElement.classList.toggle("hidden");
      }.bind(this)
    );
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
