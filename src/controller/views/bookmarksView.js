import View from "./shared/View";
import PreviewView from "./shared/previewView";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage =
    "No bookmarks available. Start saving your favourite recipes now!";
  _bookmarksButton = document.querySelector(
    ".nav__btn--bookmarks:not(#mobile-bookmarks)"
  );

  constructor() {
    super();
    this.onClick();
  }

  _generateMarkup() {
    return this._data
      .map((bookmark) => PreviewView.render(bookmark, false))
      .join("");
  }

  onRender(cb) {
    window.addEventListener("load", cb);
  }

  onClick() {
    this._bookmarksButton.addEventListener("click", () => {
      document.querySelector(".bookmarks").classList.remove("hidden");
    });
  }
}

export default new BookmarksView();
