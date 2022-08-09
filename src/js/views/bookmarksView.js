import View from "./View.js";
import PreviewView from "./previewView.js";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage =
    "No bookmarks available. Start saving your favourite recipes now!";
  _bookmarksButton = document.querySelector(
    ".nav__btn--bookmarks:not(#mobile-bookmarks)"
  );

  constructor() {
    super();
    this.addHandlerClick();
  }

  _generateMarkup() {
    return this._data
      .map((bookmark) => PreviewView.render(bookmark, false))
      .join("");
  }

  addHandlerRender(handlerFunction) {
    window.addEventListener("load", handlerFunction);
  }

  addHandlerClick() {
    this._bookmarksButton.addEventListener("click", () => {
      document.querySelector(".bookmarks").classList.remove("hidden");
    });
  }
}

export default new BookmarksView();
