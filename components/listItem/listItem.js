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

            /*
            let allCityImages = [];
 
            for (const region of allRegions) {
                let regionImageUrl = region.regionImage;
                let regionName = regionImageUrl.split("../images/")[1].replace(".jpeg", "");
                
                for (let i = 1; i < 20; i++) {
                    let cityImage = `../../images/${regionName}${i}.jpeg`;
                    allCityImages.push(cityImage);
                }
            }
            const randomImage = Math.floor(images.length * Math.random());
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
                const data = {
                    id: event.target.parentElement.getAttribute("id"),
                    userId: localStorage.getItem("userId"),
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
                console.log(entity);

                state_handler.postItem("been", item.id, entity);
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