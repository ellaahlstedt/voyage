"use strict";

async function renderListItem(parent, items, images) {

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
            listItemImage.setAttribute("src", `../${item.images}`);
            listItemImage.id = "listItemImage";
            listItem.appendChild(listItemImage);
            listItemImage.addEventListener("click", function () {
                getToCountryOrCityPage(item.name, "country");
            })

        } else if (parent.id == "citiesCon") {
            listItem.classList.add("cityItem")
            listItem.setAttribute("id", `city-${item.id}`);
            text.textContent = item.name;

            const listItemImage = document.createElement("img")
            listItemImage.setAttribute("src", `../${item.images}`);
            listItemImage.id = "listItemImage";
            listItem.appendChild(listItemImage);
            /*
            let randomImage = Math.floor(images.length * Math.random());
            listItem.style.backgroundImage = `url("../${images[randomImage]}")`;
            */
        };

        let data = await get_user("user");
        let user = state_handler.get("user");

        let beenButton = document.createElement("button");
        beenButton.id = "beenButton";
        beenButton.textContent = "BEEN";
        if (user.been.includes(item.id)) {
            beenButton.classList.add("beenClicked");
        }
        listItem.appendChild(beenButton);

        beenButton.addEventListener("click", function (event) {
            event.preventDefault();

            if (beenButton.classList.contains("beenClicked")) {
                state_handler.delete("been", item.id);
                beenButton.classList.remove("beenClicked");
            } else {
                state_handler.postItem("been", item.id);
                beenButton.classList.add("beenClicked");
            }

        })

        let likeButton = document.createElement("img");
        likeButton.id = "likeButton";

        if (user.liked.includes(item.id)) {
            likeButton.setAttribute("src", "../../fonts/icons/favouritered.png");
        } else {
            likeButton.setAttribute("src", "../../fonts/icons/favourite.png");
        }

        listItem.appendChild(likeButton);

        parent.appendChild(listItem);

        likeButton.addEventListener("click", function (event) {
            event.preventDefault();


            if (likeButton.getAttribute("src") == "../../fonts/icons/favourite.png") {
                state_handler.postItem("liked", item.id);
                likeButton.setAttribute("src", "../../fonts/icons/favouritered.png");
            } else {
                state_handler.delete(item.id, "liked");
                likeButton.setAttribute("src", "../../fonts/icons/favourite.png");
            }

        })
    }
}