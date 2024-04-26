function renderUserHeader(parent) {
    let header = document.createElement("header");
    header.id = "header";
    parent.appendChild(header);

    let myVoyages = document.createElement("div");
    myVoyages.id = "myVoyages";

    let myTextBox = document.createElement("div");
    myTextBox.id = "myTextBox";
    let myText = document.createElement("h1");
    myText.id = "myText";
    myText.textContent = "MY";
    myTextBox.appendChild(myText);


    let logoBox = document.createElement("div");
    logoBox.id = "logoBox";

    let logo = document.createElement("div");
    renderLogo(logo, "70px", "");
    logoBox.appendChild(logo);

    let sText = document.createElement("h1");
    sText.id = "sText";
    sText.textContent = "S";
    logoBox.appendChild(sText);

    header.appendChild(myVoyages);
    myVoyages.appendChild(myTextBox);
    myVoyages.appendChild(logoBox);
}
renderNav(wrapper);
renderUserHeader(wrapper);