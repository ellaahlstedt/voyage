"use strict";

function renderBeenFavLists(parent, title) {
    let listBox = document.createElement("div");
    listBox.className = "listBox";
    parent.appendChild(listBox);

    let h1 = document.createElement("h1");
    h1.textContent = title;
    listBox.appendChild(h1);

    let list = document.createElement("ul");
    listBox.appendChild(list);
}

function li(parent, item) {
    let li = docuemnt.createElement("li").textContent = item.name;
    li.id = item.id;
    parent.appendChild(li);
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

    let unbeenButton = document.createElement("div");
    unbeenButton.id = "unbeenButton";
    unbeenButton.textContent = "UN-BEEN";
    if (containerId === "beenList") {
        beenFavCon.appendChild(unbeenButton);
    }

    /*
    unbeenButton.addEventListener("click", function () {
        let trashCan = document.createElement("img");
        trashCan.setAttribute = ("src", "../../fonts/icons/trashcan.png");
        li.appendChild(trashCan);

        trashCan.addEventListener("click", async (event) => {
            const option = {
                method:'DELETE',
                header: {"Content-Type": "application/json"},
                body: {}
            }
            let resource = await fetch_handler(url, option);
            state_handler.delete(resource.id, );
        })
    })
    */

    renderBeenFavLists(listCon, "Regions");
    renderBeenFavLists(listCon, "Countries");
    renderBeenFavLists(listCon, "Cities");
}