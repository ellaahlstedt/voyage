"use strict";

function renderListItem(parent, items) {

    for (const item of items) {

        const listItem = document.createElement("div");
        listItem.classList.add("listItem");

        let text = document.createElement("h1");
        text.id = "text";
        listItem.appendChild(text);

        if (parent.id == "countriesCon") {
            listItem.classList.add("countryItem");
            listItem.setAttribute("id", `country-${item.id}`);
            text.textContent = item.name;
            listItem.style.backgroundImage = `url("../${item.images}")`

            listItem.addEventListener("click", function() {
                getToCountryOrCityPage(item.name, "country");
            })

        } else if (parent.id == "citiesCon") {
            listItem.classList.add("cityItem")
            listItem.setAttribute("id", `city-${item.id}`);
            text.textContent = item.name;
            // listItem.style.backgroundImage = `url("../${randomImage}")`;
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