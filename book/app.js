// const bookLine = document.querySelector(".bookline");
// const books = Array.from(bookLine.children);

// let link = (panel, data) => {
//     panel.children[0].setAttribute("href", data);
// }



// books.forEach(e => {
//     e.addEventListener("pointerover", e => { showControls(e) })
//     e.addEventListener("pointerout", e => {
//         if (e.path[0].classList.contains("controls")) return
//         hideControls(e);
//     });
// });

// function showControls(event) {
//     let target = event.path.find(e => e.classList.contains("book"));
//     controlsPanel = Array.from(target.children).find(elem => elem.classList.contains("controls"));
//     controlsPanel.style.width = target.clientWidth
//     link(controlsPanel, `books/${target.getAttribute("data-name")}/index.html`);
//     controlsPanel.style.display = "flex";
//     controlsPanel.style.top = target.offsetTop + "px";
//     controlsPanel.style.left = target.offsetLeft + "px";
//     controlsPanel.style.width = target.clientWidth + "px";
//     controlsPanel.style.height = target.clientHeight + "px";
// }
// function hideControls(event) {
//     controlsPanel.style.display = "none"
// }
