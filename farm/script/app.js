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
document.addEventListener("DOMContentLoaded", function () {
  Array.from(document.querySelectorAll(".shed")).forEach((shed) => {
    let mainFarmLandCords = mainFarmLand.getBoundingClientRect();
    loadSavedData();
    adjustStalls(shed);
    window.scrollTo(
      mainFarmLandCords.x - mainFarmLandCords.width * 0.3,
      mainFarmLandCords.y
    );

  });
});
window.addEventListener("beforeunload", () =>{
  save()
});
function loadSavedData() {
  let savedData =
  JSON.parse(this.localStorage.getItem("savedData")) || Animal.getStartSet();
  
  savedData.allMobs.forEach((elem) => {
    Animal.createAnimalFromJSON(elem);
  });
  Animal.allMobs.forEach((mob) => {
    mob.addToFarmLand(mob.styleClass);
  });
  console.log(savedData);
}
function adjustStalls(shed) {
  let rightSide = Array.from(shed.querySelectorAll(".stall"));
  rightSide.forEach((elem) => {
    elem.setAttribute("data-animal-capable", true);
  });
  let leftSide = rightSide.splice(0, Math.ceil(rightSide.length / 2));
  rightSide.forEach((e) => {
    e.classList.add("rightSide");
    e.setAttribute("data-rotation", 3);
  });
  leftSide.forEach((e) => {
    e.classList.add("leftSide");
    e.setAttribute("data-rotation", 1);
  });
}

console.log(animalMenu.className)
function save() {
  let allFarmLands = Array.from(document.querySelectorAll(".farmLand"));
  console.log("saved");
  let savedData = {};
  savedData.allMobs = Animal.allMobs;
  savedData.farmLandsProperties = new Map();
  allFarmLands.forEach(e => {
    savedData.farmLandsProperties[e.getAttribute("id")] = e.attributes;
  });
  console.log(savedData);
  localStorage.setItem(
    "savedData",
    JSON.stringify(savedData, function replacer(key, string) {
      return ["html"].includes(key) ? undefined : string; // push cycle properties to the array
    })
    );
  }
  
animalMenu.addEventListener("click", () => {
  animalMenu.clickEvent = true;
});
animalMenu.changeStayingPlaceBtn.addEventListener("click", (ev) => {
  console.log(ev);
  animalMenu.targetObject.showAvailableStayingPlaces();
});
