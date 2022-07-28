window.addEventListener('load', () => {
    const form = document.querySelector("#recipe-search");
    const input = document.querySelector("#search-input");
    const list_el = document.querySelector("#found-recipes");

    form.addEventListener('submit', e => {
        e.preventDefault();

        let recipeSearch = input.value;

        
    
    });

});


//async function getRecipeResults() {
	//try {
		//const response = await axios.get("");
		//console.log(response);
	//}
	//catch (error) {
		//console.log(error);
	//}
//}