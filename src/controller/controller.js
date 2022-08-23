import "core-js/stable";
import * as model from "./model/model.js";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView";
import bookmarksView from "./views/bookmarksView";
import addRecipeView from "./views/addRecipeView";
import marketView from "./views/marketView";
import calendarView from "./views/calendarView";
import menuView from "./views/menuView";
import { TIMEOUT_FORM_CLOSE_SECONDS } from "../shared/config";
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
const controlAddIngredientsToCart = (data) => {
  model.addIngredientsToCart(
    model.state.recipe.ingredients,
    model.state.recipe.id
  );
  model.storeCartIngredients();
  marketView.render(model.state.cartIngredients);
  localStorage.setItem(`disabled-${data.recipe.id}`, true);
};
const controlCart = () => {
  marketView.render(model.state.cartIngredients);
};
const controlRemoveIngredientFromCart = (description, id) => {
  model.filterIngredientsInCart(description, id);
  model.storeCartIngredients();
  marketView.render(model.state.cartIngredients);
  recipeView.render(model.state.recipe);
};
const controlChangeIngredientQuantity = (quantity, description, id) => {
  model.searchForIngredientInCart(quantity, description, id);
  model.storeCartIngredients();
};
const controlSaveDate = (date) => {
  model.storeDate(date);
  model.storeInDatesArr();
  model.saveDatesArr();
};
// const controlSaveInDatesArr = () => {
// };
const controlCalendar = () => {
  calendarView.render(model.state.recipesDates);
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
    resultsView.render(model.getSearchResultsPage(goToPage), true, errorMsg);
  } else {
    resultsView.render(model.getSearchResultsPage(goToPage));
  }
  paginationView.render(model.state.search);
};
const init = () => {
  recipeView.onRender(controlRecipes);
  searchView.onSearch(controlSearchResults);
  paginationView.onClick(controlPagination);
  recipeView.onUpdateServings(controlServings);
  recipeView.onAddBookmarks(controlAddBookmark);
  bookmarksView.onRender(controlLoadBookmarks);
  addRecipeView.onUploadRecipe(controlAddRecipe);
  recipeView.onAddIngredientsToCart(controlAddIngredientsToCart, model.state);
  marketView.onClickOpenCart(controlCart);
  marketView.addHandlerLoadMarket(model.loadIngredientsInCart);
  recipeView.onSaveDate(controlSaveDate);
  marketView.onRemoveIngredientFromMarket(controlRemoveIngredientFromCart);
  marketView.onChangeQuantity(controlChangeIngredientQuantity);
  calendarView.onClickDisplayCalendar(controlCalendar);
  resultsView.addHandlerClickMobileBookmarks(controlBookmarksMobile);
};
init();
