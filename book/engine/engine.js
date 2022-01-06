const content = document.querySelector(".content");
const loading = document.querySelector(".loading");

// let bookContent = ``;
bookContent = bookContent.split(" ");
let a = 1;

function insertNewPage(bc) {
    let pageNumber = 1
    let inner = () => {
        page = createPage(pageNumber++);
        page.innerHTML = bc.splice(0, 500).join(" ") + a++;
        content.insertAdjacentElement("beforeend", page)
        if (bc.length < 200) return
        else inner()
    };
    inner()
}
function createPage(num) {
    let creatableElem = document.createElement("div")
    creatableElem.classList.add("page")
    creatableElem.setAttribute("id", num)
    return creatableElem
}
insertNewPage(bookContent)
content.children[0].classList.add("active");

const btnPrev = document.querySelector("button#previous")
const btnNext = document.querySelector("button#next")

btnPrev.addEventListener("click", previousPage);
btnNext.addEventListener("click", nextPage);

let getActive = () => Array.from(content.children).find(e => e.classList.contains("active"));

function previousPage() {
    let activeElem = getActive();
    storageSave(activeElem)
    if (activeElem.getAttribute("id") <= 1) return
    content.children[activeElem.getAttribute("id") - 2].classList.add("active");
    activeElem.classList.remove("active");
    document.querySelector(".pageswitcher h3#previousPageNumber").innerHTML = getActive().getAttribute("id") - 1
    document.querySelector(".pageswitcher h2#currentPageNumber").innerHTML = getActive().getAttribute("id")
    document.querySelector(".pageswitcher h3#nextPageNumber").innerHTML = +getActive().getAttribute("id") + 1
    pageChangeAnim()
    window.scrollTo(0, 0);
}

function nextPage() {
    let activeElem = getActive();
    storageSave(activeElem)
    if (activeElem.getAttribute("id") >= content.children.length) return
    content.children[activeElem.getAttribute("id")].classList.add("active");
    activeElem.classList.remove("active");
    document.querySelector(".pageswitcher h3#previousPageNumber").innerHTML = getActive().getAttribute("id") - 1
    document.querySelector(".pageswitcher h2#currentPageNumber").innerHTML = getActive().getAttribute("id")
    document.querySelector(".pageswitcher h3#nextPageNumber").innerHTML = +getActive().getAttribute("id") + 1
    pageChangeAnim()
    window.scrollTo(0, 0);
}

function pageChangeAnim() {
    loading.classList.add("active")
    setTimeout(() => {
        loading.classList.remove("active")
    }, 500);
}


document.onreadystatechange = e => {
    if (document.readyState !== "complete") return;
    let activePageNumber = localStorage.getItem(bookName) ? localStorage.getItem(bookName) : 1;
    content.children[0].classList.remove("active");
    content.children[activePageNumber - 1].classList.add("active");
    document.querySelector(".pageswitcher h3#previousPageNumber").innerHTML = getActive().getAttribute("id") - 1
    document.querySelector(".pageswitcher h2#currentPageNumber").innerHTML = getActive().getAttribute("id")
    document.querySelector(".pageswitcher h3#nextPageNumber").innerHTML = +getActive().getAttribute("id") + 1
};

console.log(content.children.length);