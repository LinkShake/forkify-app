import icons from "url:../../img/icons.svg";
import View from "./shared/View";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _searchResultsEl = document.querySelector(".search-results");
  _errorMessage =
    "We are not aible to find that recipe. We're so sorry for the inconvenience. Try again, maybe check if the spelling of the recipe name is right!";

  _generateMarkup() {
    const isInCart =
      JSON.parse(localStorage.getItem(`disabled-${this._data.id}`)) &&
      JSON.parse(localStorage.getItem("cartIngredients")).filter(
        (ingredient) => ingredient.id === this._data.id
      ).length !== 0;

    return `<figure class="recipe__fig">
          <img src="${this._data.img}" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>
        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this._data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>
            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update btn--decrease-servings" data-update-to="${
                this._data.servings - 1
              }">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update btn--increase-servings" data-update-to="${
                this._data.servings + 1
              }">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>
          <div class="recipe__user-generated ${this._data.key ? "" : "hidden"}">
          <svg>
          <use href="${icons}#icon-user"></use>
          </svg>
          </div>
          <button class="btn--round btn--bookmarks">
          <svg class="">
          <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? "-fill" : ""
    }"></use>
    </svg>
    </button>
    </div>
    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <button class="btn--add-to-market" ${isInCart ? "disabled" : ""}>
      ${isInCart ? "Ingredients in cart" : "Add ingredients to cart"}
      </button>
      <form class="date">
        <input type="date" id="date-calendar" value="${this._data.date}" >
        <button class="btn--calendar">Set a date for that recipe</button>
      </form>
          <ul class="recipe__ingredient-list">
          ${this._data.ingredients
            .map(this._generateListOfIngredients)
            .join("")}
            
          </ul>
        </div>
        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this._data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.sourceURL}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;
  }

  _generateListOfIngredients(ingredient) {
    return `<li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ingredient.quantity || ""}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ingredient.unit}</span>
                ${ingredient.description}
              </div>
            </li>`;
  }

  onRender(cb) {
    ["hashchange", "load"].forEach((e) => {
      window.addEventListener(e, cb);
    });
  }

  onUpdateServings(cb) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--update");
      if (!btn) return;
      const numberOfServings = +btn.dataset.updateTo;
      if (numberOfServings === 0) {
        return;
      }
      cb(numberOfServings);
    });
  }

  onAddBookmarks(cb) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--bookmarks");
      if (!btn) return;
      cb();
    });
  }

  onAddIngredientsToCart(cb, data) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--add-to-market");
      if (!btn) return;
      cb(data);
      btn.textContent = "Ingredients in market";
      btn.setAttribute("disabled", true);
      document.querySelector(".pagination").innerHTML = "";
    });
  }

  onSaveDate(cb) {
    this._parentElement.addEventListener("click", (e) => {
      const form = e.target.closest("form");
      if (!form) return;
      const date = form.querySelector("input");
      cb(date.value);
    });
  }
}

export default new RecipeView();
