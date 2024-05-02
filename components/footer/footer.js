function renderFooter (parent) {
    let footer = document.createElement("footer");
    footer.id = "footer";
    parent.appendChild(footer);

    let logoBox = document.createElement("div");
    logoBox.id = "logoBox";
    renderLogo(logoBox, "60", "white");
    footer.appendChild(logoBox);

    let contactBox = document.createElement("div");
    contactBox.id = "contactBox";
    contactBox.innerHTML = `
    <p> Contact us <br> voyagemau@gmail.com </p>
    <p> Instagram <br> @choosevoyage </p>
    `
    footer.appendChild(contactBox);
}