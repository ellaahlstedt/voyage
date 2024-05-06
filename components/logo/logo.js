function renderLogo(parent, fontSize, color = false) {
    const letters = ["V", "O", "Y", "A", "G", "E"];
    const colors = ["#3568C1", "#87A7FC", "#B4C8FF", "#FFDD95", "#FFBC85", "#FE9843"];

    let link = document.createElement("a");

    let logoSrc = window.location.href.toLowerCase().includes("pages") ? "../../" : "./";
    link.setAttribute("href", logoSrc);

    link.classList.add("logo");
    link.style.height = fontSize + "px";
    parent.appendChild(link);

    if (color) {
        let whiteLogo = document.createElement("h1");
        whiteLogo.textContent = "VOYAGE";
        whiteLogo.style.color = color;
        whiteLogo.style.fontSize = fontSize + "px";
        whiteLogo.id = "whiteLogo";
        link.appendChild(whiteLogo);
    } else {
        for (let i = 0; i < letters.length; i++) {
            let letter = document.createElement("h1");
            letter.classList.add("multiLogoLetter");
            letter.textContent = letters[i];
            letter.style.color = colors[i];
            letter.style.fontSize = fontSize + "px";
            link.appendChild(letter);
        }
    }
}