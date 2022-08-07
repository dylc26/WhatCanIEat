window.addEventListener('load', () => {
    let storedIngredients = JSON.parse(localStorage.getItem('ingredients')) || [];
    const form = document.querySelector("#ingredients-to-exclude");
    const input = document.querySelector("#exclude-input");
    const list_el = document.querySelector("#excluded-ingredients");
    let ingredients = []

    form.addEventListener('submit', e => {
        e.preventDefault();

        const excludeIngredient = input.value;
        ingredients.push (excludeIngredient);
        localStorage.setItem('ingredients', JSON.stringify(ingredients));
        const excludedIngredient_el = document.createElement("div");
        excludedIngredient_el.classList.add("excludeIngredient");
        const excludedIngredient_content_el = document.createElement("div");
        excludedIngredient_content_el.classList.add("content");

        excludedIngredient_el.appendChild(excludedIngredient_content_el);

        const excludedIngredient_input_el = document.createElement("input");
        excludedIngredient_input_el.classList.add("text");
        excludedIngredient_input_el.type = "text";
        excludedIngredient_input_el.value = excludeIngredient;
        excludedIngredient_input_el.setAttribute("readonly", "readonly");
        
        excludedIngredient_content_el.appendChild(excludedIngredient_input_el);
    
        const excludedIngredient_actions_el = document.createElement("div");
        excludedIngredient_actions_el.classList.add("actions");

		const excludedIngredient_edit_el = document.createElement("button");
		excludedIngredient_edit_el.classList.add("edit");
		excludedIngredient_edit_el.innerHTML = "Edit";

        const excludedIngredient_remove_el = document.createElement("button");
        excludedIngredient_remove_el.classList.add("remove");
        excludedIngredient_remove_el.innerHTML = "Remove";

        excludedIngredient_actions_el.appendChild(excludedIngredient_edit_el);
		excludedIngredient_actions_el.appendChild(excludedIngredient_remove_el);

        excludedIngredient_el.appendChild(excludedIngredient_actions_el);

        list_el.appendChild(excludedIngredient_el);

        input.value = "";

		excludedIngredient_edit_el.addEventListener('click', () => {
			if (excludedIngredient_edit_el.innerText.toLowerCase() === "edit") {
				excludedIngredient_input_el.removeAttribute("readonly");
				excludedIngredient_input_el.focus();
				excludedIngredient_edit_el.innerText = "Save";
			} else {
				excludedIngredient_input_el.setAttribute("readonly", "readonly");
				excludedIngredient_edit_el.innerText = "Edit";	
			}
		});	

        excludedIngredient_remove_el.addEventListener('click', () => {
            list_el.removeChild(excludedIngredient_el);
        });
        console.log(ingredients);
        console.log(ingredients.toString());
    });
});



//use target.reset to clear forms?
//add createdAt, (sort) ingredients by most recent date at top?