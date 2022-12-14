import {
  API_URL,
  RECIPES_RESULTS_PER_PAGE,
  API_KEY,
  DANGEROUS_SYMBOLS_AND_WORDS,
} from "../../shared/config.js";
import { AJAX } from "./helpers.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    resultsPerPage: RECIPES_RESULTS_PER_PAGE,
    currentPage: 1,
  },
  bookmarks: [],
  cartIngredients: [],
  recipesInCart: [],
  recipesDates: [],
};

const createRecipeObj = (data) => {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceURL: recipe.source_url,
    img: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async (id) => {
  try {
    const URL = `${API_URL}/${id}?key=${API_KEY}`;
    const data = await AJAX(URL);
    state.recipe = createRecipeObj(data);
    if (state.bookmarks.some((bookmark) => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const loadSearchResults = async (query) => {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
    state.search.results = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        img: recipe.image_url,
        ...(recipe.key && { key: recipe.key }),
      };
    });
    state.search.currentPage = 1;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getSearchResultsPage = (page = state.search.currentPage) => {
  state.search.currentPage = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = (servings) => {
  //chancing the quantity of ingredients based on the servings
  state.recipe.ingredients.forEach((ingredient) => {
    ingredient.quantity =
      (ingredient.quantity * servings) / state.recipe.servings;
  });
  state.recipe.servings = servings;
};

const storeBookmarks = () => {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = (recipe) => {
  //add bookmark
  state.bookmarks.push(recipe);
  //mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }
  storeBookmarks();
};

export const deleteBookmark = (id) => {
  const index = state.bookmarks.findIndex((bookmark) => bookmark.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }
  storeBookmarks();
};

export const loadBookmarks = () => {
  const storage = localStorage.getItem("bookmarks");
  if (storage) {
    state.bookmarks = JSON.parse(storage);
  }
};

export const uploadRecipe = async (data) => {
  try {
    const ingredients = Object.entries(data)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map(([_, ingredientData]) => {
        const ingredientArr = ingredientData
          .split(",")
          .map((currentIngredient) => currentIngredient.trim());
        if (ingredientArr.length !== 3) {
          throw new Error(
            "You have to put all the ingredient informations (quantity, unit, description) and separate them with some commas (,)"
          );
        }
        const [quantity, unit, description] = ingredientArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    if (!ingredients.length) {
      throw new Error("You haven't put any ingredients!");
    }
    DANGEROUS_SYMBOLS_AND_WORDS.forEach((illegal) => {
      if (
        data.title.includes(illegal) ||
        data.image.includes(illegal) ||
        data.publisher.includes(illegal) ||
        ingredients.some(
          ({ _, unit, description }) =>
            unit.includes(illegal) || description.includes(illegal)
        )
      )
        throw new Error(
          "Potentially dangerous symbol or word included in your recipe"
        );
    });
    const recipe = {
      title: data.title,
      source_url: data.sourceUrl,
      image_url: data.image,
      publisher: data.publisher,
      cooking_time: data.cookingTime,
      servings: data.servings,
      ingredients,
    };
    const resData = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = createRecipeObj(resData);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

export const addIngredientsToCart = (ingredients, recipeId) => {
  try {
    const data = [...ingredients];
    data.forEach((currentData) => {
      currentData.id = recipeId;
    });
    state.cartIngredients.push(...data);
  } catch (err) {
    throw err;
  }
};

export const storeCartIngredients = () => {
  localStorage.setItem(
    "cartIngredients",
    JSON.stringify(state.cartIngredients)
  );
};

export const loadIngredientsInCart = () => {
  const storage = localStorage.getItem("cartIngredients");
  if (storage) {
    state.cartIngredients = JSON.parse(storage);
  }
};

export const filterIngredientsInCart = (description, id) => {
  state.cartIngredients = state.cartIngredients.filter(
    (ingredient) =>
      !(ingredient.description === description && ingredient.id === id)
  );
};

export const searchForIngredientInCart = (quantity, description, id) => {
  state.cartIngredients.forEach((ingredient) => {
    if (ingredient.id === id && ingredient.description === description) {
      ingredient.quantity = quantity;
    }
  });
};

const checkIfThereIsADateWithSameId = (dateID) => {
  return state.recipesDates.some(({ id }) => id === dateID);
};

export const storeDate = (date) => {
  state.recipe.date = date;
  console.log(date);
  localStorage.setItem(`date-${state.recipe.id}`, JSON.stringify(date));
};

export const storeInDatesArr = () => {
  if (checkIfThereIsADateWithSameId(state.recipe.id)) {
    state.recipesDates = state.recipesDates.filter(
      ({ id }) => id !== state.recipe.id
    );
    state.recipesDates.push({
      id: state.recipe.id,
      date: state.recipe.date,
      recipe: state.recipe.title,
    });
  } else if (
    checkIfThereIsADateWithSameId(state.recipe.id) &&
    !state.recipe.date
  ) {
    state.recipesDates = state.recipesDates.filter(
      ({ id }) => id !== state.recipe.id
    );
  } else {
    state.recipesDates.push({
      id: state.recipe.id,
      date: state.recipe.date,
      recipe: state.recipe.title,
    });
  }
};

export const saveDatesArr = () => {
  localStorage.setItem("datesArray", JSON.stringify(state.recipesDates));
};

export const loadDate = () => {
  const storage = localStorage.getItem(`date-${state.recipe.id}`);
  const storageArr = localStorage.getItem("datesArray");
  if (storage) {
    state.recipe.date = JSON.parse(storage);
  }
  if (storageArr) {
    state.recipesDates = JSON.parse(storageArr);
  }
};

const deleteLocalStorage = () => {
  localStorage.clear();
};

// deleteLocalStorage();
