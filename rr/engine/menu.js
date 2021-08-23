const menuArrow = document.querySelector(".arrow"),
    axis = document.querySelector(".moveAxis"),
    menu = document.querySelector(".menu");
let coordinates = [],
    axisMove = true,
    pointerOn = false,
    pointerdownEvent = visualViewport.width >= 800 ? "pointerdown" : "touchstart",
    pointermoveEvent = visualViewport.width >= 800 ? "pointermove" : "touchmove",
    pointerupEvent = visualViewport.width >= 800 ? "pointerup" : "touchend";
// console.log(pointerdownEvent, pointermoveEvent, pointerupEvent);
function arrowMove(_e) {
    let magicNumber = _e.screenY
    // removeEventListener("pointermove", axis)
    if (axisMove) {
        let goTo = (visualViewport.height - magicNumber) + "px";
        // console.log(magicNumber);
        menuArrow.style.bottom = goTo
        // menu.style.height = goTo
    }
    coordinates[coordinates.length] = magicNumber
    // console.log(_e);
}
function arrowMoveMobile(_e) {
    let magicNumber = _e.touches[0].screenY
    // removeEventListener("pointermove", axis)
    if (axisMove) {
        let goTo = (visualViewport.height - magicNumber) + "px";
        // console.log(magicNumber);
        menuArrow.style.bottom = goTo
        // menu.style.height = goTo
    }
    coordinates[coordinates.length] = magicNumber
    // console.log(_e);
}
axis.addEventListener("pointerdown", (e) => {
    pointerOn = true
    axis.style.zIndex = 101
    // console.log(1);
});
axis.addEventListener("pointermove", (_e) => {
    if (pointerOn) {
        arrowMove(_e)
    }
});
axis.addEventListener("pointerup", function (e) {
    pointerOn = false
    axis.style.zIndex = 99
    // console.log(coordinates);

    if (coordinates[coordinates.length - 1] < coordinates[0]) {
        menu.style.height = "60vh"
        anime({
            targets: menuArrow,
            bottom: visualViewport.height * 0.6 + 25,
            translateX: "-50%",
            scaleY: -1,
            scaleX: 1.3,
            duration: 600,
            easing: "easeOutSine"
        });
    }
    else if (coordinates[coordinates.length - 1] > coordinates[0]) {
        menu.style.height = "0"
        anime({
            targets: menuArrow,
            bottom: "10%",
            // translateX: "-50%",
            scaleY: 1,
            duration: 600,
            easing: "easeOutSine"
        });
    }
    coordinates = []

});
axis.addEventListener("pointerleave", function (e) {
    pointerOn = false
    axis.style.zIndex = 99
    // console.log(coordinates);

    if (coordinates[coordinates.length - 1] < coordinates[0]) {
        menu.style.height = "60vh"
        anime({
            targets: menuArrow,
            bottom: visualViewport.height * 0.6 + 25,
            translateX: "-50%",
            scaleY: -1,
            scaleX: 1.3,
            duration: 600,
            easing: "easeOutSine"
        });
    }
    else if (coordinates[coordinates.length - 1] > coordinates[0]) {
        menu.style.height = "0"
        anime({
            targets: menuArrow,
            bottom: "10%",
            // translateX: "-50%",
            scaleY: 1,
            duration: 600,
            easing: "easeOutSine"
        });
    }
    coordinates = []

});
axis.addEventListener("touchstart", (e) => {
    pointerOn = true
    axis.style.zIndex = 101
    // console.log(1);
});
axis.addEventListener("touchmove", (_e) => {
    if (pointerOn) arrowMoveMobile(_e)
    // if (pointerOn) console.log(3);
});
axis.addEventListener("touchend", function (e) {
    pointerOn = false
    axis.style.zIndex = 99
    // console.log(coordinates);

    if (coordinates[coordinates.length - 1] < coordinates[0]) {
        menu.style.height = "60vh"
        anime({
            targets: menuArrow,
            bottom: visualViewport.height * 0.6 + 25,
            translateX: "-50%",
            scaleY: -1,
            scaleX: 1.3,
            duration: 600,
            easing: "easeOutSine"
        });
    }
    else if (coordinates[coordinates.length - 1] > coordinates[0]) {
        menu.style.height = "0"
        anime({
            targets: menuArrow,
            bottom: "10%",
            // translateX: "-50%",
            scaleY: 1,
            duration: 600,
            easing: "easeOutSine"
        });
    }
    coordinates = []

});
axis.addEventListener("touchcancel", function (e) {
    pointerOn = false
    axis.style.zIndex = 99
    // console.log(coordinates);

    if (coordinates[coordinates.length - 1] < coordinates[0]) {
        menu.style.height = "60vh"
        anime({
            targets: menuArrow,
            bottom: visualViewport.height * 0.6 + 25,
            translateX: "-50%",
            scaleY: -1,
            scaleX: 1.3,
            duration: 600,
            easing: "easeOutSine"
        });
    }
    else if (coordinates[coordinates.length - 1] > coordinates[0]) {
        menu.style.height = "0"
        anime({
            targets: menuArrow,
            bottom: "10%",
            // translateX: "-50%",
            scaleY: 1,
            duration: 600,
            easing: "easeOutSine"
        });
    }
    coordinates = []

});
// axis.addEventListener("pointerleave", function (e) {
//     axis.onpointermove = null
//     axis.style.zIndex = 1

// });

document.querySelector("input#noclipcheckbox").addEventListener("click", e => {
    if (document.querySelector("input#noclipcheckbox").checked) clip = false
    else clip = true
});
document.querySelector("input#cloudspawnercheckbox").addEventListener("click", e => {
    if (document.querySelector("input#cloudspawnercheckbox").checked) nocloud = false
    else nocloud = true
});
document.querySelector("input#groundmovecheckbox").addEventListener("click", e => {
    if (document.querySelector("input#groundmovecheckbox").checked) nogGroundMove = false
    else nogGroundMove = true
});
document.querySelector("input#obstaclespeedrange").addEventListener("change", e => {
    // barSpeed = 2.3 * (document.querySelector("input#obstaclespeedrange").value / 100 * 2)
    barSpeed = 5000 - 4500 * (document.querySelector("input#obstaclespeedrange").value / 100)
    // console.log(barSpeed * (document.querySelector("input#obstaclespeedrange").value / 100 * 2));
    // console.log(document.querySelector("input#obstaclespeedrange").value);
});

document.querySelector("button.settings").addEventListener("click", e => {
    gameoverScreen.style.display = "flex"
    gameoverScreenText.innerHTML = "Pause"
    pause()
    anime({
        targets: menuArrow,
        bottom: "10vh",
        duration: 400,
        delay: 300,
        easing: "easeOutSine"
    });
});