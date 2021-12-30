// const
    // pauseBtn = document.querySelector("button.pauseBtn"),
    // pauseMenuBtn = document.querySelector("button.settings"),
    // pauseParallax = document.querySelector(".pauseScene"),
    // pauseParallaxEL = Array.from(document.querySelector(".pauseScene").children);
// let gameOnPause = false

// pauseMenuBtn.addEventListener("click", e => {
//     // pauseMenu.classList.toggle("active")
//     gameOnPause ? play() : pause();
// });
// pauseParallaxEL.forEach(elem => {
//     elem.style.marginTop = `${rand(150, visualViewport.height - 20)}px`
//     elem.style.marginLeft = `${rand(150, visualViewport.width - 20)}px`
// });

// // let parallax = new Parallax(pauseParallax, {
// //     relativeInput: true,
// //     hoverOnly: true
// // });


// function pause() {
//     clip = false
//     // // console.log(1);
//     // gameOnPause = true
//     // nogGroundMove = true
//     // for (bar of Array.from(document.querySelectorAll(".bar"))) {
//     //     bar.style.left = `${bar.offsetLeft}px`
//     // }
//     // for (cloud of Array.from(document.querySelectorAll(".cloud"))) {
//     //     cloud.style.left = `${cloud.offsetLeft}px`
//     // }
//     // clearInterval(gravityInterval)
//     // clearInterval(cloudSpawnerInterval)
//     // clearInterval(obstacleSpawnerInterval)
//     // clearInterval(walkingAnimInterval)
//     // setTimeout(() => {
//     //     clearInterval(gravityInterval)
//     //     clearInterval(cloudSpawnerInterval)
//     //     clearInterval(obstacleSpawnerInterval)
//     //     clearInterval(walkingAnimInterval)
//     // }, barSpeed / 10 + 150);
// }
// function play() {
//     // setTimeout(() => {
//     //     nogGroundMove = false
//     //     groundMove()
//     // }, barSpeed * 2);
//     // gameOnPause = false
//     // // console.log(2);
//     // for (bar of Array.from(document.querySelectorAll(".bar"))) {
//     //     bar.style.left = -bar.clientWidth - 5 + "px"
//     // }
//     // for (cloud of Array.from(document.querySelectorAll(".cloud"))) {
//     //     cloud.style.left = -cloud.clientWidth + "px"
//     // }
//     // gravityInterval = setInterval(() => { gravity(player) }, barSpeed / 10 + 30)
//     // walkingAnimInterval = setInterval(walkingAnim, barSpeed / 10 + 170)
//     // cloudSpawnerInterval = setInterval(cloudSpawner, 3000)
//     // obstacleSpawnerInterval = setInterval(obstacleSpawner, barSpeed * 0.8);

//     clip = true
// }