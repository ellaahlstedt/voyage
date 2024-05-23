"use strict";
async function renderBeenFavLists(parent, title, listType, user, beenClicked = false) {

    let listBox = document.createElement("div");
    listBox.className = "listBox";
    parent.appendChild(listBox);

    let h1 = document.createElement("h1");
    h1.textContent = title;
    listBox.appendChild(h1);

    let titleSingle = "";
    switch (title) {
        case "Regions":
            titleSingle = "region";
            break;
        case "Countries":
            titleSingle = "country";
            break; case "Cities":
            titleSingle = "city";
            break;
    }
    let list = document.createElement("ul");
    list.id = "list" + listType + titleSingle;
    list.classList.add("lists")
    listBox.appendChild(list);


    if (listType === "been") {
        const userBeenList = user.been;
        renderBoxListItem(list, userBeenList, listType, user.userId, beenClicked);
    } else if (listType === "liked") {
        const userLikedList = user.liked;
        renderBoxListItem(list, userLikedList, listType, user.userId, beenClicked);
    }
    console.log(user.been);
}

function renderBoxListItem(parent, list, listType, userId, beenClicked = false) {
    console.log(list);
    for (let item of list) {
        let li = document.createElement("li");
        li.classList.add("listItem");

        let listItemText = document.createElement("p");
        listItemText.classList.add("listItemText");
        listItemText.textContent = item.name;

        const user = state_handler.get("user");
        let trashCan = document.createElement("img");
        let heartIcon = document.createElement("img");
        if (listType === "been") {
            trashCan.setAttribute("src", "../../fonts/icons/trashcan.png");
            trashCan.setAttribute("alt", "Trashcan");
            trashCan.id = "trash_" + item.id;
            trashCan.classList.add("trashcan");
            if (!beenClicked) {
                trashCan.classList.add("trashcanHide");
            }
            trashCan.addEventListener("click", async function removeItem(event) {
                const data = {
                    userId: userId,
                    userName: localStorage.getItem("username"),
                    field: listType,
                    token: localStorage.getItem("token"),
                    type: item.type,
                    id: item.id,
                };
                state_handler.delete(data);
                let updateUser = await get_user("page");
                const newUser = state_handler.get("user");

                const parent = document.querySelector(`#listConbeen`);
                parent.innerHTML = "";
                renderBeenFavLists(parent, "Regions", listType, newUser, true)
                renderBeenFavLists(parent, "Countries", listType, newUser, true);
                renderBeenFavLists(parent, "Cities", listType, newUser, true);
            });
        } else if (listType === "liked") {
            heartIcon.setAttribute("src", "../../fonts/icons/favouritered.png");
            heartIcon.setAttribute("alt", "Heart Icon");
            heartIcon.id = "heartIcon_" + item.id;
            heartIcon.classList.add("heartIcon");
            heartIcon.addEventListener("click", async function removeItem(event) {
                const data = {
                    userId: userId,
                    userName: localStorage.getItem("username"),
                    field: listType,
                    token: localStorage.getItem("token"),
                    type: item.type,
                    id: item.id,
                };
                state_handler.delete(data);
                let updateUser = await get_user("page");
                const newUser = state_handler.get("user");

                const parent = document.querySelector(`#listConliked`);
                parent.innerHTML = "";
                renderBeenFavLists(parent, "Regions", listType, newUser)
                renderBeenFavLists(parent, "Countries", listType, newUser);
                renderBeenFavLists(parent, "Cities", listType, newUser);
            });
        }

        if (parent.id.includes(item.type) && item.type === "region") {
            parent.appendChild(li);
            li.appendChild(listItemText);
            if (listType === "been") {
                li.appendChild(trashCan);
            } else if (listType === "liked") {
                li.appendChild(heartIcon);
            }
        } else if (parent.id.includes(item.type) && item.type === "country") {
            parent.appendChild(li);
            li.appendChild(listItemText);
            if (listType === "been") {
                li.appendChild(trashCan);
            } else if (listType === "liked") {
                li.appendChild(heartIcon);
            }
        } else if (parent.id.includes(item.type) && item.type === "city") {
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
    listCon.id = "listCon" + listType;
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

    const user = state_handler.get("user");
    renderBeenFavLists(listCon, "Regions", listType, user);
    renderBeenFavLists(listCon, "Countries", listType, user);
    renderBeenFavLists(listCon, "Cities", listType, user);
}