function rInt(min, max) {
  return Math.floor(min + (max - min + 1) * Math.random());
}
function rArrElem(arr) {
  return arr[rInt(0, arr.length - 1)];
}
function roundFloat(num, dec = 2) {
  return Math.round(num * 10 ** dec) / 10 ** dec;
}
// let animalSpawnInterval = setInterval(() => {
// }, 10000);
// let pipe1 = new Pipe(
//   document.querySelector('.waterReservoir[id="1"]'),
//   document.querySelector('.lake[id="1"]')
// );
window.addEventListener("load", function () {
  Array.from(document.querySelectorAll(".shed")).forEach((shed) => {
    distributeStalls(shed);
    loadSavedData();
  });
});
function loadSavedData() {
  let savedData = JSON.parse(this.localStorage.getItem("savedData")) || Animal.getStartSet();

  savedData.allMobs.forEach((elem) => {
    Animal.createAnimalFromJSON(elem);
  });
  Animal.allMobs.forEach((mob) => {
    mob.addToFarmLand(mob.styleClass);
  });
}
function distributeStalls(shed) {
  let rightSide = Array.from(shed.querySelectorAll(".stall"));
  let leftSide = rightSide.splice(0, Math.ceil(rightSide.length / 2));
  rightSide.forEach((e) => {
    e.classList.add("rightSide");
  });
  leftSide.forEach((e) => {
    e.classList.add("leftSide");
  });
}

function save() {
  console.log("saved");
  let savedData = {};
  savedData.allMobs = Animal.allMobs;
  // savedData.savedLands = Array.from(
  //   document.querySelector("body > .container").children
  // );
  // savedData.landsSpecProperties = new Map();
  // savedData.savedLands.forEach((elem) => {
  //   savedData.landsSpecProperties.set(elem, {
  //     grassStatus: elem.grassStatus,
  //   });
  // });
  localStorage.setItem(
    "savedData",
    JSON.stringify(savedData, function replacer(key, string) {
      return ["html"].includes(key) ? undefined : string; // push cycle properties to the array
    })
  );
}
