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
            cardImage.setAttribute('class', "image img-fluid rounded-start");
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
            openModal.setAttribute('data-toggle', "modal");
            openModal.setAttribute('data-target', `#${String(recipe.id)}`);
            openModal.innerHTML="Expand";

            const cardSummary= document.createElement("p");
            cardSummary.setAttribute('class', "card-text");
            var recipeSummary= generateSummary(recipe);
            cardSummary.innerHTML = recipeSummary;
            
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
            modal.setAttribute("tabindex", "9999");
            modal.setAttribute('id', String(recipe.id));
            modal.setAttribute("aria-hidden", "false");
            modal.setAttribute("role", "dialog");

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
            closeModal.setAttribute('data-dismiss', "modal");
            closeModal.innerHTML="Close"

            const recipeExpand = document.createElement("iframe");
            recipeExpand.setAttribute('src', recipe.spoonacularSourceUrl);
            recipeExpand.setAttribute('class', "browser");

            modal.appendChild(modalDialog);
            modalDialog.appendChild(modalContent);
            modalContent.appendChild(modalBody);
            modalContent.appendChild(modalFooter);

            modalFooter.appendChild(closeModal);
            modalBody.appendChild(recipeExpand);
                        
            cardBody.appendChild(modal);

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
        if(recipes.length===0){
            const cardContainer = document.createElement("div");
            cardContainer.setAttribute('id', "cardContainer"); 
            cardContainer.innerHTML = "No recipes found.";     
             foundRecipes.appendChild(cardContainer);
        } else{
            renderRecipes(recipes);
        }
        
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

function generateSummary(recipe) {

let summaryIndex = recipe.summary.search(/%/)
let result = recipe.summary.substring(summaryIndex -2, summaryIndex);
let score = result=="00" ? "100" : result;
let diets = recipe.diets.toString().split(",").join(", ")
let dishTypes = recipe.dishTypes.toString().split(",").join(", ")

var summary = `Need a <b>${diets} ${dishTypes}?</b> This could be a great recipe to try. One serving contains <b> ${recipe.nutrition.nutrients[0].amount} calories,  ${recipe.nutrition.nutrients[8].amount}g of protein, ${recipe.nutrition.nutrients[1].amount}g of fat</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of ${score}%</b>.`;

return summary
}





/* save recipes?*/