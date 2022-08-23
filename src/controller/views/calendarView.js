import View from "./shared/View";

class CalendarView extends View {
  _parentElement = document.querySelector(".dates");
  _calendarButton = document.querySelector(".nav__btn--calendar");
  _calendarButtonMobile = document.querySelector(".nav__btn--calendar-mobile");
  _calendarWrapper = document.querySelector(".calendar-wrapper");
  _buttonClose = document.querySelector(".btn--close-calendar");
  _errorMessage = "You haven't saved any recipe in your calendar yet";

  constructor() {
    super();
    this.onClickCloseButton(this._buttonClose, this._calendarWrapper, true);
  }

  onClickDisplayCalendar(cb) {
    this._calendarButton.addEventListener("click", () => {
      this._calendarWrapper.classList.toggle("hidden");
      cb();
    });
    this._calendarButtonMobile.parentElement.addEventListener("click", () => {
      document.querySelector(".mobile-nav").classList.add("hidden");
      document.querySelector(".recipe").classList.add("overflow-hidden-class");
      this._calendarWrapper.classList.remove("hidden");
      cb();
    });
  }

  _generateMarkup() {
    return this._data
      .map(({ _, date, recipe }) => {
        if (date) {
          return `<div class="box-date"><strong>${date}:</strong> ${recipe}</div>`;
        } else if (!date && this._data.every(({ _, date }) => !date)) {
          this.renderError();
        } else {
          return;
        }
      })
      .join("");
  }
}

export default new CalendarView();
