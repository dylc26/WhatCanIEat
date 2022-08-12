window.addEventListener('load', () => {
    
    const form = document.querySelector("#ingredients-to-exclude");
    const input = document.querySelector("#exclude-input");
    const list_el = document.querySelector("#excluded-ingredients");
    let ingredients = JSON.parse(localStorage.getItem('ingredients')) || [];

    form.addEventListener('submit', e => {
        e.preventDefault();

        const excludeIngredient = input.value;

        /* function emptyField() {
            var empty = document.form.input.value;
            if (empty === "") {
                alert("Please enter an ingredient");
                return false;
            } else {
                return true;
        } */

        ingredients.push (excludeIngredient);
        ingredients.sort();
        localStorage.setItem('ingredients', JSON.stringify(ingredients));
        const excludedIngredient_el = document.createElement("div");
        excludedIngredient_el.classList.add("excludeIngredient");
        excludedIngredient_el.setAttribute('id', input.value);
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


// stop 'add to list' button from working with nothing entered in the form
//use target.reset to clear forms?
//(.sort) ingredients alphabetically?
        // things to consider/avoid
        //
        // re-creating every element with each addition
        //
        // [apples, cocunuts]
        // add banana
        // [apples, bananas, coconuts]

        // what was the food after bananas? bananas+1
        // cocunuts
        // lets get the div with id coconuts
        // .insertBefore cocunuts our bananas div

/* var removeDuplicates = ingredients.slice()
  .sort(function(a,b){
    return a > b;
  })
  .reduce(function(a,b){
    if (a.slice(-1)[0] !== b) a.push(b);
    return a; */