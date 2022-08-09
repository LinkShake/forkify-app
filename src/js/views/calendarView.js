import View from "./View.js";

class CalendarView extends View {
  _parentElement = document.querySelector(".calendar-table");
  _calendarButton = document.querySelector(".nav__btn--calendar");
  _calendarButtonMobile = document.querySelector(".nav__btn--calendar-mobile");
  _calendarWrapper = document.querySelector(".calendar-wrapper");
  _buttonClose = document.querySelector(".btn--close-calendar");
  _errorMessage = "You haven't saved any recipe in your calendar yet";

  constructor() {
    super();
    this.addHandlerClickCloseButton(
      this._buttonClose,
      this._calendarWrapper,
      true
    );
  }

  addHandlerDisplayCalendar(handlerFunction) {
    this._calendarButton.addEventListener("click", () => {
      this._calendarWrapper.classList.toggle("hidden");
      handlerFunction();
    });
    this._calendarButtonMobile.parentElement.addEventListener("click", () => {
      document.querySelector(".mobile-nav").classList.add("hidden");
      this._calendarWrapper.classList.remove("hidden");
    });
  }

  _generateMarkup() {
    return this._data.map(({ id, date }) => {
      return `<tr class="calendar-tr">
                <td class="calendar-td">${id}</td>
                 <td class="calendar-td">${date}</td>
            </tr>`;
    });
  }
}

export default new CalendarView();
