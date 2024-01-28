"use strict";
const mainFarmLand = document.querySelector(".farmLand#farmLand1");
const animalMenu = document.querySelector(".animalMenu");
animalMenu.healthBar = document.querySelector(".animalMenu .healthBar");
animalMenu.satietyBar = document.querySelector(".animalMenu .satietyBar");
animalMenu.changeStayingPlaceBtn = document.querySelector(
  ".animalMenu button#changePlace"
);
/**
 * @class
 * @method addToFarmLand creates HTML element of the animal and inserts it to the farmland
 *
 * */
class Animal {
  static allMobs = [];
  constructor(name, age, children = [], addToTotalList = true) {
    this._name = name;
    this._age = age;
    this.children = children;
    this.satiety = 15;
    this.health = 100;
    this.uniqueSymbol = Symbol();
    this.movingState = false;
    // this.othersCanAccess = true;
    if (addToTotalList) {
      Animal.allMobs.push(this);
      if (children.length > 0) Animal.allMobs.push(...children);
    }
  }
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }
  get age() {
    return this._age;
  }
  set age(value) {
    this._age = value;
  }
  static getStartSet() {
    let result = {};
    result.allMobs = [];
    Animal.generateMobs(5, ["Cow"], "SP", 0, (animal) => {
      result.allMobs.push(animal);
    });
    mainFarmLand.setAttribute("food-availability", 100);
    return result;
  }
  static generateMobs(
    quantity,
    types = ["Cow"],
    name = "SP",
    age = 0,
    callbackfn
  ) {
    for (let i = 0; i < quantity; i++) {
      let spawningAnimal = null;
      switch (rArrElem(types)) {
        case "Cow":
          spawningAnimal = new Cow(name, age, [], false);
          break;
        case "Cat":
          spawningAnimal = new Cat(name, age, [], false);
          break;
      }
      callbackfn?.(spawningAnimal);
    }
  }
  static createAnimalFromJSON(JSONData) {
    // creates animals from JSON or JSON-parsed objects
    if (typeof JSONData === "string") JSONData = JSON.parse(JSONData);

    let res = new Animal();
    for (const key in JSONData) {
      if (Object.hasOwnProperty.call(JSONData, key)) {
        res[key] = JSONData[key];
      }
    }
    return res;
  }
  createHTMLAnimalElem(styleClass = this.styleClass) {
    let res = document.createElement("div");
    let animalBodyContainer = document.createElement("div");
    let head = document.createElement("div");
    let body = document.createElement("div");
    let leg1 = document.createElement("div");
    let leg2 = document.createElement("div");
    let leg3 = document.createElement("div");
    let leg4 = document.createElement("div");
    let initObj = this;

    res.classList.add("animal", styleClass);
    animalBodyContainer.classList.add("animalBodyContainer");
    head.classList.add("animalLimb", styleClass, "animalHead");
    body.classList.add("animalLimb", styleClass, "animalBody");
    leg1.classList.add("animalLimb", styleClass, "animalLeg1");
    leg2.classList.add("animalLimb", styleClass, "animalLeg2");
    leg3.classList.add("animalLimb", styleClass, "animalLeg3");
    leg4.classList.add("animalLimb", styleClass, "animalLeg4");

    this.bodyContainer = animalBodyContainer;
    this.head = head;
    this.body = body;
    this.leg1 = leg1;
    this.leg2 = leg2;
    this.leg3 = leg3;
    this.leg4 = leg4;

    //randomising spawning coordinates
    res.style.left = rInt(0, this.stayingPlace.clientWidth - 50) + "px";
    res.style.top = rInt(0, this.stayingPlace.clientHeight - 50) + "px";

    res.setAttribute("data-health", this.health);
    res.title = this.health;

    // res.addEventListener("pointerdown", function (e) {
    //   this.animalPointerDownEvent(e);
    // });
    // res.addEventListener("pointerup", function (e) {
    //   this.animalPointerUpEvent(e);
    // });

    res.initObj = initObj;
    this.html = res;
    return res;
  }
  addToFarmLand(styleClass = this.styleClass, stayingPlace) {
    this.stayingPlace = stayingPlace ?? mainFarmLand;
    this.stayingPlace.appendChild(this.createHTMLAnimalElem(styleClass));
    this.html.appendChild(this.bodyContainer);
    this.bodyContainer.appendChild(this.body);
    this.bodyContainer.appendChild(this.head);
    this.bodyContainer.appendChild(this.leg1);
    this.bodyContainer.appendChild(this.leg2);
    this.bodyContainer.appendChild(this.leg3);
    this.bodyContainer.appendChild(this.leg4);
    console.log(1);
    this.html.addEventListener("pointerdown", function (e) {
      this.initObj.animalPointerDownEvent(e);
    });
    this.html.addEventListener("pointerup", function (e) {
      this.initObj.animalPointerUpEvent(e);
    });

    this.startAging();
    this.randomMove(7000);
    this.starving();
    // this.breed()
  }
  randomMove(interval = 10000) {
    clearInterval(this.moveInterval);
    this.moveInterval = setInterval(() => {
      let [minX, maxX, minY, maxY] = [-50, 50, -50, 50];

      if (this.html.offsetLeft < 50) minX = -this.html.offsetLeft + 10;
      if (this.html.offsetLeft > this.stayingPlace.clientWidth - 70) {
        maxX = this.stayingPlace.clientWidth - this.html.offsetLeft - 50;
      }
      if (this.html.offsetTop < 100) minY = -this.html.offsetTop + 10;
      if (this.html.offsetTop > this.stayingPlace.clientHeight - 110) {
        maxY = this.stayingPlace.clientHeight - this.html.offsetTop - 50;
      }

      let dX = rInt(minX, maxX);
      let dY = rInt(minY, maxY);

      this.moveBy(dX, dY);

      setTimeout(() => {
        this.eat();
      }, 1300);
    }, interval);
    // this.animateWalking();
  }
  moveBy(dX, dY) {
    let angle = (-Math.atan2(-dY, dX) * 180) / Math.PI + 90;

    anime({
      targets: this.html,
      keyframes: [
        { rotate: angle, duration: 500 },
        {
          left: this.html.offsetLeft + dX,
          top: this.html.offsetTop + dY,
          duration: 1500,
          delay: 520,
        },
      ],
      easing: "linear",
    });
    this.animateWalking(1010, 2);
  }
  animateWalking(_duration = 750, _loops = 2) {
    let legs = [this.leg1, this.leg2, this.leg3, this.leg4];

    let tl = anime.timeline({
      easing: "linear",
      duration: _duration,
      loop: _loops,
    });

    tl.add({
      targets: [legs[0], legs[3]],
      keyframes: [
        { rotateX: [90, 120] },
        { rotateX: [120, 60], delay: 100 },
        { rotateX: [60, 90], delay: 200 },
      ],
    });

    tl.add(
      {
        targets: [legs[1], legs[2]],
        keyframes: [
          { rotateX: [90, 60] },
          { rotateX: [60, 120], delay: 100 },
          { rotateX: [120, 90], delay: 200 },
        ],
      },
      0
    );
  }
  moveTo(dX, dY) {
    let angle = (-Math.atan2(-dY, dX) * 180) / Math.PI + 90;
    anime({
      targets: this.html,
      keyframes: [
        { rotate: angle, duration: 500 },
        {
          left: dX,
          top: dY,
          duration: 700,
          delay: 520,
        },
      ],
      easing: "linear",
    });
  }
  eat() {
    if (this.stayingPlace.getAttribute("food-availability") > 0) {
      this.satiety = roundFloat(this.satiety + 0.3, 2);
      this.stayingPlace.setAttribute(
        "food-availability",
        roundFloat(
          this.stayingPlace.getAttribute("food-availability") - 0.05,
          3
        )
      );
      this.stayingPlace.style.backgroundColor = `rgb(${
        81 + (100 - this.stayingPlace.getAttribute("food-availability"))
      }, 218, 51)`;
    } else {
      console.warn(
        "Need water!",
        this.stayingPlace.getAttribute("food-availability")
      );
    }
  }
  starving() {
    this.starvingInterval = setInterval(() => {
      this.satiety = roundFloat(this.satiety - 0.4, 1);
      if (this.satiety < 3) {
        this.health -= 1;
      }
      if (this.satiety < 1) this.health -= 2;
      this.html.title = this.health;
      if (this.health <= 0) {
        this.removeMob();
      }
    }, 16000);
  }
  removeMob() {
    this.html.remove();
    Animal.allMobs.splice(Animal.allMobs.indexOf(this), 1);
    clearInterval(this.moveInterval);
    clearInterval(this.agingInterval);
    clearInterval(this.starvingInterval);
  }
  startAging() {
    let [initialWidth, initialHeight] = [
      +this.html.clientWidth,
      +this.html.clientHeight,
    ];
    this.agingInterval = setInterval(() => {
      this.age = this.age + 1;
      this.html.style.width =
        initialWidth + 0.01 * initialWidth * this.age + "px";
      this.html.style.height =
        initialHeight + 0.01 * initialHeight * this.age + "px";
    }, 60000);
  }
  // breeding
  breed() {
    this.breedingInterval = setInterval(() => {
      if (!this.findAnyClosestAnimal()) return;
      let secondMob = this.findAnyClosestAnimal().initObj;
      this.othersCanAccess = false;
      secondMob.othersCanAccess = false;
      clearInterval(secondMob.breedingInterval);
      this.convergence(secondMob);
      anime({
        targets: [this.html, secondMob.html],
        rotate: 360,
        duration: 300,
      });
      setTimeout(() => {
        this.othersCanAccess = true;
        secondMob.othersCanAccess = true;
        secondMob.breed();
      }, 4000);
    }, 7000);
  }
  findAnyClosestAnimal(r = 50, step = 20) {
    let res = [];
    let cord = this.html.getBoundingClientRect();
    for (let i = cord.top - r; i < cord.bottom + r; i += step) {
      for (let j = cord.left - r; j < cord.right + r; j += step) {
        let found = document.elementFromPoint(j, i);
        if (
          found?.initObj?.uniqueSymbol === this.uniqueSymbol ||
          !found?.initObj?.othersCanAccess
        ) {
          continue;
        }
        if (found?.classList.contains("animal") && res.indexOf(found) === -1)
          res.push(found);
      }
    }
    return res[rInt(0, res.length - 1)];
  }
  static findAnyClosestAnimalByCoords(r = 50, step = 20, x, y) {
    let res = [];
    let cord = [x, y];
    for (let i = y - r; i < y + r; i += step) {
      for (let j = x - r; j < x + r; j += step) {
        let found = document.elementFromPoint(j, i);
        if (found?.classList.contains("animal") && res.indexOf(found) === -1)
          res.push(found);
      }
    }
    return res[rInt(0, res.length - 1)];
  }
  convergence(secondMob) {
    clearInterval(this.moveInterval);
    clearInterval(secondMob.moveInterval);
    let cords = [
      this.html.getBoundingClientRect(),
      secondMob.html.getBoundingClientRect(),
    ];
    // let averageCords = [(cords[1].left - cords[0].left),(cords[1].top - cords[0].top) ];
    let averageCords = [
      (cords[0].left + cords[1].left) / 2,
      (cords[0].top + cords[1].top) / 2,
    ];
    this.moveTo(averageCords[0], averageCords[1]);
    secondMob.moveTo(averageCords[0], averageCords[1]);
    setTimeout(() => {
      this.randomMove(7000);
      secondMob.randomMove(7000);
    }, 4000);
  }
  static animalFollowTouch(e) {
    clearInterval(this.moveInterval);
    let animal = this.findAnyClosestAnimalByCoords(300, 20, e.x, e.y).initObj;
    animal.moveTo(e.x, e.y);
    setTimeout(() => {
      animal.randomMove(7000);
    }, 3000);
  }
  animalPointerDownEvent(event) {
    clearInterval(this.moveInterval);
    this.showMenu();
  }

  animalPointerUpEvent(event) {}
  animalPointerMoveEvent(event, animal) {
    console.log(3);
    animal.style.left = event.offsetX + "px";
    animal.style.top = event.offsetY + "px";
  }
  showMenu() {
    if (animalMenu.isActive) {
      Animal.hideMenu();
      return;
    }
    let currentObj = this;
    animalMenu.isActive = true;
    setTimeout(() => {
      window.addEventListener("click", Animal.hideMenu);
    }, 300);
    animalMenu.targetObject = this;

    animalMenu.style.display = "flex";
    animalMenu.style.left = event.pageX + "px";
    animalMenu.style.top = event.pageY + "px";
    animalMenu.healthBar.style.width = this.health + "%";
    animalMenu.satietyBar.style.width = (100 * this.satiety) / 15 + "%"; // change init satiety(15) here if necessary
  }
  static hideMenu() {
    if (!animalMenu.clickEvent) {
      animalMenu.isActive = false;
      window.removeEventListener("click", Animal.hideMenu);
      animalMenu.style.display = "none";
    }
    animalMenu.clickEvent = false;
  }

  showAvailableStayingPlaces() {
    let availablePlaces = Array.from(
      document.querySelectorAll('div[data-animal-capable="true"]')
    );
    availablePlaces.forEach((place) => {
      console.log(place);
      place.style.filter = "hue-rotate(15deg)";
      place.showingshowingAnimation = anime({
        targets: place,
        scale: 1.04,
        direction: "alternate",
        duration: 1500,
        easing: "easeInOutSine",
        loop: true,
      });
      place.addEventListener("click", this.changeStayingPlace);
    });
  }
  changeStayingPlace() {
    let movingToPlace = event.target;
    console.log(movingToPlace);
    animalMenu.targetObject.html.remove();
    movingToPlace.appendChild(animalMenu.targetObject.html);
    animalMenu.targetObject.html.style.left = 0;
    animalMenu.targetObject.html.style.top = 0;
    animalMenu.targetObject.html.style.transform = `rotate(${
      movingToPlace.getAttribute("data-rotation") * 90
    }deg)`;
    if (+movingToPlace.getAttribute("data-animal-can-move") === 1) {
      animalMenu.targetObject.randomMove(7000);
      console.log(animalMenu.targetObject);
    }
    Array.from(
      document.querySelectorAll('div[data-animal-capable="true"]')
    ).forEach((e) => {
      e.removeEventListener(
        "click",
        animalMenu.targetObject.changeStayingPlace
      );
      anime.remove(e);
      e.style.transform = "";
      e.style.filter = "none";
    });
  }
}
// document.addEventListener("click", e=>{Animal.animalFollowTouch(e)})
