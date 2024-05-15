"use strict";

state_handler.runApp();

function renderRegionsCon(parent) {
    let regionsCon = document.createElement("div");
    regionsCon.id = "regionsCon";
    parent.appendChild(regionsCon);
}

function updateRegionsCon(destinations) {
    parent = document.querySelector("#regionsCon");
    
    for (let i = 0; i < destinations.length; i++) {
        let destination = destinations[i];
        console.log(destination);

        let regionsItem = document.createElement("div");
        regionsItem.classList = "regionsItem";
        regionsItem.style.backgroundImage = `url('images/${destination.regionImage}')`

        let regionsText = document.createElement("h1");
        regionsText.classList = "regionsText";
        regionsText.textContent = destination.region.toUpperCase();

        regionsItem.appendChild(regionsText);
        parent.appendChild(regionsItem);
    }
}

/*
const regionsItems = document.querySelector(".regionsItem");

for (let i = 0; i < regionsItems.length; i++) {
    let regionsItem = regionsItems[i];
    regionsItem.addEventListener("click");
}
*/

const wrapper = document.querySelector("#wrapper");

renderNav(wrapper, "Regions");
renderHeader(wrapper, "Regions");

renderRegionsCon(wrapper);
renderFooter(wrapper);
