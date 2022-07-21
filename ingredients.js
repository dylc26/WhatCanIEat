//window.localStorage

window.addEventListener('load', () => {
    const form = document.querySelector("#ingredients-to-exclude");
    const input = document.querySelector("#exclude-input");
    const list_el = document.querySelector("#excluded-ingredients");

    form.addEventListener('submit', e => {
        e.preventDefault();

        const exi = input.value;

        const exi_el = document.createElement("div");
        exi_el.classList.add("exi");

        const exi_content_el = document.createElement("div");
        exi_content_el.classList.add("content");

        exi_el.appendChild(exi_content_el);

        const exi_input_el = document.createElement("input");
        exi_input_el.classList.add("text");
        exi_input_el.type = "text";
        exi_input_el.value = exi;
        exi_input_el.setAttribute("readonly", "readonly");
        
        exi_content_el.appendChild(exi_input_el);
    
        const exi_actions_el = document.createElement("div");
        exi_actions_el.classList.add("actions");

		const exi_edit_el = document.createElement("button");
		exi_edit_el.classList.add("edit");
		exi_edit_el.innerHTML = "Edit";

        const exi_remove_el = document.createElement("button");
        exi_remove_el.classList.add("remove");
        exi_remove_el.innerHTML = "Remove";

        exi_actions_el.appendChild(exi_edit_el);
		exi_actions_el.appendChild(exi_remove_el);

        exi_el.appendChild(exi_actions_el);

        list_el.appendChild(exi_el);

        input.value = "";

		exi_edit_el.addEventListener('click', () => {
			if (exi_edit_el.innerText.toLowerCase() === "edit") {
				exi_input_el.removeAttribute("readonly");
				exi_input_el.focus();
				exi_edit_el.innerText = "Save";
			} else {
				exi_input_el.setAttribute("readonly", "readonly");
				exi_edit_el.innerText = "Edit";	
			}
		});	

        exi_remove_el.addEventListener('click', () => {
            list_el.removeChild(exi_el);
        });
    });
});