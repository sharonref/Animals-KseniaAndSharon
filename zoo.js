let animalsForView = JSON.parse(localStorage.getItem("animals"));
let visitorsForView = JSON.parse(localStorage.getItem("visitors"));
let currentVisitor = JSON.parse(localStorage.getItem("currentVisitor"));

// ---navbar start --- //

function navbarHTML(visitor) {
  const wrapper = document.createElement("div");
  wrapper.className = "navbar";
  wrapper.innerHTML = `<p>Loged in: <span>${visitor.name}</span></p>
  <p>Coins: <span>${visitor.coins}</span></p>
  `;
  return wrapper;
}

function addVisitorToNavbar() {
  const dataToShow = navbarHTML(currentVisitor);
  const whereToAdd = document.getElementById("visitorData");
  whereToAdd.innerHTML = "";
  whereToAdd.appendChild(dataToShow);
}

const buttonReset = document.getElementById("reset");
buttonReset.addEventListener("click", () => {
  localStorage.clear();
  const setfieldVisitors = JSON.stringify(visitors);
  localStorage.setItem("visitors", setfieldVisitors);
  const setfieldAnimals = JSON.stringify(animals);
  localStorage.setItem("animals", setfieldAnimals);
  window.location.href = "./signup.html";
});

function innerSelectorsHTML(visitor) {
  const createOption = document.createElement("option");
  console.log(createOption);
  createOption.innerHTML = `<option value="${visitor.name}">${visitor.name}</option>`;
  return createOption;
}

function addVisitorsToDropdown() {
  const visitorsExistsNow = JSON.parse(localStorage.getItem("visitors"));
  const select = document.getElementById("visitors");
  select.innerHTML = "";

  visitorsExistsNow.forEach((animal) => {
    console.log(select);
    select.appendChild(innerSelectorsHTML(animal));
  });
}

//---navbar end --- //

function createHTML(animal) {
  const newDiv = document.createElement("div");
  newDiv.className = "animal-card";
  newDiv.innerHTML = `<img src="${animal.image}" alt="${animal.name} "/>
  <h2>Name: ${animal.name} </h2>
  <p>Is predator: ${animal.isPredator}</p>
  <p>Weight: ${animal.weight}</p>
  <p>Height: ${animal.height}</p>
  <p>Color: ${animal.color}</p>
  <p>Habitat: ${animal.habitat}</p>`;

  newDiv.addEventListener("click", () => {
    visitAnimal(animal);
  });
  return newDiv;
}

function renderAvailableAnimals() {
  const animalsCards = document.getElementById("animal-cards");
  animalsCards.innerHTML = "";
  animalsForView.forEach((animal) => {
    animalsCards.append(createHTML(animal));
  });
}

function visitAnimal(animal) {
  localStorage.setItem("currentAnimal", JSON.stringify(animal));
  visitorsForView.forEach((visitor) => {
    if (visitor.name === currentVisitor.name) {
      visitor.visited.push(animal);
    }
  });

  currentVisitor.visited.push(animal);
  localStorage.setItem("visitors", JSON.stringify(visitorsForView));
  localStorage.setItem("currentVisitor", JSON.stringify(currentVisitor));
  window.location.href = "./animal.html";
}

//-- filter start--//

const nameInput = document.getElementById("searchName");
const isPredatorInput = document.getElementById("predator");
const notPredatorInput = document.getElementById("notPredator");
const landHabitatInput = document.getElementById("land");
const seaHabitatInput = document.getElementById("sea");
const weightInput = document.getElementById("weight-search");
const heightInput = document.getElementById("height-search");
const colorInput = document.getElementById("color-search");
const clearBTN = document.getElementById("clearBTN");

let currentFilter = {
  name: "",
  isPredator: false,
  notPredator: false,
  isHabitatSea: false,
  isHabitatLand: false,
  weight: "",
  height: "",
  color: "",
};

function addToCurrentFilter() {
  currentFilter.name = nameInput.value;
  currentFilter.isPredator = isPredatorInput.value;
  currentFilter.notPredator = notPredatorInput.value;
  currentFilter.isHabitatSea = landHabitatInput.value;
  currentFilter.isHabitatLand = seaHabitatInput.value;
  currentFilter.weight = weightInput.value;
  currentFilter.height = heightInput.value;
  currentFilter.color = colorInput.value;

  localStorage.setItem("filters", JSON.stringify(currentFilter));
}

if (localStorage.getItem("filters")) {
  let filtersArrNew = JSON.parse(localStorage.getItem("filters"));
  currentFilter = filtersArrNew;

  let filteredArraysOld = JSON.parse(localStorage.getItem("AllFiltered"));
  console.log(filteredArraysOld);

  animalsForView = [...filteredArraysOld];
  renderAvailableAnimals();
}

nameInput.addEventListener("input", filterAll);
isPredatorInput.addEventListener("input", filterAll);
notPredatorInput.addEventListener("input", filterAll);
landHabitatInput.addEventListener("input", filterAll);
seaHabitatInput.addEventListener("input", filterAll);
weightInput.addEventListener("input", filterAll);
heightInput.addEventListener("input", filterAll);
colorInput.addEventListener("input", filterAll);
clearBTN.addEventListener("click", clearFilters);

function filterAll(filter) {
  let filterArr = JSON.parse(localStorage.getItem("animals"));
  if (nameInput.value) {
    filterArr = filterArr.filter((animal) => {
      return animal.name.toLowerCase().includes(nameInput.value.toLowerCase());
    });
  }
  if (weightInput.value) {
    filterArr = filterArr.filter((animal) => {
      return animal.weight > weightInput.value;
    });
  }

  if (heightInput.value) {
    filterArr = filterArr.filter((animal) => {
      return animal.height > heightInput.value;
    });
  }

  if (colorInput.value) {
    filterArr = filterArr.filter((animal) => {
      return animal.color
        .toLowerCase()
        .includes(colorInput.value.toLowerCase());
    });
  }

  if (landHabitatInput.checked || seaHabitatInput.checked) {
    filterArr = filterArr.filter((animal) => {
      return landHabitatInput.checked
        ? animal.habitat === landHabitatInput.value
        : animal.habitat === seaHabitatInput.value;
    });
  }

  if (isPredatorInput.checked || notPredatorInput.checked) {
    filterArr = filterArr.filter((animal) => {
      return isPredatorInput.checked
        ? animal.isPredator.toString() == isPredatorInput.value
        : animal.isPredator.toString() == notPredatorInput.value;
    });
  }

  addToCurrentFilter();

  let setFilterArrString = JSON.stringify(filterArr);
  localStorage.setItem("AllFiltered", setFilterArrString);

  animalsForView = [...filterArr];
  renderAvailableAnimals();
}

function clearFilters() {
  nameInput.value = "";
  isPredatorInput.checked = false;
  notPredatorInput.checked = false;
  landHabitatInput.checked = false;
  seaHabitatInput.checked = false;
  weightInput.value = "";
  heightInput.value = "";
  colorInput.value = "";
  animalsForView = JSON.parse(localStorage.getItem("animals"));
  localStorage.removeItem("AllFiltered");
  localStorage.removeItem("filters");
  renderAvailableAnimals();
}

//-- filter end--//

window.addEventListener("load", renderAvailableAnimals);
window.addEventListener("load", addVisitorToNavbar);
window.addEventListener("load", addVisitorsToDropdown);
