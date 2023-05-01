const recipes = document.getElementById("recipes");
const favorites = document.getElementById("favorites");
const search = document.getElementById("search");

async function randomRecipeData() {
  const response = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/random.php"
  );
  const recipeData = await response.json();
  recipes.innerHTML = createRecipe(recipeData.drinks[0], true);
}

const createRecipe = (recipe, random) => {
  return `<div class="recipe"><div class="recipe-logo"><img class="recipe-img" src="${
    recipe.strDrinkThumb
  }"></div>${
    random
      ? '<div class="recipe-random"><span class="recipe-random-text">Random recipe</span></div>'
      : ""
  }<div class="recipe-info"><span class="recipe-text">${
    recipe.strDrink
  }</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="fav-icon" onclick="addToFavorites(${
    recipe.idDrink
  })"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg></div></div>`;
};

const addToFavorites = (id) => {
  recipeByIdData(id).then((recipe) => {
    favorites.innerHTML =
      favorites.innerHTML +
      `<div class="fav"><div class="fav-logo"><img class="fav-img" src="${recipe.strDrinkThumb}" /></div><span class="fav-text">${recipe.strDrink}</span></div>`;
  });
};

randomRecipeData();
addToFavorites(178320);

async function recipeByIdData(id) {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const recipeData = await response.json();
  return recipeData.drinks[0];
}

const searchSubmit = () => {
  searchRecipeByNameData(search.value).then((response) => {
    recipes.innerHTML = "";
    response.forEach((recipe) => {
      recipes.innerHTML = recipes.innerHTML + createRecipe(recipe, false);
    });
  });
};

async function searchRecipeByNameData(name) {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
  );
  const recipeData = await response.json();
  return recipeData.drinks;
}
