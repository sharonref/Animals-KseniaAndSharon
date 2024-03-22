let animalsForView = JSON.parse(localStorage.getItem("animals"));
let visitorsForView = JSON.parse(localStorage.getItem("visitors"));

function createNewVisitor(event) {
  // ביטול התנהגות דיפולטיבית של שליחת טופס
  // קראו עוד כאן: https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
  event.preventDefault();
  const nameInput = document.getElementById("visitorNewName");
  const nameString = nameInput.value;
  console.log(nameString);
  /**
  צרו אורח חדש כאן 👇
  ניתן לפצל את הלוגיקה למספר בלתי מוגבל של פונקציות.
  כמו שיותר מפוצל וטהור - פונקציות עם מטרה יחידה ושם משמעותי שמסביר מה הפונקציה עושה ומחזירה
  דוגמא:
  **/

  function validateFormInputs(value) {
    if (!value) {
      alert("Please enter a name, dude!");
      return false;
    } else {
      return true;
    }
  }

  const visitorExists = (name) => {
    //מקבל שם ומחזיר תשובה האם השם האורח קיים
    visitorsForView.forEach((element) => {
      if (element.name === name) {
        alert("You already exist, dude!");
        return true;
      } else {
        return false;
      }
    });
  };

  const makeVisitor = (name) => {
    //מקבל שם, בודק שאין אותו כבר במערך האורחים ומחזיר אובייקט אורח
    let newVisitor = {
      name: name,
      coins: 50,
      image: "./images/Avatars1.jpeg",
      visited: [],
      feeded: [],
    };

    return newVisitor;
  };

  if (!validateFormInputs(nameString)) {
    return;
  }
  if (visitorExists(nameString)) {
    return;
  }
  console.log(nameInput.value);
  let some = makeVisitor(nameString);
  console.log(some);
  visitorsForView.push(makeVisitor(nameString));
  let stringVisitores = JSON.stringify(visitorsForView);
  localStorage.setItem("visitors", stringVisitores);
  window.location.href = "./login.html";
}

/**************************************
  מימשתי עבורכם את ההאזנה לאירוע שליחת טופס
  שימו לב כי האיידי של createForm
  זהה לאיידי של הטופס בעמוד signup.html
  אין לשנות אותו */
const createForm = document.getElementById("create-visitor-form");
if (createForm) {
  createForm.addEventListener("submit", createNewVisitor);
}
