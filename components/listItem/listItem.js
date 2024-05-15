"use strict";

function renderListItem (parent) {
    
    for (let i = 0; i < 5; i++) {
        
        const listItem = document.createElement("div");
        listItem.id = "listItem";
        listItem.style.backgroundImage = "url('../../images/albania.jpeg')" // Ändras

        if (parent.id == "countriesCon") {
            listItem.classList.add("countryItem")
        } else (
            listItem.classList.add("cityItem")
        );
        
        let text = document.createElement("h1");
        text.id = "text";
        text.textContent = "Albania"; // Ändras
        listItem.appendChild(text);

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