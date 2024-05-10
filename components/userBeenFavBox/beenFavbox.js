"use strict";

function renderBeenFavLists (parent, title) {
    let listBox = document.createElement("div");
    listBox.className = "listBox";
    parent.appendChild(listBox);

    let h1 = document.createElement("h1");
    h1.textContent = title;
    listBox.appendChild(h1);

    let list = document.createElement("ul");
    listBox.appendChild(list);

    let listItems = document.createElement("li");
    listBox.appendChild(listItems);
}

function renderBeenfavCon (parent, type, containerId) {
    let beenFavCon = document.createElement("div");
    beenFavCon.className = "beenFavCon";
    beenFavCon.id = containerId;
    parent.appendChild(beenFavCon);

    let titleBox = document.createElement("div");
    titleBox.className = "titleBox";
    beenFavCon.appendChild(titleBox);
    let h1 = document.createElement("h1");
    let icon = document.createElement("img");
    icon.className = "icon";

    if (type === "beenList") {
        h1.textContent = "BEEN";
        icon.setAttribute("src", "../../fonts/icons/marker.svg");
    } else if (type === "wishlistList") {
        h1.textContent = "WISHLIST";
        icon.setAttribute("src", "../../fonts/icons/favouritered.png");
    }
    titleBox.appendChild(h1);
    titleBox.appendChild(icon);

    let listCon = document.createElement("div");
    listCon.className = "listCon";
    beenFavCon.appendChild(listCon);

    let deleteButton = document.createElement("button");
    deleteButton.id = "deleteButton";
    deleteButton.textContent = "UN-BEEN";
    if (containerId === "beenList") {
        beenFavCon.appendChild(deleteButton);
    }

    renderBeenFavLists(listCon, "Regions");
    renderBeenFavLists(listCon, "Countries");
    renderBeenFavLists(listCon, "Cities");
}