window.addEventListener('load', () => {
    const form = document.querySelector("#recipe-search");
    const input = document.querySelector("#search-input");
    const foundRecipes = document.querySelector("#found-recipes");
    const excludedIngredients = JSON.parse(localStorage.getItem('ingredients')) || [];


    form.addEventListener('submit', e => {
        e.preventDefault();

        let recipeSearch = input.value;

        console.log(excludedIngredients);
        //const recipe = await getRecipeResults(excludedIngredients);
    });

});


/* async function getRecipeResults(ingredients) {
	try {
		const response = await axios.get(`https://api.spoonacular.com/recipes/&excludeIngredients=${ingredients}&apiKey=78e4c5bb5b3b49b3b18ee417b2f0ed26`);
		console.log(response);
	}
	catch (error) {
		console.log(error);
	}
} */

//complexSearch?query=xxxxxx&addRecipeInformation=true