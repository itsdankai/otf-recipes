const recipesList = document.getElementById("recipes-list");
const searchInput = document.getElementById("search-input");

// Sample recipes array (should be stored in Firebase)
let recipes = [];

document.getElementById("add-recipe-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const recipeName = document.getElementById("recipe-name-input").value.trim();

    if (recipeName) {
        recipes.push(recipeName);
        renderRecipes();
        document.getElementById("recipe-name-input").value = "";
    } else {
        alert("Recipe name cannot be empty!");
    }
});

// Function to render recipes
function renderRecipes() {
    recipesList.innerHTML = "";
    recipes.forEach((recipe, index) => {
        const li = document.createElement("li");
        li.textContent = recipe;

        // Add delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.onclick = () => {
            recipes.splice(index, 1);
            renderRecipes();
        };

        // Add edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "✏️";
        editBtn.onclick = () => {
            const newName = prompt("Edit recipe name:", recipe);
            if (newName) {
                recipes[index] = newName;
                renderRecipes();
            }
        };

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        recipesList.appendChild(li);
    });
}

// Search recipes
searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe => recipe.toLowerCase().includes(searchText));
    
    recipesList.innerHTML = "";
    filteredRecipes.forEach(recipe => {
        const li = document.createElement("li");
        li.textContent = recipe;
        recipesList.appendChild(li);
    });
});

