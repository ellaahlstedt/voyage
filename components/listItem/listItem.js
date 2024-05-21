"use strict";

function renderListItem(parent, items, images) {

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
            
            const listItemImage = document.createElement("img")
            listItemImage.setAttribute("src", "${item.images}");
            listItemImage.id = "listItemImage";
            listItem.appendChild(listItemImage);
            console.log(item.images);
            listItemImage.addEventListener("click", function () {
                getToCountryOrCityPage(item.name, "country");
            })

        } else if (parent.id == "citiesCon") {
            listItem.classList.add("cityItem")
            listItem.setAttribute("id", `city-${item.id}`);
            text.textContent = item.name;

            let randomImage = Math.floor(images.length * Math.random());
            listItem.style.backgroundImage = `url("../${images[randomImage]}")`;
        };

        let beenButton = document.createElement("button");
        beenButton.id = "beenButton";
        beenButton.textContent = "BEEN";
        listItem.appendChild(beenButton);

        beenButton.addEventListener("click", function (event) {
            event.preventDefault();

            state_handler.postItem("been", item.id);

        })

        let likeButton = document.createElement("img");
        likeButton.id = "likeButton";
        likeButton.setAttribute("src", "../../fonts/icons/favourite.png");
        listItem.appendChild(likeButton);

        parent.appendChild(listItem);

        likeButton.addEventListener("click", function (event) {
            event.preventDefault();

            state_handler.postItem("liked", item.id);

        })
    }
}