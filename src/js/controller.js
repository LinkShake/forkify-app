import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";
import marketView from "./views/marketView.js";
import notificationsView from "./views/notificationsView.js";
import calendarView from "./views/calendarView.js";
import menuView from "./views/menuView.js";
import { TIMEOUT_FORM_CLOSE_SECONDS } from "./config.js";
if (module.hot) {
  module.hot.accept();
}
const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    //render spinner
    recipeView.renderSpinner();
    //update results view to selected
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
    //loading recipe
    await model.loadRecipe(id);
    model.loadDate();
    //render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner();
    //get search query
    const query = searchView.getQuery();
    if (!query) return;
    //load search results
    await model.loadSearchResults(query);
    //render query results and initial pagination button
    updatePagination();
  } catch (err) {
    console.error(err);
  }
};
const controlPagination = (goToPage = model.state.search.currentPage) => {
  updatePagination(null, goToPage);
};
const controlServings = (numberOfServings) => {
  //update the servings (in the state)
  model.updateServings(numberOfServings);
  //updating the recipeView
  recipeView.update(model.state.recipe);
};
const controlAddBookmark = () => {
  //add-remove bookmarks
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  //update UI
  recipeView.update(model.state.recipe);
  //render bookmarks in the UI
  bookmarksView.render(model.state.bookmarks);
};
const controlLoadBookmarks = () => {
  model.loadBookmarks();
  bookmarksView.render(model.state.bookmarks);
};
const controlAddRecipe = async (newRecipeData) => {
  try {
    addRecipeView.renderSpinner();
    //upload new recipe data
    await model.uploadRecipe(newRecipeData);
    //render the recipe
    recipeView.render(model.state.recipe);
    //success message
    addRecipeView.renderMessage();
    //render bookmarks view
    bookmarksView.render(model.state.bookmarks);
    //change id in the URL
    window.history.pushState(null, "", `#${model.state.recipe.id}`);
    //closing the form
    setTimeout(
      () => addRecipeView.toggleWindow(),
      TIMEOUT_FORM_CLOSE_SECONDS * 1000
    );
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};
const controlMarketIngredients = () => {
  model.addMarketIngredients(
    model.state.recipe.ingredients,
    model.state.recipe.id
  );
  model.storeMarketIngredients();
  marketView.render(model.state.marketIngredients);
};
const controlMarket = () => {
  paginationView._clearParentElement();
  marketView.render(model.state.marketIngredients);
};
const controlRemoveIngredientFromMarket = (description, id) => {
  model.filterIngredient(description, id);
  model.storeMarketIngredients();
  marketView.render(model.state.marketIngredients);
  recipeView.render(model.state.recipe);
};
const controlChangeQuantity = (quantity, description, id) => {
  model.searchForIngredient(quantity, description, id);
  model.storeMarketIngredients();
};
const controlSaveDate = (date) => {
  model.storeDate(date);
  model.increaseNotificationsCounter();
  model.storeNotificationsCounter();
};
const controlLoadNotifications = () => {
  model.loadNotificationsCounter();
};
const controlNotifications = () => {
  notificationsView.render(
    model.state.notificationsCounter,
    true,
    "notifications"
  );
};
const controlCalendar = () => {
  calendarView.render(model.state.dates);
};
const controlBookmarksMobile = () => {
  model.state.search.results = model.state.bookmarks;
  updatePagination(
    "No bookmarks available. Start saving your favourite recipes now!"
  );
};
const updatePagination = (
  errorMsg,
  goToPage = model.state.search.currentPage
) => {
  if (errorMsg) {
    resultsView.render(
      model.getSearchResultsPage(goToPage),
      true,
      "generic",
      errorMsg
    );
  } else {
    resultsView.render(model.getSearchResultsPage(goToPage));
  }
  paginationView.render(model.state.search);
};
const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmarks(controlAddBookmark);
  bookmarksView.addHandlerRender(controlLoadBookmarks);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  recipeView.addHandlerMarketIngredients(controlMarketIngredients, model.state);
  marketView.addHandlerMarket(controlMarket);
  marketView.addHandlerLoadMarket(model.loadMarketIngredients);
  recipeView.addHandlerSaveDate(controlSaveDate);
  notificationsView.addHandlerLoadNotificationsCounter(
    controlLoadNotifications
  );
  notificationsView.addHandlerRenderNotifications(controlNotifications);
  marketView.addHandlerRemoveIngredientFromMarket(
    controlRemoveIngredientFromMarket
  );
  marketView.addHandlerChangeQuantity(controlChangeQuantity);
  calendarView.addHandlerDisplayCalendar(controlCalendar);
  resultsView.addHandlerClickMobileBookmarks(controlBookmarksMobile);
};
init();
