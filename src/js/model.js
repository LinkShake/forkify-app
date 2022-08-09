import { API_URL, RECIPES_RESULTS_PER_PAGE, API_KEY } from "./config.js";
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
  marketIngredients: [],
  recipesInMarket: [],
  dates: [],
  notificationsCounter: 0,
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

export const addMarketIngredients = (ingredients, recipeId) => {
  try {
    const data = [...ingredients];
    data.forEach((currentData) => {
      currentData.id = recipeId;
    });
    state.marketIngredients.push(...data);
  } catch (err) {
    throw err;
  }
};

export const storeMarketIngredients = () => {
  localStorage.setItem(
    "marketIngredients",
    JSON.stringify(state.marketIngredients)
  );
};

export const loadMarketIngredients = () => {
  const storage = localStorage.getItem("marketIngredients");
  if (storage) {
    state.marketIngredients = JSON.parse(storage);
  }
};

export const filterIngredient = (description, id) => {
  state.marketIngredients = state.marketIngredients.filter(
    (ingredient) =>
      !(ingredient.description === description && ingredient.id === id)
  );
};

export const searchForIngredient = (quantity, description, id) => {
  state.marketIngredients.forEach((ingredient) => {
    if (ingredient.id === id && ingredient.description === description) {
      ingredient.quantity = quantity;
    }
  });
};

export const storeDate = (date) => {
  localStorage.setItem(`date-${state.recipe.id}`, JSON.stringify(date));

  localStorage.removeItem("datesArray");

  state.dates.push({ id: state.recipe.id, date, recipe: state.recipe.title });

  localStorage.setItem("datesArray", JSON.stringify(state.dates));
};

export const loadDate = () => {
  const storage = localStorage.getItem(`date-${state.recipe.id}`);
  const storageArr = localStorage.getItem("datesArray");
  state.dates = [];

  if (storage) {
    state.recipe.date = JSON.parse(storage);
  }

  if (storageArr) {
    state.dates = JSON.parse(storageArr);
  }

  console.log(state.dates);
};

export const increaseNotificationsCounter = () => {
  state.notificationsCounter++;
};

export const storeNotificationsCounter = () => {
  localStorage.setItem(
    "notifications",
    JSON.stringify(state.notificationsCounter)
  );
};

export const loadNotificationsCounter = () => {
  const storage = localStorage.getItem("notifications");
  if (storage) {
    state.notificationsCounter = parseInt(JSON.parse(storage));
  }
};
