let animalsForView = JSON.parse(localStorage.getItem("animals"));
let visitorsForView = JSON.parse(localStorage.getItem("visitors"));
let currentVisitor = JSON.parse(localStorage.getItem("currentVisitor"));
let currentAnimal = JSON.parse(localStorage.getItem("currentAnimal"));

function getAnimalHTML(animal) {
  const wrapper = document.createElement("div");
  wrapper.className = "wrapper-animal";
  wrapper.innerHTML = `<div id="image">
        <img src=${animal.image} alt=${animal.name}/><!-- show here the animal image -->
      </div>
      <div>
        <h1 id="name">${animal.name}</h1>
        <p id="weight">Weight: ${animal.weight}</p>
        <p id="height">Height: ${animal.height}</p>
        <p id="color">Color: ${animal.color}</p>
        <p id="habitat">Habitat: ${animal.habitat}</p>
        <p id="isPredator">Is Predator: ${animal.isPredator}</p>
      </div>`;

  const button = document.getElementById("feed-animal");
  button.addEventListener("click", () => feedAnimal(animal));
  return wrapper;
}

function renderAnimal() {
  //הציגו את החיה שאליה עברתם מעמוד גן החיות ששמורה בלוקל סטורג'
  // רנדרו את פרטי החיה לתוך האלמנטים המתאימים בהתאם לשדה הספציפי
  const animalHTML = getAnimalHTML(currentAnimal);
  const animalPlaceHolder = document.getElementById("placeholder");
  animalPlaceHolder.innerHTML = "";
  animalPlaceHolder.append(animalHTML);
}

const getAnimalHTMLCard = (animal) => {
  console.log("inHTMLtemplate");
  const wrapper = document.createElement("div");
  wrapper.className = "visitor-card";
  wrapper.innerHTML = `
  <div class="card" style="min-height: 360px; border: 5px solid rgb(0, 128, 0); 
  border-style: autset; border-radius: 25px;">
  <img src="${animal.image}" alt="${animal.name}"/>
  <h2>${animal.name}</h2>
  <p>Is predator: ${animal.isPredator}</p>
  <p>Weight: ${animal.weight}</p>
  <p>Height: ${animal.height}</p>
  <p style="color:${animal.color};">Color: ${animal.color}</p>
  <p>Habitat: ${animal.habitat}</p>
  </div>
  `;
  wrapper.addEventListener("click", () => visitAnimal(animal));
  return wrapper;
};

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

function renderRelatedAnimals() {
  // ממשו את הלוגיקה שמרנדרת כרטיסיות של החיות ששדה ההאביטט שלהם זהה לחיה שמוצגת
  // רנדרו אותן לתוך הדיב שמיועד להן עם האיידי related-animals
  // ממשו את אותה לוגיקה של כרטיסיית חיה כמו בכרטיסיות בעמוד zoo.html
  console.log("in render related");
  const allAnimals = JSON.parse(localStorage.getItem("animals"));
  const theHabitat = currentAnimal.habitat;
  const sameHabitatAnimals = allAnimals.filter((animal) => {
    return animal.habitat === theHabitat && animal.name !== currentAnimal.name;
  });
  const animalsToShow = sameHabitatAnimals.map(getAnimalHTMLCard);
  console.log(animalsToShow);
  const whereToRender = document.getElementById("related-animals");
  whereToRender.innerHTML = "";
  whereToRender.append(...animalsToShow);
}

function feedAnimal(animal) {
  // ממשו את הלוגיקה של האכלת חיה
  // במידה ואין מספיק מטבעות, טפלו בהתאם להנחיות במטלה
  if (currentVisitor.coins >= 2) {
    // pop up
    window.alert(
      `Thank you for feeding the ${currentAnimal.name}! Give me the money!`
    );
    //fix currentVisitor coins
    currentVisitor.coins = currentVisitor.coins - 2;
    currentVisitor.feeded.push(animal);
    //fix currentVisitor coins using currentVisitor
    stringifiedVisitor = JSON.stringify(currentVisitor);
    stringifiedVisitor = localStorage.setItem(
      "currentVisitor",
      stringifiedVisitor
    );
    visitorsForView = JSON.parse(localStorage.getItem("visitors")); //מעדכנות את המערך לפי מה שיש בלוקל סטורג
    //fix visitors coins array
    for (let i = 0; i < visitorsForView.length; i++) {
      if (currentVisitor.name === visitorsForView[i].name) {
        visitorsForView[i].coins = currentVisitor.coins;
        visitorsForView[i].feeded = currentVisitor.feeded;
      }
    }
    //fix visitors coins in local sotarge
    localStorage.setItem("visitors", JSON.stringify(visitorsForView));
  } else {
    if (currentAnimal.isPredator === true) {
      //console.log("we are about to be eaten");
      visitorGotEaten();
    } else {
      //console.log("ran ran ran");
      animalEscaped();
    }
  }
}

function visitorGotEaten() {
  // ממשו את הלוגיקה של חיה שטורפת אורח
  visitorsForView = JSON.parse(localStorage.getItem("visitors"));
  window.alert(`Oh no! You got eaten by a ${currentAnimal.name}!!! Bye bye...`);
  //delete visitor from array
  visitorsForView.forEach((visitor) => {
    if (visitor.name === currentVisitor.name) {
      console.log(visitor.name, currentVisitor.name);
      visitorsForView = visitorsForView.filter(
        (visitor) => visitor.name !== String(currentVisitor.name)
      );
    } else {
      console.log("Houston we have a problem eaten");
    }
  });
  //delete from local storage -> setItem from the array
  localStorage.setItem("visitors", JSON.stringify(visitorsForView));
  //remove current visitor and send back to login
  localStorage.removeItem("currentVisitor");
  window.location.href = "./login.html";
}

function animalEscaped() {
  //ממשו את הלוגיקה של חיה שבורחת מגן החיות
  window.alert(`Oh no! The ${currentAnimal.name} run away!!! Bye bye...`);
  let animalsForView = JSON.parse(localStorage.getItem("animals"));
  //delete animal from array
  animalsForView.forEach((animal) => {
    if (String(animal.name) === String(currentAnimal.name)) {
      animalsForView = animalsForView.filter(
        (animal) => animal.name !== String(currentAnimal.name)
      );
    } else {
      console.log("Houston we have a problem run");
    }
  });
  //delete the animal from the local storage
  localStorage.setItem("animals", JSON.stringify(animalsForView));
  //remove current animal
  localStorage.removeItem("currentAnimal");
  window.location.href = "./zoo.html";
}

window.addEventListener("load", renderAnimal);
window.addEventListener("load", renderRelatedAnimals);
