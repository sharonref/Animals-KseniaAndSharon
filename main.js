// מערכים גלובלים שישמשו אותנו בכל העמודים
let visitors = [
  {
    name: "John Smith",
    coins: 50,
    image: "./images/Avatars1.jpeg",
    visited: [],
    feeded: [],
  },
  {
    name: "Emily Johnson",
    coins: 50,
    image: "./images/Avatars2.jpeg",
    visited: [],
    feeded: [],
  },
  {
    name: "Michael Williams",
    coins: 50,
    image: "./images/Avatars3.jpeg",
    visited: [],
    feeded: [],
  },
  {
    name: "Jessica Brown",
    coins: 50,
    image: "./images/Avatars4.jpeg",
    visited: [],
    feeded: [],
  },
  {
    name: "Christopher Jones",
    coins: 50,
    image: "./images/Avatars5.jpeg",
    visited: [],
    feeded: [],
  },
  {
    name: "Ashley Davis",
    coins: 50,
    image: "./images/Avatars6.jpeg",
    visited: [],
    feeded: [],
  },
  {
    name: "Matthew Miller",
    coins: 50,
    image: "./images/Avatars7.jpeg",
    visited: [],
    feeded: [],
  },
  {
    name: "Amanda Wilson",
    coins: 50,
    image: "./images/Avatars8.jpeg",
    visited: [],
    feeded: [],
  },
  {
    name: "David Moore",
    coins: 50,
    image: "./images/Avatars9.jpeg",
    visited: [],
    feeded: [],
  },
  {
    name: "Sarah Taylor",
    coins: 50,
    image: "./images/Avatars10.jpeg",
    visited: [],
    feeded: [],
  },
  {
    name: "James Anderson",
    coins: 50,
    image: "./images/Avatars1.jpeg",
    visited: [],
    feeded: [],
  },
  {
    name: "Jennifer Thomas",
    coins: 50,
    image: "./images/Avatars2.jpeg",
    visited: [],
    feeded: [],
  },
  {
    name: "Robert Jackson",
    coins: 50,
    image: "./images/Avatars3.jpeg",
    visited: [],
    feeded: [],
  },
  {
    name: "Elizabeth White",
    coins: 50,
    image: "./images/Avatars4.jpeg",
    visited: [],
    feeded: [],
  },
  {
    name: "Daniel Harris",
    coins: 50,
    image: "./images/Avatars5.jpeg",
    visited: [],
    feeded: [],
  },
  {
    name: "Melissa Martin",
    coins: 50,
    image: "./images/Avatars6.jpeg",
    visited: [],
    feeded: [],
  },
  {
    name: "William Thompson",
    coins: 50,
    image: "./images/Avatars7.jpeg",
    visited: [],
    feeded: [],
  },
  {
    name: "Linda Garcia",
    coins: 50,
    image: "./images/Avatars8.jpeg",
    visited: [],
    feeded: [],
  },
  {
    name: "Joseph Martinez",
    coins: 50,
    image: "./images/Avatars9.jpeg",
    visited: [],
    feeded: [],
  },
  {
    name: "Karen Robinson",
    coins: 50,
    image: "./images/Avatars10.jpeg",
    visited: [],
    feeded: [],
  },
];

let animals = [
  {
    name: "Lion",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image: "./images/lion.jpeg",
  },
  {
    name: "Elephant",
    isPredator: false,
    weight: 1200,
    height: 200,
    color: "grey",
    habitat: "land",
    image: "./images/Elephant.jpeg",
  },
  {
    name: "Giraffe",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image: "./images/Giraffe.jpeg",
  },
  {
    name: "Tiger",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image: "./images/tiger.jpeg",
  },
  {
    name: "Monkey",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image: "./images/monkey.jpeg",
  },
  {
    name: "Kangaroo",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image: "./images/kangeroo.jpeg",
  },
  {
    name: "Penguin",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "sea",
    image: "./images/penguin.jpeg",
  },
  {
    name: "Zebra",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image: "./images/zebra.jpeg",
  },
  {
    name: "Cheetah",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image: "./images/cheetah.jpeg",
  },
];

// פונקציה זו טוענת עבורכם את המידע ההתחלתי של האפליקציה, במידה וקיים מידע בלוקל סטורג׳, היא תקח אותו משם
// אל תשנו את הקוד בפונקציה הזו כדי לשמור על תקינות הטמפלייט
function generateDataset() {
  if (localStorage.getItem("visitors")) {
    visitors = JSON.parse(localStorage.getItem("visitors"));
  } else {
    localStorage.setItem("visitors", JSON.stringify(visitors));
  }
  if (localStorage.getItem("animals")) {
    animals = JSON.parse(localStorage.getItem("animals"));
  } else {
    localStorage.setItem("animals", JSON.stringify(animals));
  }

  console.log(visitors);
}
generateDataset();

//********************** */
function logout() {
  //ממשו את הלוגיקה שמתנתקת מאורח מחובר
  // שימו לב לנקות את השדה המתאים בלוקל סטורג'
}
