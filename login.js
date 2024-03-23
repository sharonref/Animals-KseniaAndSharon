let animalsForView = JSON.parse(localStorage.getItem("animals"));
let visitorsForView = JSON.parse(localStorage.getItem("visitors"));

//make it a dialog
if (localStorage.getItem("currentVisitor")) {
  const dialog = document.getElementById("alertMassege");
  const btnLogout = document.getElementById("logout");
  const btnContinue = document.getElementById("continue");

  dialog.style.display = "block";
  dialog.showModal();

  btnLogout.addEventListener("click", () => {
    localStorage.removeItem("currentVisitor");
    window.location.href = "./signup.html";
    dialog.close();
  });

  btnContinue.addEventListener("click", () => {
    window.location.href = "./zoo.html";
    dialog.close();
  });
}

function createHTML(visitor) {
  const newDiv = document.createElement("div");
  newDiv.className = "visitor-card";
  newDiv.innerHTML = `<img src="${visitor.image}" alt="${visitor.name} "/>
  <h2>Name: ${visitor.name} </h2>
  <p>Coins: ${visitor.coins}</p>`;

  newDiv.addEventListener("click", () => {
    loginAsVisitor(visitor);
  });
  return newDiv;
}

const getEmptyCardsHTMLTemplate = () => {
  const templateWrapper = document.createElement("div");
  templateWrapper.className = "empty-result";

  const template = `
    <h2>No Visitors Found</h2>
    <p>We're sorry, but no vistor that matchs your search.</p>
    <button id="clear-filter-btn" class="btn btn-dark">Clear search text</button>
    `;
  templateWrapper.innerHTML = template;
  templateWrapper.children["clear-filter-btn"].addEventListener(
    "click",
    clearSearchBox
  );
  return templateWrapper;
};

const clearSearchBox = () => {
  const input = document.getElementById("searchName");
  input.value = "";
  visitorsForView = JSON.parse(localStorage.getItem("visitors"));
  renderVisitors();
};

function renderVisitors() {
  const visitorsCards = document.getElementById("visitors-cards");
  visitorsCards.innerHTML = "";
  visitorsForView.forEach((visitor) => {
    visitorsCards.append(createHTML(visitor));
  });
  if (!visitorsForView.length) {
    visitorsCards.appendChild(getEmptyCardsHTMLTemplate());
  }
}

const nameInput = document.getElementById("searchName");
nameInput.addEventListener("input", () => {
  let visitorsArray = JSON.parse(localStorage.getItem("visitors"));
  visitorsForView = visitorsArray.filter((visitor) => {
    return visitor.name.toLowerCase().includes(nameInput.value.toLowerCase());
  });
  const visitorsCards = document.getElementById("visitors-cards");
  visitorsCards.innerHTML = "";
  renderVisitors();
});

function loginAsVisitor(visitor) {
  localStorage.setItem("currentVisitor", JSON.stringify(visitor));
  window.location.href = "./zoo.html";
}

window.addEventListener("load", renderVisitors);
