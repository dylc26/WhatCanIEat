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

        const excludedIngredient_el = document.createElement("button");
        excludedIngredient_el.classList.add("excludeIngredient");
        excludedIngredient_el.setAttribute('id', excludeIngredient);
        excludedIngredient_el.setAttribute('class', "btn btn-primary ms-1");
        const excludedIngredient_content_el = document.createElement("div");
        // styling to center on button, display flex
        excludedIngredient_content_el.classList.add("content");

        excludedIngredient_el.appendChild(excludedIngredient_content_el);

        const excludedIngredient_input_el = document.createElement("p");
        excludedIngredient_input_el.innerHTML = excludeIngredient;
        
        excludedIngredient_content_el.appendChild(excludedIngredient_input_el);
        const removeElement = document.createElement("span");
        removeElement.setAttribute('class', "badge text-bg-secondary");
        removeElement.innerHTML = "x";
        excludedIngredient_content_el.appendChild(removeElement);

        list_el.appendChild(excludedIngredient_el);

        input.value = "";

        excludedIngredient_el.addEventListener('click', () => {
        var ingredientId = excludedIngredient_el.getAttribute('id');       

        var indexToRemove = ingredients.indexOf(ingredientId);
        
        console.log(indexToRemove);
        
        ingredients.splice(indexToRemove, 1);
        localStorage.setItem('ingredients', JSON.stringify(ingredients));    
        list_el.removeChild(excludedIngredient_el);
        
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