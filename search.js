window.addEventListener('load', () => {
    const form = document.querySelector("#recipe-search");
    const input = document.querySelector("#search-input");
    const foundRecipes = document.querySelector("#found-recipes");
    const excludedIngredients = JSON.parse(localStorage.getItem('ingredients')) || [];


    form.addEventListener('submit', async e => {
        e.preventDefault();

        let recipeSearch = input.value;

        console.log(excludedIngredients);
        
        const recipes = await getRecipeResults(excludedIngredients.toString(), recipeSearch);
        console.log(recipes);
        //check length of recipes greater than zero
        
    });

});


async function getRecipeResults(ingredients, recipeSearch) {
	try {
        var request = `https://api.spoonacular.com/recipes/complexSearch?query=${recipeSearch}&number=5&addRecipeInformation=true&excludeIngredients=${ingredients}&apiKey=78e4c5bb5b3b49b3b18ee417b2f0ed26`
		console.log(request);
        const response = await axios.get(request);
        return response.data.results
	}
	catch (error) {
		console.log(error);
	}
}

// how do we want to display results?
// titles on top left screen - cook time/prep time top right screen
// save recipes?