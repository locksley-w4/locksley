const canvas = document.querySelector("canvas#paint"),
    ctx = canvas.getContext("2d");
let gradient = ctx.createLinearGradient(15, 15, 115, 15)

gradient.addColorStop(0, "magenta")
gradient.addColorStop(.5, "blue")
gradient.addColorStop(1, "red")
ctx.fillStyle = "#000";

// ctx.fillRect(15, 15, 100, 100)
ctx.arc(400, 400, 100, 0, Math.PI)
console.log(Math.PI);
