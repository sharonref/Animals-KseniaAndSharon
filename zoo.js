let animalsForView = JSON.parse(localStorage.getItem("animals"));
let visitorsForView = JSON.parse(localStorage.getItem("visitors"));
let currentVisitor = JSON.parse(localStorage.getItem("currentVisitor"));

function createHTML(animal) {
  const newDiv = document.createElement("div");
  newDiv.className = "animal-card";
  newDiv.innerHTML = `<img src="${animal.image}" alt="${animal.name} "/>
  <h2>name: ${animal.name} </h2>
  <p>is predator: ${animal.isPredator}</p>
  <p>weight: ${animal.weight}</p>
  <p>height: ${animal.height}</p>
  <p>color: ${animal.color}</p>
  <p>habitat: ${animal.habitat}</p>`;

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
  // ממשו את הלוגיקה של מעבר לעמוד חיה עבור החיה הספציפית שנבחרה
  // שמרו בלוקל סטורג' את החיה שנבחרה, כך שבעמוד החיה נוכל לשלוף אותה מהסטורג' ולהציגה בהתאם
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

const nameInput = document.getElementById("searchName");
const isPredatorInput = document.getElementById("predator");
const notPredatorInput = document.getElementById("notPredator");
const landHabitatInput = document.getElementById("land");
const seaHabitatInput = document.getElementById("sea");
const weightInput = document.getElementById("weight-search");
const heightInput = document.getElementById("height-search");
const colorInput = document.getElementById("color-search");
const clearBTN = document.getElementById("clearBTN");
console.log(colorInput);

function setFilter(filterKey, filterValue) {
  /**
   * ממשו את הלוגיקה של השמת פילטר
   * הפילטרים הקיימים הם
   * isPredator: true | false
   * habitat: "land" | "sea"
   * weight: value > user selected weight
   * height: value > user selected height
   * color: dropdown of all available colors
   */
  // ודאו כי אתם שומרים את הפילטרים שהיוזר בחר בלוקל סטורג׳ וטוענים אותם בהתאם
  // רנדרו רק את החיות שעומדות בתנאים של הפילטרים
}

window.addEventListener("load", renderAvailableAnimals);
