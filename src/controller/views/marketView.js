import View from "./shared/View";
import { WIDTH_TRANSITION_UI } from "../../shared/config";

class MarketView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage =
    "You still don't have any ingredients in your market. Start buying now!";
  _searchResultsEl = document.querySelector(".search-results");
  _buttonClose = document.querySelector(".btn--close-search-results");
  _recipeView = document.querySelector(".recipe");

  constructor() {
    super();
    this.onClickCloseButton(this._buttonClose, this._searchResultsEl);
  }

  onClickOpenCart(cb) {
    [
      document.querySelector(".nav__btn--market"),
      document.querySelector(".nav__btn--market-mobile").parentElement,
    ].forEach((el) =>
      el.addEventListener("click", () => {
        this._recipeView.classList.remove("full-width");
        this._searchResultsEl.classList.remove("hidden");
        document.querySelector(".mobile-nav").classList.add("hidden");
        if (parseInt(window.innerWidth) <= WIDTH_TRANSITION_UI) {
          this._recipeView.classList.add("hidden");
        }
        document.querySelector(".pagination").innerHTML = "";
        cb();
      })
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

  addHandlerLoadMarket(cb) {
    window.addEventListener("load", cb());
  }

  onRemoveIngredientFromMarket(cb) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--remove-ingredient");
      if (!btn) return;
      const description = btn.dataset.description;
      const id = btn.id;
      cb(description, id);
    });
  }

  onChangeQuantity(cb) {
    this._parentElement.addEventListener("click", (e) => {
      const inputQuantity = e.target.closest(".input-quantity");
      if (!inputQuantity) return;
      const quantity = +inputQuantity.value;
      const description = inputQuantity.dataset.description;
      const id = inputQuantity.id.slice(1);
      cb(quantity, description, id);
    });
  }
}

export default new MarketView();
