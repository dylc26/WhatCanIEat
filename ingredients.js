window.addEventListener('load', () => {
    
    const form = document.querySelector("#ingredients-to-exclude");
    const input = document.querySelector("#exclude-input");
    const list_el = document.querySelector("#excluded-ingredients");
    let ingredients = JSON.parse(localStorage.getItem('ingredients')) || [];

    if (ingredients.length > 0) {
        ingredients.forEach(element => {
            updateIngredientList(element);
        });
    }

    function updateIngredientList(excludeIngredient) {

        const excludedIngredient_el = document.createElement("div");
        excludedIngredient_el.classList.add("excludeIngredient");
        excludedIngredient_el.setAttribute('id', excludeIngredient);
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

        const excludedIngredient_remove_el = document.createElement("button");
        excludedIngredient_remove_el.classList.add("remove");
        excludedIngredient_remove_el.innerHTML = "Remove";

        excludedIngredient_actions_el.appendChild(excludedIngredient_remove_el);

        excludedIngredient_el.appendChild(excludedIngredient_actions_el);

        list_el.appendChild(excludedIngredient_el);

        input.value = "";

        excludedIngredient_remove_el.addEventListener('click', () => {
        list_el.removeChild(excludedIngredient_el);
        // logic to remove from array
        var indexToRemove = ingredients.indexOf(excludedIngredient => {
            return object.id === excludedIngredient
        });
        console.log(indexToRemove);
        
        ingredients.splice(indexToRemove, 1);

         // logic to remove from array
        });

        return excludedIngredient_el;

    };

    form.addEventListener('submit', e => {
        e.preventDefault();

        const value = input.value;
        const excludeIngredient = value.trim();

        if (ingredients.indexOf(excludeIngredient) !== -1 || excludeIngredient === "") {
            alert("Invalid entry, please try another entry");
            return false;
        } 

        ingredients.push (excludeIngredient);
        ingredients.sort();
        localStorage.setItem('ingredients', JSON.stringify(ingredients));
        
        var index = ingredients.indexOf (excludeIngredient);
        console.log(ingredients.length, index);

        if (index +1 !== ingredients.length) {
            var nextIngredient = ingredients[index +1]   
            var nextDiv = document.getElementById(nextIngredient); 
            console.log(nextIngredient, nextDiv);   

            var excludedIngredient_el = updateIngredientList(excludeIngredient);
            console.log(excludedIngredient_el);
            const parentDiv = document.getElementById("excluded-ingredients");

            parentDiv.insertBefore(excludedIngredient_el, nextDiv)

        } else {

            updateIngredientList(excludeIngredient);

            console.log(ingredients);
            console.log(ingredients.toString());
        }  

    });
});