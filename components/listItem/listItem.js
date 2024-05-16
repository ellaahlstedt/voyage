"use strict";

function renderListItem(parent, items) {

    /* // Adams kod 
    let toLoopThrough = destination;

    if (window.location.href.includes("country")) {
        const country_name = window.location.href.split("country=")[1].replace("%20", " ");
        toLoopThrough = destination.find(country => country.name === country_name);
        console.log(toLoopThrough);
    }
    */
    for (const item of items) {

        const listItem = document.createElement("div");
        listItem.id = "listItem";

        let text = document.createElement("h1");
        text.id = "text";
        listItem.appendChild(text);

        listItem.style.backgroundImage = `url("../${item.images}")`

        if (parent.id == "countriesCon") {
            listItem.classList.add("countryItem");
            text.textContent = item.name;

        } else if (parent.id == "citiesCon") {
            listItem.classList.add("cityItem")
        };

        let beenButton = document.createElement("button");
        beenButton.id = "beenButton";
        beenButton.textContent = "BEEN";
        listItem.appendChild(beenButton);

        let likeButton = document.createElement("img");
        likeButton.id = "likeButton";
        likeButton.setAttribute("src", "../../fonts/icons/favourite.png");
        listItem.appendChild(likeButton);

        parent.appendChild(listItem);

    }
}