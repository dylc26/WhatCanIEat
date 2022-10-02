window.addEventListener('load', () => {
    const form = document.querySelector("#recipe-search");
    const input = document.querySelector("#search-input");
    const foundRecipes = document.querySelector("#found-recipes");
    const excludedIngredients = JSON.parse(localStorage.getItem('ingredients')) || [];

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
            cardImage.setAttribute('src', recipe.image)
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

            const openModal= document.createElement("button");
            openModal.setAttribute('class', "btn btn-primary");
            openModal.setAttribute('data-bs-toggle', "modal");
            openModal.setAttribute('data-bs-target', `${recipe.title}`);
            openModal.innerHTML="Expand";

            const cardSummary= document.createElement("p");
            cardSummary.setAttribute('class', "card-text");
            cardSummary.innerHTML = recipe.summary;
            
            column1.appendChild(cardImage);

            column2.appendChild(cardBody);
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardSummary);
            cardBody.appendChild(readyInMinutes);
            cardBody.appendChild(openModal);

            cardContainer.appendChild(card);
            card.appendChild(row);
            row.appendChild(column1);
            row.appendChild(column2);
            
            const modal= document.createElement("div");
            modal.setAttribute('class', "modal");
            modal.setAttribute("tabindex", "-1");
            modal.setAttribute('id', recipe.title);

            const modalDialog= document.createElement("div");
            modalDialog.setAttribute('class', "modal-dialog modal-dialog-scrollable");
            
            const modalContent= document.createElement("div");
            modalContent.setAttribute('class', "modal-content");

            const modalBody= document.createElement("div");
            modalBody.setAttribute('class', "modal-body");

            const modalFooter= document.createElement("div");
            modalFooter.setAttribute('class', "modal-footer");

            const closeModal= document.createElement("button");
            closeModal.setAttribute('class', "btn btn-primary");
            closeModal.setAttribute('data-bs-dismiss', "modal");
            closeModal.innerHTML="Close"

            const recipeExpand = document.createElement("iframe");
            recipeExpand.setAttribute('src', recipe.spoonacularSourceUrl);

            modal.appendChild(modalDialog);
            modalDialog.appendChild(modalContent);
            modalContent.appendChild(modalBody);
            modalContent.appendChild(modalFooter);

            modalFooter.appendChild(closeModal);
            modalBody.appendChild(recipeExpand);
                        
            card.appendChild(modal);

        });
        
        foundRecipes.appendChild(cardContainer);

    }

    form.addEventListener('submit', async e => {
        e.preventDefault();

        let recipeSearch = input.value;

        console.log(excludedIngredients);
        
        const recipes = await getRecipeResults(excludedIngredients.toString(), recipeSearch);
        console.log(recipes);
        
        const element = document.getElementById("cardContainer")
        if(element)element.remove();

        renderRecipes(recipes);
        
        });

    });

async function getRecipeResults(ingredients, recipeSearch) {
	try {
        var request = `https://api.spoonacular.com/recipes/complexSearch?query=${recipeSearch}&number=5&addRecipeInformation=true&addRecipeNutrition=true&excludeIngredients=${ingredients}&apiKey=78e4c5bb5b3b49b3b18ee417b2f0ed26`
		console.log(request);
        const response = await axios.get(request);
        return response.data.results
	}
	catch (error) {
		console.log(error);
	}
}

/* save recipes?

Default:
"summary":"Need a <b>gluten free and dairy free main course</b>? Hawaiian Barbequed \"Huli-Huli\" Chicken could be a great recipe to try. For <b>$1.13 per serving</b>, this recipe <b>covers 18%</b> of your daily requirements of vitamins and minerals. One serving contains <b>478 calories</b>, <b>27g of protein</b>, and <b>24g of fat</b>. 1 person has tried and liked this recipe. If you have garlic cloves, soy sauce, ketchup, and a few other ingredients on hand, you can make it. From preparation to the plate, this recipe takes around <b>45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 45%</b>. This score is good.

Condensed:
"summary":"Need a <b>"diets" "dishTypes"</b>? "title" could be a great recipe to try. **One serving contains <b>478 calories</b>, <b>27g of protein</b>, and <b>24g of fat</b>.** All things considered, we decided this recipe <b>deserves a spoonacular score of 45%</b>.

** where are these values coming from?

If we do a saved recipes tab, save by "spoonacularSourceUrl", display "title" */