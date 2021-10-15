class Cloud {
    constructor(width, height, opacity = 1, offsetY = 0, transitionDelay = 1000) {
        this.html = document.createElement("div")
        this.html.classList.add("cloud")
        this.html.style.width = width + "px"
        this.html.style.height = height + "px"
        this.html.style.filter = `opacity(${opacity})`
        this.html.style.top = offsetY + "px"
        this.html.style.transition = `${transitionDelay}ms all linear`

        return this.html
    }
}
class Bar {
    constructor(width = 40, height = 10, top = 0, left = 0) {
        this.html = document.createElement("div");
        this.html.style.width = width + "px";
        this.html.style.height = height + "px";
        this.html.style.top = top + "px";
        this.html.style.left = left + "px";
        this.html.classList.add("bar")
        this.html.style.transition = `${barSpeed * 0.7}ms all linear`
        this.html.super = "Bar"
        this.html.getClash = function (_obstacle) {
            if (_obstacle.offsetLeft - 20 <= elemBounding.right && _obstacle.offsetLeft - 20 >= elemBounding.left - _obstacle.clientWidth - 20) {
                if (_obstacle.offsetTop - 20 + _obstacle.clientHeight / 2 > player.offsetTop && _obstacle.offsetTop - 20 < player.offsetTop + player.clientHeight) return true
                else return false
            }
            else return false
        }



        return this.html
    }
}
class Cactus {
    constructor(width = 40, height = 10, left = 0) {
        this.html = document.createElement("div");
        this.html.style.width = width + "px";
        this.html.style.height = height + "px";
        this.html.style.top = groundBounding.top - height + "px";
        this.html.style.left = left + "px";
        this.html.classList.add("cactus")
        this.html.style.transition = `${barSpeed}ms all linear`
        this.html.super = "Cactus"
        this.html.getClash = function (_obstacle) {
            if (_obstacle.offsetLeft <= elemBounding.right && _obstacle.offsetLeft >= elemBounding.left) {
                if (_obstacle.offsetTop > player.offsetTop && _obstacle.offsetTop < player.offsetTop + player.clientHeight) return true
                else return false
            }
            else return false
        }



        return this.html
    }
}
class Hole {
    constructor(width = 70, height = 300) {
        this.html = document.createElement("div");
        this.html.style.width = width + "px";
        this.html.style.height = height + "px";
        this.html.style.top = groundBounding.top - 5 + "px";
        this.html.classList.add("hole")
        this.html.style.transition = `${barSpeed}ms all linear`
        this.html.gravitySide = visualViewport.height
        this.html.super = "Hole"
        // this.html.index = gravitableElements.length - 1
        this.html.getClash = function (_obstacle) {
            if (player.offsetTop + player.clientHeight > groundBounding.top + 15) {
                return true
            }
            return false
        }

        return this.html
    }
}
let cloudSpawnerInterval = setInterval(cloudSpawner, 3000)
let nocloud = false

let obstacleSpawnerInterval = setInterval(obstacleSpawner, barSpeed * 0.8);
function obstacleSpawner() {
    let obstacle = null;
    let magicNumber = rand(0, 50);
    // if (magicNumber <= 45) obstacle = new Bar(40, 40, rand(groundBounding.top - player.clientHeight * 1.5, groundBounding.top - 50), visualViewport.width + 5)
    if (magicNumber <= 40) obstacle = new Cactus(rand(40, 80), rand(20, 80), visualViewport.width + 5)
    else obstacle = new Hole()
    // let obstacle = new Bar(rand(30, visualViewport.width * 0.09), 10, rand(groundBounding.top - player.clientHeight + 5, groundBounding.top - 20), visualViewport.width + 5)
    // let obstacle = new Hole()
    let clashTestInterval = null;
    if (obstacle.super === "Hole") gravitableElements.push(obstacle)
    gameWindow.insertAdjacentElement("beforeend", obstacle)

    obstacle.style.left = (-obstacle.clientWidth - 5) + "px"

    clashTestInterval = setInterval(() => {
        if (obstacle.getClash(obstacle) && clip) {
            setTimeout(() => {
                gameover()
                document.querySelectorAll(".hole").forEach(el => el.remove());
                gravitableElements = []
                clearInterval(obstacleSpawnerInterval)
            }, 360);
        }
        if (obstacle.offsetLeft <= -obstacle.clientWidth - 5) {
            clearInterval(clashTestInterval)
            if (obstacle.super === "Hole") gravitableElements.splice(0, 1)
            obstacle.remove()
        }
    }, 10);

    // setTimeout(() => {
    //     clearInterval(clashTestInterval)
    //     obstacle.remove()
    // }, barSpeed);
}

function cloudSpawner() {
    if (nocloud) return
    let cloud = new Cloud(rand(30, 200), rand(10, 80), rand(5, 10) / 10, rand(10, groundBounding.top - 100), rand(1000, 8000))
    gameWindow.insertAdjacentElement("beforeend", cloud)
    cloud.style.left = -cloud.clientWidth + "px"

    let testInterval = setInterval(() => {
        if (cloud.offsetLeft <= 0 - cloud.clientWidth) {
            cloud.remove()
            clearInterval(testInterval)
        }
    }, 50);
}
function gameover() {
    window.navigator.vibrate(300)
    gameoverScreen.style.display = "flex"
    gameoverScreenText.innerHTML = "Game Over"
    setTimeout(() => {
        player.style.top = groundBounding.top - player.clientHeight + "px"
    }, 500);


    clearInterval(cloudSpawnerInterval)
    clearInterval(obstacleSpawnerInterval)
    anime({
        targets: menuArrow,
        bottom: "10vh",
        duration: 400,
        delay: 300,
        easing: "easeOutSine"
    });
}

// restart
gameoverScreen.children[0].addEventListener("click", () => {
    gameoverScreen.style.display = "none"
    clip = true
    clearInterval(cloudSpawnerInterval)
    clearInterval(obstacleSpawnerInterval)
    cloudSpawnerInterval = setInterval(cloudSpawner, 3000)
    obstacleSpawnerInterval = setInterval(obstacleSpawner, barSpeed * 0.8);

    //for animation
    // menuArrow.style.bottom = "5%"
});


function getNewGroundPic() {
    let result = document.createElement("div")
    result.classList.add("groundMove")
    return result
}
let nogGroundMove = false;
let groundPic = Array.from(document.querySelectorAll(".groundMove"));
let picWidth = visualViewport.width * 2
// let groundMoveInterval = setInterval(groundMove, 3000)
function groundMove() {
    if (nogGroundMove) return
    let pics = Array.from(document.querySelectorAll(".groundMove"))
    pics[1].style.left = picWidth + 'px'
    pics[2].style.left = (2 * picWidth) + 'px'
    anime({
        targets: [pics[0], pics[1]],
        left: `-=${picWidth}`,
        duration: barSpeed * 2,
        easing: "linear",
    });
    // anime({
    //     targets: pics[1],
    //     left: 0,
    //     duration: 3000,
    //     easing: "linear",
    // });
    setTimeout(() => {
        pics[0].remove()
        ground.insertAdjacentElement("beforeend", getNewGroundPic())
        groundMove()
    }, barSpeed * 2);
}
groundMove()
