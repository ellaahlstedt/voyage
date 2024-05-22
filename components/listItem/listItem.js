"use strict";

async function renderListItem(parent, items, type) {

    const allRegions = await fetch_handler("../../logic/destinations.php?type=region");

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

            if (type == "filtered") {

                listItem.style.backgroundImage = `url("../${item.images}")`;

            } else if (type == "all") {

                let allCityImages = [];

                for (const region of allRegions) {
                    let regionImageUrl = region.regionImage;
                    let regionName = regionImageUrl.split("../images/")[1].replace(".jpeg", "");

                    for (let i = 1; i < 20; i++) {
                        let cityImage = `../../images/${regionName}${i}.jpeg`;
                        allCityImages.push(cityImage);
                    }
                }
                randomImage = Math.floor(allCityImages.length * Math.random());

                listItem.style.backgroundImage = `url("../${allCityImages[randomImage]}")`;
            }

            /*
            const listItemImage = document.createElement("img")
            listItemImage.setAttribute("src", `../${item.images}`);
            listItemImage.id = "listItemImage";
            listItem.appendChild(listItemImage);
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

            const itemType = event.target.parentElement.getAttribute("type");
            const itemId = event.target.parentElement.getAttribute("id");

            if (beenButton.classList.contains("beenClicked")) {
                state_handler.delete("been", item.id);
                beenButton.classList.remove("beenClicked");
            } else {
                state_handler.postItem("been", itemType, itemId);
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

            const itemType = event.target.parentElement.getAttribute("type");
            const itemId = item.id;

            console.log(itemId);


            if (likeButton.getAttribute("src") == "../../fonts/icons/favourite.png") {
                state_handler.postItem("liked", itemType, itemId);
                likeButton.setAttribute("src", "../../fonts/icons/favouritered.png");
            } else {
                state_handler.delete(item.id, "liked");
                likeButton.setAttribute("src", "../../fonts/icons/favourite.png");
            }
        })
    }
}