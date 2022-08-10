import View from "./shared/View";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpenForm = document.querySelector(".nav__btn--add-recipe");
  _btnOpenFormMobile = document.getElementById("mobile-add-recipe");
  _btnCloseForm = document.querySelector(".btn--close-modal");
  _mobileNav = document.querySelector(".mobile-nav");
  _successMessage = "Recipe successfully loaded!";

  constructor() {
    super();
    this._addHandlerOpenForm();
    this._addHandlerCloseForm();
    this._addHandlerIngredient();
  }

  toggleWindow() {
    [this._window, this._overlay].forEach((el) =>
      el.classList.toggle("hidden")
    );
  }

  _addHandlerOpenForm() {
    [this._btnOpenForm, this._btnOpenFormMobile.parentElement].forEach((el) =>
      el.addEventListener(
        "click",
        function () {
          this._mobileNav.classList.add("hidden");
          this.toggleWindow();
        }.bind(this)
      )
    );
  }

  _addHandlerCloseForm() {
    [this._btnCloseForm, this._overlay].forEach((el) =>
      el.addEventListener("click", this.toggleWindow.bind(this))
    );

    window.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        !this._window.classList.contains("hidden") &&
        !this._overlay.classList.contains("hidden")
      ) {
        this.toggleWindow();
      }
    });
  }

  addHandlerUpload(handlerFunction) {
    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault();
      const dataArr = [...new FormData(this._parentElement)];
      const data = Object.fromEntries(dataArr);
      handlerFunction(data);
    });
  }

  _addHandlerIngredient() {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".add-ingredient");
      const ingredientsColumn = document.getElementById("ingredients__column");
      if (!btn) return;
      let numberOfIngredients =
        ingredientsColumn.querySelectorAll("label").length + 1;
      const el = `<label>Ingredient ${numberOfIngredients}</label>
          <input
            type="text"
            name="ingredient-${numberOfIngredients}"
            placeholder="Format: 'Quantity,Unit,Description'"
          />`;
      ingredientsColumn.insertAdjacentHTML("beforeend", el);
    });
  }
}

export default new AddRecipeView();
