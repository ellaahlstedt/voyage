"use strict";

async function renderListItem(parent, items, images) {

    const response = await fetch("../../logic/destinations.php?type=region");
    const allRegions = await response.json();

    for (const item of items) {

        const listItem = document.createElement("div");
        listItem.classList.add("listItem");

        let text = document.createElement("h1");
        text.id = "text";
        listItem.appendChild(text);

        if (parent.id == "countriesCon") {

            listItem.classList.add("countryItem");
            listItem.setAttribute("id", `${item.id}`);
            listItem.setAttribute("type", item.type);
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
            listItem.setAttribute("id", `${item.id}`);
            listItem.setAttribute("type", "city");
            text.textContent = item.name;

            const randomImage = Math.floor(images.length * Math.random());
            listItem.style.backgroundImage = `url("../${images[randomImage]}")`;
        };

        let data = await get_user("user");
        let user = state_handler.get("user");

        let beenButton = document.createElement("button");
        beenButton.id = "beenButton";
        beenButton.textContent = "BEEN";
        let getUserBeenId = user.been.find(been => been.id == listItem.id);
        if (getUserBeenId) {
            beenButton.classList.add("beenClicked");
        }
        listItem.appendChild(beenButton);

        beenButton.addEventListener("click", function (event) {
            event.preventDefault();

            if (beenButton.classList.contains("beenClicked")) {
                const gotUser = state_handler.get("user");
                const userId = gotUser.userId;
                const data = {
                    id: event.target.parentElement.getAttribute("id"),
                    userId: userId,
                    field: "been",
                    token: localStorage.getItem("token"),
                    type: item.type,
                    userName: localStorage.getItem("username")
                };
                state_handler.delete(data);
                beenButton.classList.remove("beenClicked");
            } else {
                let entity;

                if (item.type === "country") entity = "countries";
                else if (item.type === "city") entity = "cities";


                state_handler.postItem("been", item.id, entity);
                beenButton.classList.add("beenClicked");
            }

        })

        let likeButton = document.createElement("img");
        likeButton.id = "likeButton";

        let getUserLikedId = user.been.find(liked => liked.id == listItem.id);
        if (getUserLikedId) {
            likeButton.setAttribute("src", "../../fonts/icons/favouritered.png");
        } else {
            likeButton.setAttribute("src", "../../fonts/icons/favourite.png");
        }

        listItem.appendChild(likeButton);

        parent.appendChild(listItem);

        likeButton.addEventListener("click", function (event) {
            event.preventDefault();


            if (likeButton.getAttribute("src") == "../../fonts/icons/favourite.png") {
                let entity;
                if (item.type === "country") entity = "countries";
                else if (item.type === "city") entity = "cities";

                state_handler.postItem("liked", item.id, entity);
                likeButton.setAttribute("src", "../../fonts/icons/favouritered.png");
            } else {


                const userName = localStorage.getItem("username");
                const token = localStorage.getItem("token");
                const gotUser = state_handler.get("user");
                const userId = gotUser.userId;




                let data = {
                    userId: userId,
                    userName: userName,
                    field: "liked",
                    token: token,
                    type: item.type,
                    id: item.id
                }


                state_handler.delete(data);
                likeButton.setAttribute("src", "../../fonts/icons/favourite.png");
            }
        })
    }
}