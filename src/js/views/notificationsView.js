import View from "./View.js";

class NotificationsView extends View {
  _parentElement = document.querySelector(".notifications");
  _errorMessage = "No recipes today! Relax and enjoy your next 24h!";

  addHandlerLoadNotificationsCounter(handlerFunction) {
    window.addEventListener("load", handlerFunction());
  }

  addHandlerRenderNotifications(handlerFunction) {
    window.addEventListener("load", handlerFunction());
  }

  _generateMarkup() {
    if (this._data) {
      return `<div class="notification"><p>You have ${this._data} recipes to do today</p></div>`;
    }
  }
}

export default new NotificationsView();
