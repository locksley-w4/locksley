const el = $(".el");

const paint = $(".paint");

let elWidth = parseInt(el.css("width"));

let elHeight = parseInt(el.css("height"));

// let elWidth = parseInt(prompt("Введите ширину"));

// let elHeight = parseInt(prompt("Введите высоту"));

let elems = "";



for (let i = elHeight; i < parseInt(paint.css("height")); i += elHeight) {
    $("table").append("<tr>") 
    for(let k = elWidth; k < parseInt(paint.css("width")); k += elWidth){
    //    paint.append("<div class='el'></div>");

    $("table").append("<td height='10' width='10'></td>") 
    }
    $("table").append("</tr>") 

}
// $("table").html(elems);
console.log(elems)

// console.log(el.css("width"))