let animalsForView = JSON.parse(localStorage.getItem("animals"));
let visitorsForView = JSON.parse(localStorage.getItem("visitors"));
let currentVisitor = JSON.parse(localStorage.getItem("currentVisitor"));
let currentAnimal = JSON.parse(localStorage.getItem("currentAnimal"));

let currentVisitorNow = currentVisitor.visited;
let currentFeededNow = currentVisitor.feeded;

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

function creatHTML(animal) {
  const littleCard = document.createElement("div");
  littleCard.className = "dashboard-cards";
  littleCard.innerHTML = `
  <h4>${animal.name}</h4>
  <img src="${animal.image}" alt=""${animal.name}"/>`;

  return littleCard;
}

function showVisitedAnimals() {
  const divVisited = document.getElementById("visited-animals");
  divVisited.innerHTML = "";

  let arrayVisitedUnique = [];

  for (let i = 0; i < currentVisitorNow.length; i++) {
    const visitor = currentVisitorNow[i];

    if (!arrayVisitedUnique.includes(visitor.name)) {
      divVisited.append(creatHTML(visitor));
      arrayVisitedUnique.push(visitor.name);
    }
  }
}

function showFeededAnimals() {
  const divFeeded = document.getElementById("feeded-animals");
  divFeeded.innerHTML = "";

  let arrayFeededUnique = [];

  for (let i = 0; i < currentFeededNow.length; i++) {
    const animal = currentFeededNow[i];

    if (!arrayFeededUnique.includes(animal.name)) {
      divFeeded.append(creatHTML(animal));
      arrayFeededUnique.push(animal.name);
    }
  }
}

function showFavoriteAnimal() {
  const divFavorite = document.getElementById("favorite-animal");
  divFavorite.innerHTML = "";

  let visitedAnimalArr = currentVisitorNow;
  let index;
  let count1 = 0;
  let count2 = 0;
  for (let i = 0; i < visitedAnimalArr.length; i++) {
    for (let j = 0; j < visitedAnimalArr.length; j++) {
      if (visitedAnimalArr[i] === visitedAnimalArr[j]) {
        count1++;
      }
    }
    if (count1 > count2) {
      index = i;
      count2 = count1;
      count1 = 0;
    }
  }

  divFavorite.append(creatHTML(visitedAnimalArr[index]));
  return visitedAnimalArr[index];
}

window.addEventListener("load", showVisitedAnimals);
window.addEventListener("load", showFeededAnimals);
window.addEventListener("load", showFavoriteAnimal);
window.addEventListener("load", addVisitorToNavbar);
window.addEventListener("load", addVisitorsToDropdown);
