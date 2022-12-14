import View from "./shared/View";
import PreviewView from "./shared/previewView";
import { WIDTH_TRANSITION_UI } from "../../shared/config";
import { _ } from "core-js";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _searchResultsEl = document.querySelector(".search-results");
  _buttonClose = document.querySelector(".btn--close-search-results");
  _bookmarksMobile = document.getElementById("mobile-bookmarks");
  _errorMessage = "No recipes corresponding to your search. Please try again";
  _paginationEl = document.querySelector(".pagination");
  _mobileNav = document.querySelector(".mobile-nav");
  _recipeView = document.querySelector(".recipe");

  constructor() {
    super();
    this.onClickCloseButton(this._buttonClose, this._searchResultsEl);

    this.addHandlerClickRecipePreview();
  }

  _generateMarkup() {
    return this._data.map((data) => PreviewView.render(data, false)).join("");
  }

  addHandlerClickRecipePreview() {
    this._parentElement.addEventListener("click", (e) => {
      if (parseInt(window.innerWidth) > WIDTH_TRANSITION_UI) return;
      const clickedRecipe = e.target.closest(".preview");
      if (!clickedRecipe) return;
      this._searchResultsEl.classList.add("hidden");
      this._recipeView.classList.add("full-width");
    });
  }

  addHandlerClickMobileBookmarks(cb) {
    this._bookmarksMobile.parentElement.addEventListener("click", () => {
      this._mobileNav.classList.add("hidden");
      this._recipeView.classList.remove("full-width");
      this._searchResultsEl.classList.remove("hidden");
      this._paginationEl.innerHTML = "";
      if (parseInt(window.innerWidth) <= WIDTH_TRANSITION_UI) {
        this._recipeView.classList.add("hidden");
      }
      cb();
    });
  }
}

export default new ResultsView();
