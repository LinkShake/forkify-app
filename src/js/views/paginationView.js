import View from "./View.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handlerFunction) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      const gotoPage = +btn.dataset.goto;
      this._data.currentPage = gotoPage;
      handlerFunction();
    });
  }

  _generateMarkup() {
    const numberOfPages = Math.ceil(
      this._data?.results.length / this._data?.resultsPerPage
    );
    //page 1, there are other pages
    if (this._data.currentPage === 1 && numberOfPages > 1) {
      return `<div class="wrapper" style="padding-left: 14.5rem;">${this._generateCurrentPage(
        this._data.currentPage
      )} ${this._generateBtnNext(this._data.currentPage)}</div>`;
    }
    //last page
    if (this._data.currentPage === numberOfPages && numberOfPages > 1) {
      return `<div class="wrapper" style="transform: translateX(-8.11rem)">${this._generateBtnPrevious(
        this._data.currentPage
      )} ${this._generateCurrentPage(this._data.currentPage)}</div>`;
    }
    //other page
    if (this._data.currentPage < numberOfPages) {
      return `<div class="wrapper">${this._generateBtnPrevious(
        this._data.currentPage
      )} ${this._generateCurrentPage(
        this._data.currentPage
      )} ${this._generateBtnNext(this._data.currentPage)}</div>`;
    }
    if (!this._data.length) {
      return "";
    }
    //page 1, no other pages
    return `<div class="wrapper" style="padding-left: 14.3rem;">${this._generateCurrentPage(
      this._data.currentPage
    )}</div>`;
  }

  _generateBtnNext(currentPage) {
    return `<button data-goto="${
      currentPage + 1
    }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
  }

  _generateBtnPrevious(currentPage) {
    return `<button data-goto="${
      currentPage - 1
    }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>`;
  }

  _generateCurrentPage(currentPage) {
    return `<div class="current-page">
        <span>${currentPage}</span>
      </div>`;
  }
}

export default new PaginationView();
