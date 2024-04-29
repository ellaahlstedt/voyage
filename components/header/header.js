function renderHeader(parent, currentPage) {
    let header = document.createElement("header");
    header.id = "header";
    parent.appendChild(header);

    renderLogo(header, "100px");

    if (currentPage == "Regions") {
        let infoCon = document.createElement("div");
        infoCon.id = "infoCon";
        parent.appendChild(infoCon);

        let infoBox = document.createElement("div");
        infoBox.id = "infoBox";
        infoBox.textContent = "Welcome to our travel web app! Here you can easily create two lists: the Wishlist, where you can add all the places you dream of visiting, and the Been-List, where you proudly showcase the destinations you've already explored. Start building your travel legacy today!"

        let infoCircle = document.createElement("div");
        infoCircle.id = "infoCircle";
        infoCircle.innerHTML = `What is </br> VOYAGE?`;

        infoCon.appendChild(infoCircle);
        infoCon.appendChild(infoBox);
    }

    let chooseCon = document.createElement("div");
    chooseCon.id = "chooseCon";

    let chooseTitle;
    
    switch (currentPage) {
        case "Regions":
            chooseTitle = "Region in Europe";
        break;
        case "Countries":
            chooseTitle = "Country";
        break;
        case "Cities":
            chooseTitle = "City";
        break;
    }
    
    chooseCon.innerHTML = `
        <p>Choose a...</p>
        <p>${chooseTitle}</p>
    `
    parent.appendChild(chooseCon);
}