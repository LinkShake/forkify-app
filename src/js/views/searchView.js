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

  addHandlerSearch(handlerFunction) {
    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault();
      // this._recipeView.classList.add("hidden");
      this._recipeView.classList.remove("full-width");
      this._results.classList.remove("hidden");
      handlerFunction();
    });
  }
}

export default new SearchView();
