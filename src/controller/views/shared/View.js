import icons from "url:../../../img/icons.svg";
import { WIDTH_TRANSITION_UI } from "../../../shared/config";
export default class View {
  _parentElement = document.querySelector(".recipe");
  _data;
  _errorMessage =
    "We are not aible to find that recipe. We're so sorry for the inconvenience. Try again, maybe check if the spelling of the recipe name is right!";
  _searchResultsEl = document.querySelector(".search-results");

  constructor() {
    this.addHandlerResize();
    this.handleWidth();
    this.addHandlerLoad();
    this.addHandlerLanguage();
  }

  render(data, render = true, type = "generic", errorMsg = this._errorMessage) {
    this._parentElement?.classList?.remove("hidden");
    if (!data || (Array.isArray(data) && !data.length)) {
      return this.renderError(errorMsg);
    }
    this._data = data;
    if (!render) {
      return this._generateMarkup();
    }
    if (!(type === "notifications")) {
      this._clearParentElement();
    }
    const position = type === "notifications" ? "beforeend" : "afterbegin";
    this._parentElement.insertAdjacentHTML(position, this._generateMarkup());
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    //converting the string to a real DOM element
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = [...newDom.querySelectorAll("*")];
    const currentElements = [...this._parentElement.querySelectorAll("*")];
    newElements.forEach((element, i) => {
      const currentElement = currentElements[i];
      //changing only the different textContents
      if (
        !element.isEqualNode(currentElement) &&
        element.firstChild?.nodeValue.trim() !== ""
      ) {
        currentElement.textContent = element.textContent;
      }
      //changing all the different datasets
      if (!element.isEqualNode(currentElement)) {
        [...element.attributes].forEach((attribute) => {
          currentElement.setAttribute(attribute.name, attribute.value);
        });
      }
    });
  }

  _clearParentElement() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const spinnerElement = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;
    this._clearParentElement();
    this._parentElement.insertAdjacentHTML("afterbegin", spinnerElement);
  }

  renderError(errorMessage = this._errorMessage) {
    const errorElement = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${errorMessage}</p>
    </div>`;
    this._clearParentElement();
    this._parentElement.insertAdjacentHTML("afterbegin", errorElement);
  }

  renderMessage(message = this._successMessage) {
    const successElement = `<div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>`;
    this._clearParentElement();
    this._parentElement.insertAdjacentHTML("afterbegin", successElement);
  }

  addHandlerResize() {
    window.addEventListener("resize", () => {
      // console.log(document.querySelector(".results").children);
      document.querySelector(".bookmarks").classList.add("hidden");
      if (
        parseInt(window.innerWidth) <= WIDTH_TRANSITION_UI &&
        document.querySelector(".results").children.length === 0
      ) {
        this._searchResultsEl.classList?.add("hidden");
        this._parentElement.classList?.add("full-width");
      }

      if (parseInt(window.innerWidth) > WIDTH_TRANSITION_UI) {
        this._searchResultsEl.classList?.remove("hidden");
        this._parentElement.classList?.remove("full-width");
      }
    });
  }

  addHandlerClickCloseButton(button, elementToHide, calendarButton = false) {
    button.addEventListener("click", () => {
      elementToHide.classList.add("hidden");
      document.querySelector(".recipe").classList.remove("hidden");
      if (calendarButton) {
        if (parseInt(window.innerWidth) <= WIDTH_TRANSITION_UI)
          document.querySelector(".recipe").classList.add("full-width");
      } else document.querySelector(".recipe").classList.add("full-width");
    });
  }

  removeRecipeFullWidth() {
    document.querySelector(".recipe").classList.remove("full-width");
  }

  handleWidth() {
    window.addEventListener("resize", this.manageWidthFunction.bind(this));
  }

  manageWidthFunction() {
    if (
      !document.querySelector(".search-results").classList.contains("hidden") &&
      parseInt(window.innerWidth) <= WIDTH_TRANSITION_UI
    ) {
      document.querySelector(".recipe").classList.add("hidden");
    } else if (parseInt(window.innerWidth) > WIDTH_TRANSITION_UI) {
      document.querySelector(".recipe").classList.remove("hidden");
    }
  }

  addHandlerLoad() {
    window.addEventListener("load", () => {
      if (parseInt(window.innerWidth) <= WIDTH_TRANSITION_UI) {
        document.querySelector(".search-results").classList.add("hidden");
        document.querySelector(".recipe").classList.add("full-width");
      }
    });
  }

  addHandlerLanguage() {
    window.addEventListener("load", () => {
      let userLang = navigator.language || navigator.userLanguage;
      window.setAttribute("lang", userLang);
    });
  }
}
