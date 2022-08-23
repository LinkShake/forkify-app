import { WIDTH_TRANSITION_UI } from "../../shared/config";

class SearchView {
  _parentElement = document.querySelector(".search");
  _recipeView = document.querySelector(".recipe");
  _results = document.querySelector(".search-results");

  getQuery() {
    const query = this._parentElement.querySelector(".search__field").value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector(".search__field").value = "";
  }

  onSearch(cb) {
    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._recipeView.classList.remove("full-width");
      this._results.classList.remove("hidden");
      document.querySelector(".calendar-wrapper").classList.add("hidden");
      if (parseInt(window.innerWidth) <= WIDTH_TRANSITION_UI) {
        this._recipeView.classList.add("hidden");
      }
      cb();
    });
  }
}

export default new SearchView();
