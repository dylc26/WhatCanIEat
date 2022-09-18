window.addEventListener('load', () => {
    const form = document.querySelector("#recipe-search");
    const input = document.querySelector("#search-input");
    const foundRecipes = document.querySelector("#found-recipes");
    const excludedIngredients = JSON.parse(localStorage.getItem('ingredients')) || [];

// copy from excluded ingredients script and bootstrap get title for foundRecipes
    /*  if (recipes.length > 0) {
        foundRecipes.forEach(element => {
            foundRecipes(element);
        });
     }; */

    function renderRecipes(recipes) {
        const cardContainer = document.createElement("div");
        cardContainer.setAttribute('id', "cardContainer");

        recipes.forEach(recipe => {
            const card= document.createElement("div");
            card.setAttribute('class', "card mb-3");
            
            const row= document.createElement("div");
            row.setAttribute('class', 'row g-0');

            const column1= document.createElement("div");
            column1.setAttribute('class', "col-md-4");

            const cardImage= document.createElement("img");
            cardImage.setAttribute('class', "img-fluid rounded-start");
            cardImage.setAttribute('img', recipe.image)
            cardImage.setAttribute('alt', recipe.title)

            const column2= document.createElement("div");
            column2.setAttribute('class', "col-md-8");

            const cardBody= document.createElement("div");
            cardBody.setAttribute('class', "card-body");

            const cardTitle= document.createElement("h5");
            cardTitle.setAttribute('class', "card-title");
            cardTitle.innerHTML = recipe.title;

            const readyInMinutes= document.createElement("p");
            readyInMinutes.setAttribute('class', "card-text");
            readyInMinutes.innerHTML = "Ready in minutes " + recipe.readyInMinutes;

            const cardSummary= document.createElement("p");
            cardSummary.setAttribute('class', "card-text");
            cardSummary.innerHTML = recipe.summary;
            
            column1.appendChild(cardImage);

            column2.appendChild(cardBody);
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardSummary);
            cardBody.appendChild(readyInMinutes);

            cardContainer.appendChild(card);
            card.appendChild(row);
            row.appendChild(column1);
            row.appendChild(column2);
            
        });
        
        foundRecipes.appendChild(cardContainer);

    }

    form.addEventListener('submit', async e => {
        e.preventDefault();

        let recipeSearch = input.value;

        console.log(excludedIngredients);
        
        const recipes = await getRecipeResults(excludedIngredients.toString(), recipeSearch);
        console.log(recipes);
        
        renderRecipes(recipes);
        
        });

    });

async function getRecipeResults(ingredients, recipeSearch) {
	try {
        var request = `https://api.spoonacular.com/recipes/complexSearch?query=${recipeSearch}&number=10&addRecipeInformation=true&excludeIngredients=${ingredients}&apiKey=78e4c5bb5b3b49b3b18ee417b2f0ed26`
		console.log(request);
        const response = await axios.get(request);
        return response.data.results
	}
	catch (error) {
		console.log(error);
	}
}

// how do we want to display results? cards
// titles on top left screen - cook time/prep time top right screen
// save recipes?