const letters = '';
const buttonContainer = document.getElementById('letter-buttons');
const mealList = document.getElementById('meal-list');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

searchBtn.addEventListener('click', () => {
  const keyword = searchInput.value.trim();
  if (keyword) {
    fetchMealsByName(keyword);
  }
});

// Fetch meals by A-Z letter
async function fetchMealsByLetter(letter) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  const data = await res.json();
  displayMeals(data.meals || []);
}

async function fetchMealsByName(name) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await res.json();
  displayMeals(data.meals || []);
}

// Display meal cards
function displayMeals(meals) {
  mealList.innerHTML = '';

  if (meals.length === 0) {
    mealList.innerHTML = `<p class="text-center text-muted">No meals found.</p>`;
    return;
  }

  meals.forEach(meal => {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    col.innerHTML = `
      <div class="card shadow-sm h-100 text-center p-3">
        <img src="${meal.strMealThumb}"
        style="width: 100%; border-radius:8px;" alt="${meal.strMeal}" class="mb-3 mx-auto" />
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <button class="btn btn-sm btn-outline-info" onclick='showDetails(${JSON.stringify(meal).replace(/'/g, "\\'")})' data-bs-toggle="modal" data-bs-target="#mealModal">
            Details
          </button>
        </div>
      </div>
    `;
    mealList.appendChild(col);
  });
}

function showDetails(meal) {
  document.getElementById('mealModalLabel').innerText = meal.strMeal;

  const modalImg = document.getElementById('modal-img');
  modalImg.src = meal.strMealThumb;
  modalImg.style.width = '100%';
  modalImg.style.height = 'auto';
  modalImg.style.objectFit = 'cover';

  const ingredientsList = document.getElementById('modal-ingredients');
  ingredientsList.innerHTML = '';

  for (let i = 1; i <= 15; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      const li = document.createElement('li');
      li.textContent = `${ingredient} - ${measure}`;
      ingredientsList.appendChild(li);
    }
  }
}


