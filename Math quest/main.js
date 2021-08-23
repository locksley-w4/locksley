const buttons = document.querySelectorAll("button#btn");

const questLabel = document.querySelector("span#quest");

const count = document.querySelector("span#count")

const box = document.querySelector(".box")

let quest = makeQuestion(0, 100);

let rightAnswers = 0;

// document.querySelectorAll("*").forEach(el => el.style.opacity = 0.5)

function makeQuestion(min, max) {
    let firstNum = rand(min, max)
    let secondNum = rand(min, max)
    let action = randAction();
    let solution = findSolution(firstNum, secondNum, action);

    let output = {
        _n1: firstNum,
        _n2: secondNum,
        _action: action,
        getSolution() {
            if (solution.toString().includes(".")) {
                if (solution.toString().split(".")[1].length > 3) return solution.toFixed(3);
                else return solution
            } else return solution;
        },
        quest: `${firstNum}${action}${secondNum}`,
        fullSolution: `${firstNum}${action}${secondNum}=${solution}`,
        rightBtn: rand(0, 3),
    }

    output._solution = output.getSolution();
    return output;
}

function randAction() {
    let action = rand(1, 4);

    switch (action) {
        case 1:
            action = "+"
            break;
        case 2:
            action = "-"
            break;
        case 3:
            action = "*"
            break;
        case 4:
            action = "/"
            break;
    }
    return action;
}

/**
 * 
 * @param {Number} num1 
 * @param {Number} num2 
 * @param {String} action 
 * @returns 
 */
function findSolution(num1, num2, action) {
    let solution = 0;

    switch (action) {
        case "+":
            solution = num1 + num2;
            break;
        case "-":
            solution = num1 - num2;
            break;
        case "*":
            solution = num1 * num2;
            break;
        case "/":
            solution = num1 / num2;
            break;
    }
    return solution;
}

document.onreadystatechange = function (ev) {
    if (this.readyState === "complete") {
        questLabel.innerHTML = quest.quest

    }
}

function newQuest() {

    for (btn of buttons) {
        btn.innerHTML = rand(0, 500)
    }

    buttons[quest.rightBtn].innerHTML = quest._solution

    for (btn of buttons) {
        btn.setAttribute("title", btn.innerHTML)
    }
}
newQuest()

buttons.forEach((elem, index) => {
    elem.addEventListener("click", () => {
        if (index === quest.rightBtn) {
            count.innerHTML = ++rightAnswers;
            quest = makeQuestion(0, 100);
            questLabel.innerHTML = quest.quest
            right();
            newQuest();
        } else {
            count.innerHTML = --rightAnswers;
            quest = makeQuestion(0, 100);
            questLabel.innerHTML = quest.quest
            wrong();
            newQuest();
        }

        // if (rightAnswers < 0) {
        //     let endgamescreen = document.querySelector(".endgame-screen")
        //     endgamescreen.classList.add("active")
        // }
    });
})

function right() {
    document.body.classList.add("rightAnswerScreen")
    setTimeout(() => {
        document.body.classList.remove("rightAnswerScreen")
    }, 350);
}

function wrong() {
    window.navigator.vibrate(500)
    document.body.classList.add("wrongAnswerScreen")
    setTimeout(() => {
        document.body.classList.remove("wrongAnswerScreen")
    }, 350);
}


const menu = document.querySelector(".menu");
const menuShowButton = document.querySelector("button.menuShowBtn");

menuShowButton.addEventListener("click", () => {
    menuShow();
    menuShowButton.classList.toggle("active")
});

let menuISVisible = false;


function menuShow() {
    if (menuISVisible) {
        menu.style.transform = "scale(0.2)"
        menu.style.opacity = 0;
        setTimeout(() => {
            menu.style.display = "none";
        }, 300);
        menuISVisible = false
    } else {
        setTimeout(() => {
            menu.style.display = "grid";
            setTimeout(() => {
                menu.style.transform = "scale(1)"
                menu.style.opacity = 1;
            }, 100);
            menuISVisible = true
        }, 300);

    }

}

const themeSwitcherButtons = document.querySelectorAll("*[name='theme']")
let activeThemeIndex = 0;

themeSwitcherButtons.forEach((el, index) => {
    el.addEventListener("click", () => {
        if (activeThemeIndex === index) {
            alert("Уже активно!")
            return
        }

        if (index === 0) themeLight()
        if (index === 1) themeDark()
        if (index === 2) themeRed()
        if (index === 3) themeBlue()
    });

    function $(selectedElem = ".box", themeKey = "light") {
        let editableEl;
        if (document.querySelectorAll(selectedElem).length > 1) editableEl = document.querySelectorAll(selectedElem);
        else editableEl = document.querySelector(selectedElem);
        if (editableEl.length > 1) {
            editableEl.forEach(arrayElem => {
                arrayElem.classList.remove("light", "dark", "blue", "red")
                arrayElem.classList.add(themeKey)
            });
        }
        else {
            document.querySelector(selectedElem).classList.remove("light", "dark", "red", "blue")
            document.querySelector(selectedElem).classList.add(themeKey)
        }
    }

    function themeLight() {
        $("body", "light")
        $(".box", "light")
        $(".box span#quest", "light")
        $(".box span#count", "light")
        $(".box button#btn", "light")
        // $(".endgame-screen", "light")
        $(".menu", "light")
        $(".gridSettingName", "light")
        $(".menuShowBtn", "light")

        activeThemeIndex = 0
    }

    function themeDark() {
        $("body", "dark")
        $(".box", "dark")
        $(".box span#quest", "dark")
        $(".box span#count", "dark")
        $(".box button#btn", "dark")
        // $(".endgame-screen", "dark")
        $(".menu", "dark")
        $(".gridSettingName", "dark")
        $(".menuShowBtn", "dark")
        activeThemeIndex = 1

    }
    function themeRed() {
        $("body", "red")
        $(".box", "red")
        $(".box span#quest", "red")
        $(".box span#count", "red")
        $(".box button#btn", "red")
        // $(".endgame-screen", "red")
        $(".menu", "red")
        $(".gridSettingName", "red")
        $(".menuShowBtn", "red")

        activeThemeIndex = 2

    }
    function themeBlue() {
        $("body", "blue")
        $(".box", "blue")
        $(".box span#quest", "blue")
        $(".box span#count", "blue")
        $(".box button#btn", "blue")
        // $(".endgame-screen", "blue")
        $(".menu", "blue")
        $(".gridSettingName", "blue")
        $(".menuShowBtn", "blue")
        activeThemeIndex = 3

    }
});

const resetButton = document.querySelector("button.resetButton");

resetButton.addEventListener("click", () => {
    anime({
        targets: ".box",
        keyframes: [
            {
                // padding: "100% 0 0 0",
                scaleX: 0.5
            },
            {
                // padding: "0",
                scaleX: 1
            },
        ],
        duration: 500,
        easing: "easeInExpo"


    });
    setTimeout(() => {
        count.innerHTML = 0
        rightAnswers = 0
        quest = makeQuestion(0, 100);
        questLabel.innerHTML = quest.quest
        newQuest();
    }, 700);

});



// const customRange = document.querySelectorAll(".custom-range");

// customRange.forEach(element => {
//     element.addEventListener("pointerdown", () => {

//     });
// });



const scene = document.querySelector(".scene");
let dataDepth = 1

for (let i = 0; i < 100; i++) {
    let el = document.createElement("div")
    scene.insertAdjacentElement("beforeend", el)
    el.innerHTML = randNumber(0, 100, 4)
    el.setAttribute("data-depth", rand(-100, 100) / 100)
    el.style.fontSize = `${rand(10, 40)}px`
    el.style.opacity = rand(40, 100) / 100
}

let paralllax = new Parallax(scene, {
    relativeInput: true,
    inputElement: box
});

for (elem of Array.from(scene.children)) {
    elem.style.top = `${rand(15, visualViewport.height - 15)}px`
    elem.style.left = `${rand(15, visualViewport.width - 15)}px`
}