let animalsForView = JSON.parse(localStorage.getItem("animals"));
let visitorsForView = JSON.parse(localStorage.getItem("visitors"));
//console.log(visitorsForView);

function createHTML(visitor) {
  const newDiv = document.createElement("div");
  newDiv.className = "visitor-card";
  newDiv.innerHTML = `<img src="${visitor.image}" alt="${visitor.name} "/>
  <h2>name: ${visitor.name} </h2>
  <p>Coins: ${visitor.coins}</p>`;
  //console.log(newDiv);

  newDiv.addEventListener("click", () => {
    loginAsVisitor();
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
  visitorsForView = [...visitors];
  renderVisitors();
};

function renderVisitors() {
  const visitorsCards = document.getElementById("visitors-cards");
  visitorsCards.innerHTML = "";
  // const visitorsForViewArray = [...visitors];
  visitorsForView.forEach((visitor) => {
    visitorsCards.append(createHTML(visitor));
  });
  if (!visitorsForView.length) {
    visitorsCards.appendChild(getEmptyCardsHTMLTemplate());
  }
}

const nameInput = document.getElementById("searchName");
nameInput.addEventListener("input", () => {
  visitorsArray = [...visitors];
  visitorsForView = visitorsArray.filter((visitor) => {
    return visitor.name.toLowerCase().includes(nameInput.value.toLowerCase());
  });
  const visitorsCards = document.getElementById("visitors-cards");
  visitorsCards.innerHTML = "";
  renderVisitors();
});

function loginAsVisitor(visitorName) {
  // תממשו את הלוגיקה של בחירת אורח שנכנס לגן החיות
  // שמרו את האורח שבחרתם, בלוקל סטורג' כך שבכל העמודים נדע מי האורח הנוכחי
}

window.addEventListener("load", renderVisitors);
