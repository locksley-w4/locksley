const player = document.querySelector(".elem"),
    ground = document.querySelector(".ground"),
    gameoverScreenText = document.querySelector("h2.pauseText"),
    gameWindow = document.querySelector(".window"),
    // allElements = Array.from(document.querySelectorAll(".window > div")),
    gameoverScreen = document.querySelector(".gameoverScreen"),
    head = document.querySelectorAll(".zombiehead"),
    body = document.querySelectorAll(".zombiebody"),
    hands = document.querySelectorAll(".zombiehand"),
    legs = document.querySelectorAll(".zombieleg");

let barSpeed = 2300,
    gravitableElements = [];

if (visualViewport.width <= 600) {
    ground.style.height = "50%"
    barSpeed *= 0.7
}


let clip = true,
    elemBounding = player.getBoundingClientRect(),
    groundBounding = ground.getBoundingClientRect(),
    gravityIsWorking = true,
    gravityInterval = setInterval(() => { gravity(player) }, 10);

ground.gravitySide = groundBounding.top

player.style.top = (groundBounding.top - player.clientHeight) + "px";
let goTo = null;
// setInterval(() => {
//     if (!clip) {
//         goTo = groundBounding.top - player.clientHeight
//     }
//     else {
//         goTo = getGravity().gravitySide - player.clientHeight
//         // console.log(goTo);
//         // if (goTo > ground.gravitySide - 15) {
//         //     gravity()
//         // }
//         nearest = null
//     }
//     // console.log(goTo);
// }, 50);
function getGravity() {
    if (!clip) return ground.gravitySide - player.clientHeight
    let nearest = null;
    for (el of gravitableElements) {
        elRect = el.getBoundingClientRect()
        if (elRect.right >= player.offsetLeft + player.clientWidth && elRect.left <= player.offsetLeft) {
            if (elRect.top >= player.offsetTop + player.clientHeight - 10 || elRect.top <= player.offsetTop + player.clientHeight + 10) {
                nearest = el
            }
        }
    }
    nearest = nearest !== null ? nearest : ground
    return nearest
}

let gravityNumber = 5;

function gravity(_el = player, works = gravityIsWorking) {
    if (!gravityIsWorking) return
    // let goTo = groundBounding.top - player.clientHeight;
    // console.log(getGravity());
    // console.log(goTo);
    // clearInterval(gravityInterval)

    // if (_el.offsetTop <= groundBounding.top - player.clientHeight && works) {
    //     anime({
    //         targets: player,
    //         top: goTo,
    //         easing: "easeInSine",
    //         duration: barSpeed / 10 + 20,
    //         delay: 0,
    //     });
    // }
    // setTimeout(() => {
    //     gravityInterval = setInterval(() => { gravity(player) }, barSpeed / 10 + 30)
    // }, barSpeed / 10 + 30);

    goTo = getGravity().gravitySide
    if (player.offsetTop + player.clientHeight <= goTo) player.style.top = player.offsetTop + gravityNumber + "px";
    gravityNumber += 0.1
}


function jump(_el) {
    // gravityIsWorking = false
    // anime({
    //     targets: _el,
    //     top: "-=140",
    //     easing: "easeOutQuart",
    //     duration: barSpeed / 10 + 30,
    //     delay: 0,
    // });
    // setTimeout(() => {
    //     gravityIsWorking = true
    // }, barSpeed / 10 + 30);

    gravityIsWorking = false
    let num = 10
    let jumpInterval = setInterval(() => {
        if (player.offsetTop >= goTo - 200) {
            player.style.top = player.offsetTop - num + "px"
            num -= 0.1
        }
        else {
            clearInterval(jumpInterval)
            setTimeout(() => {
                gravityNumber = 5
                gravityIsWorking = true
            }, 250);
        }
    }, 10);
}

function jumpEvent(e) {
    if (e.key === " " && parseInt(player.getBoundingClientRect().bottom) >= parseInt(groundBounding.top - 3) && e.path.indexOf(document.querySelector("button.settings")) === -1) {
        jump(player);
        jumpingAnim()
    }
}
function jumpEventMobile(e) {
    if (parseInt(player.getBoundingClientRect().bottom) >= parseInt(groundBounding.top - 3) && e.path.indexOf(document.querySelector("button.settings")) === -1) {
        // console.log(e);
        jump(player);
        jumpingAnim()
    }
}
if (visualViewport.width <= 800) window.addEventListener("touchstart", jumpEventMobile)
document.addEventListener("keydown", jumpEvent);
/* Move */
// let movingLeft;
// let isMoving = false;
// let movingRight;
// let canmove = true

// document.addEventListener("keydown", (e) => {
//     if (e.key === "d" && canmove) {
//         clearInterval(movingRight)
//         movingRight = setInterval(() => {
//             elem.style.left = elem.offsetLeft + 1 + "px"
//         }, 1);
//         if (elem.offsetLeft > window.innerWidth - elem.clientWidth) elem.style.left = "0px"
//     }
//     if (e.key === "a" && canmove) {
//         clearInterval(movingLeft)
//         movingLeft = setInterval(() => {
//             elem.style.left = elem.offsetLeft - 1 + "px"
//         }, 1);
//         if (elem.offsetLeft < 0) elem.style.left = `${window.innerWidth - elem.clientWidth}px`

//     }
// });
// document.addEventListener("keyup", (e) => {
//     if (e.key === "d") {
//         clearInterval(movingRight)
//     }
//     if (e.key === "a") {
//         clearInterval(movingLeft)

//     }
// });

/*      */


let animeV = true
function walkingAnim() {
    if (animeV) {
        //legs anim
        anime({
            targets: legs[0],
            rotate: 50,
            translateX: "5px",
            duration: barSpeed / 10 + 170,
            easing: "easeOutSine"
        });
        anime({
            targets: legs[1],
            rotate: -50,
            translateX: "-5px",
            duration: barSpeed / 10 + 170,
            easing: "easeOutSine"
        });
        //hands anim
        anime({
            targets: hands[0],
            rotate: "5deg",
            duration: barSpeed / 10 + 170,
            easing: "easeOutSine"
        });
        anime({
            targets: hands[1],
            rotate: "-5deg",
            duration: barSpeed / 10 + 170,
            easing: "easeOutSine"
        });
        //body anim
        anime({
            targets: body,
            rotate: "3deg",
            duration: 400,
            easing: "easeOutSine"
        });
        //head anim
        anime({
            targets: head,
            rotate: 3,
            translateX: "0.5px",
            duration: barSpeed / 10 + 170,
            easing: "easeInSine"
        });
    }
    else {
        //legs anim

        anime({
            targets: legs[0],
            rotate: -50,
            translateX: "-5px",
            duration: barSpeed / 10 + 170,
            easing: "easeOutSine"
        });
        anime({
            targets: legs[1],
            rotate: 50,
            translateX: "5px",
            duration: barSpeed / 10 + 170,
            easing: "easeOutSine"
        });

        //hands anim

        anime({
            targets: hands[0],
            rotate: "-5deg",
            duration: barSpeed / 10 + 170,
            easing: "easeOutSine"
        });
        anime({
            targets: hands[1],
            rotate: "5deg",
            duration: barSpeed / 10 + 170,
            easing: "easeOutSine"
        });

        //body anim

        anime({
            targets: body,
            rotate: "-3deg",
            duration: 400,
            easing: "easeOutSine"
        });


        anime({
            targets: head,
            rotate: -3,
            translateX: "-0.5px",
            duration: barSpeed / 10 + 170,
            easing: "easeInSine"
        });
    }
    animeV = !animeV
}
let walkingAnimInterval = setInterval(walkingAnim, barSpeed / 10 + 170);

// let headAnimInterval = setInterval(headAnim, barSpeed / 10 + 180)

function jumpingAnim() {
    clearInterval(walkingAnimInterval)
    if (animeV) {
        anime({
            targets: legs[0],
            rotate: 80,
            translateX: "5px",
            duration: barSpeed / 10 + 170,
            easing: "easeOutSine"
        });
        anime({
            targets: legs[1],
            rotate: -80,
            translateX: "-5px",
            duration: barSpeed / 10 + 170,
            easing: "easeOutSine"
        });
        animeV = false
    }
    else {
        anime({
            targets: legs[0],
            rotate: -80,
            translateX: "-5px",
            duration: barSpeed / 10 + 170,
            easing: "easeOutSine"
        });
        anime({
            targets: legs[1],
            rotate: 80,
            translateX: "5px",
            duration: barSpeed / 10 + 170,
            easing: "easeOutSine"
        });
        animeV = true
    }


    anime({
        targets: hands,
        rotate: "-=20",
        duration: barSpeed / 10 + 570,
    });
    setTimeout(() => {
        anime({
            targets: hands,
            rotate: "0",
            duration: 1500,
        })
    }, barSpeed / 10 + 130);

    anime({
        targets: head,
        rotate: 10,
        keyframes: [{
            translateY: -10,
        },
        {
            translateY: 0,
        }],
        duration: barSpeed / 10 + 100,
        easing: "easeInSine"
    });


    setTimeout(() => {
        walkingAnimInterval = setInterval(walkingAnim, barSpeed / 10 + 170)
    }, barSpeed / 10 + 110);

}
function getElementTouch(_obstacle) {
    if (_obstacle.offsetLeft <= elemBounding.right && _obstacle.offsetLeft >= elemBounding.left) {
        if (_obstacle.offsetTop > player.offsetTop && _obstacle.offsetTop < player.offsetTop + player.clientHeight) return true
        else return false
    }
    else return false
}
function getElementFall(_obstacle) {
    if (player.offsetTop + player.clientHeight > groundBounding.top) {
        return true
    }
    return false
}