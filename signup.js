let animalsForView = JSON.parse(localStorage.getItem("animals"));
let visitorsForView = JSON.parse(localStorage.getItem("visitors"));

function createNewVisitor(event) {
  event.preventDefault();
  const nameInput = document.getElementById("visitorNewName");
  const nameString = nameInput.value;

  function validateFormInputs(value) {
    if (!value) {
      alert("Please enter a name, dude!");
      return false;
    } else {
      return true;
    }
  }

  const visitorExists = (name) => {
    if (visitorsForView.some((visitor) => visitor.name === name)) {
      alert("You already have a user, dude!");
      return true;
    } else {
      return false;
    }
  };

  const makeVisitor = (name) => {
    let newVisitor = {
      name: name,
      coins: 50,
      image: "./images/new.jpeg",
      visited: [],
      feeded: [],
    };

    return newVisitor;
  };

  if (!validateFormInputs(nameString)) {
    console.log(validateFormInputs(nameString));
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
