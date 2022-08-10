import View from "./shared/View";

class MarketView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage =
    "You still don't have any ingredients in your market. Start buying now!";
  _searchResultsEl = document.querySelector(".search-results");
  _buttonClose = document.querySelector(".btn--close-search-results");
  _recipeView = document.querySelector(".recipe");

  constructor() {
    super();
    this.addHandlerClickCloseButton(this._buttonClose, this._searchResultsEl);
  }

  addHandlerMarket(handlerFunction) {
    [
      document.querySelector(".nav__btn--market"),
      document.querySelector(".nav__btn--market-mobile").parentElement,
    ].forEach((el) =>
      el.addEventListener(
        "click",
        function () {
          this._recipeView.classList.remove("full-width");
          this._searchResultsEl.classList.remove("hidden");
          document.querySelector(".mobile-nav").classList.add("hidden");
          if (parseInt(window.innerWidth) <= 820) {
            this._recipeView.classList.add("hidden");
          }
          handlerFunction();
        }.bind(this)
      )
    );
  }

  _generateMarkup() {
    return `<ul class='market-list'>${this._data
      .map((ingredient) => {
        return `<li>
              <div>
                <p>${ingredient.description} ${
          ingredient.quantity
            ? `: <input type="number" class="input-quantity" id="_${ingredient.id}" data-description="${ingredient.description}" value="${ingredient.quantity}" min="0.01" step="0.01"/>`
            : ""
        } <strong>${ingredient.unit || ""}</strong></p>
             </div>
             <button class="btn--remove-ingredient" id="${
               ingredient.id
             }" data-description="${ingredient.description}">-</button>
            </li>`;
      })
      .join("")}</ul>`;
  }

  addHandlerLoadMarket(handlerFunction) {
    window.addEventListener("load", handlerFunction());
  }

  addHandlerRemoveIngredientFromMarket(handlerFunction) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--remove-ingredient");
      if (!btn) return;
      const description = btn.dataset.description;
      const id = btn.id;
      handlerFunction(description, id);
      // this._recipeView.classList.add("hidden");
    });
  }

  addHandlerChangeQuantity(handlerFunction) {
    this._parentElement.addEventListener("click", (e) => {
      const inputQuantity = e.target.closest(".input-quantity");
      if (!inputQuantity) return;
      const quantity = +inputQuantity.value;
      const description = inputQuantity.dataset.description;
      const id = inputQuantity.id.slice(1);
      handlerFunction(quantity, description, id);
    });
  }
}

export default new MarketView();
