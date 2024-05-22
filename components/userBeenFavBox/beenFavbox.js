"use strict";
async function renderBeenFavLists(parent, title, listType) {
    const data = await state_handler.runAppRegions();
    let listBox = document.createElement("div");
    listBox.className = "listBox";
    parent.appendChild(listBox);

    let h1 = document.createElement("h1");
    h1.textContent = title;
    listBox.appendChild(h1);

    let list = document.createElement("ul");
    list.id = "list" + listType + title;
    list.classList.add("lists")
    listBox.appendChild(list);

    const user = state_handler.get("user");
    let regions = state_handler.get("regions");
    let regionsAdded = [];
    if (listType === "been") {
        const userBeenList = user.been;

        for (let i = 0; i < userBeenList.length; i++) {
            if (userBeenList[i].region_id) {
                let currentRegion = regions.find((region) => region.id == userBeenList[i].region_id);
                renderBoxListItem(list, currentRegion, listType);
            }
            renderBoxListItem(list, userBeenList[i], listType);

        }
    } else if (listType === "liked") {
        const userLikedList = user.liked;
        for (let i = 0; i < userLikedList.length; i++) {
            if (userLikedList[i].region_id) {
                let currentRegion = regions.find((region) => region.id == userLikedList[i].region_id);
                if (!regionsAdded.includes(currentRegion)) {
                    renderBoxListItem(list, currentRegion, listType);
                    regionsAdded.push(currentRegion);
                }

            }
            renderBoxListItem(list, userLikedList[i], listType);
        }
    }
}

function renderBoxListItem(parent, item, listType) {

    let li = document.createElement("li");
    li.classList.add("listItem");

    let listItemText = document.createElement("p");
    listItemText.classList.add("listItemText");
    listItemText.textContent = item.name;

    let trashCan = document.createElement("img");
    let heartIcon = document.createElement("img");
    if (listType === "been") {
        trashCan.setAttribute("src", "../../fonts/icons/trashcan.png");
        trashCan.setAttribute("alt", "Trashcan");
        trashCan.id = "trash_" + item.id;
        trashCan.classList.add("trashcan");
        trashCan.classList.add("trashcanHide");
        trashCan.addEventListener("click", function removeItem(event) {
            const data = {
                userId: localStorage.getItem("userId"), //ändra
                userName: localStorage.getItem("username"),
                field: listType,
                token: localStorage.getItem("token"),
                type: item.type,
                id: item.id,
            };
            if (!item.type) data.type = "region";
            console.log(data);
            // state_handler.delete(item);
        });
    } else if (listType === "liked") {
        heartIcon.setAttribute("src", "../../fonts/icons/favouritered.png");
        heartIcon.setAttribute("alt", "Heart Icon");
        heartIcon.id = "heartIcon_" + item.id;
        heartIcon.classList.add("heartIcon");
        heartIcon.addEventListener("click", function removeItem(event) {
            const data = {
                // ändra
            };
            // state_handler.delete(data);
        });
    }

    const parentIdRegion = parent.id.includes("Regions");
    const parentIdCountry = parent.id.includes("Countries");
    const parentIdCities = parent.id.includes("Cities");
    if (parentIdRegion) {
        if (!item.type) {

            parent.appendChild(li);
            li.appendChild(listItemText);
            if (listType === "been") {
                li.appendChild(trashCan);
            } else if (listType === "liked") {
                li.appendChild(heartIcon);
            }
        }
    } else if (parentIdCountry) {
        if (item.type === "country") {
            parent.appendChild(li);
            li.appendChild(listItemText);
            if (listType === "been") {
                li.appendChild(trashCan);
            } else if (listType === "liked") {
                li.appendChild(heartIcon);
            }
        }
    } else if (parentIdCities) {
        if (item.type === "city") {
            parent.appendChild(li);
            li.appendChild(listItemText);
            if (listType === "been") {
                li.appendChild(trashCan);
            } else if (listType === "liked") {
                li.appendChild(heartIcon);
            }
        }
    }

}

function renderBeenfavCon(parent, type, containerId) {
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

    let listType = "";
    if (type === "beenList") {
        h1.textContent = "BEEN";
        icon.setAttribute("src", "../../fonts/icons/marker.svg");
        listType = "been";
    } else if (type === "wishlistList") {
        h1.textContent = "WISHLIST";
        icon.setAttribute("src", "../../fonts/icons/favouritered.png");
        listType = "liked";
    }
    titleBox.appendChild(h1);
    titleBox.appendChild(icon);

    let listCon = document.createElement("div");
    listCon.className = "listCon";
    beenFavCon.appendChild(listCon);

    let unbeenButton = document.createElement("div");
    unbeenButton.id = "unbeenButton";
    unbeenButton.textContent = "UN-BEEN";
    if (containerId === "beenList") {
        beenFavCon.appendChild(unbeenButton);
    }
    unbeenButton.addEventListener("click", function () {
        let trashcans = document.querySelectorAll(".trashcan");
        for (let trashcan of trashcans) {
            if (trashcan.classList.contains("trashcanHide")) {
                trashcan.classList.remove("trashcanHide");
            } else {
                trashcan.classList.add("trashcanHide");
            }
        }
    })

    renderBeenFavLists(listCon, "Regions", listType);
    renderBeenFavLists(listCon, "Countries", listType);
    renderBeenFavLists(listCon, "Cities", listType);
}