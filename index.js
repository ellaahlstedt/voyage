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
        regionsItem.style.backgroundImage = `url('images/${destination.regionImage} ')`  // Ska ändras la bara till för det visuella nu 

        let regionsText = document.createElement("h1");
        regionsText.classList = "regionsText";
        regionsText.textContent = destination.region.toUpperCase();

        regionsItem.appendChild(regionsText);
        parent.appendChild(regionsItem);
    }
}

const wrapper = document.querySelector("#wrapper");
// const destinations = state_handler.get("destinations");
// console.log(destinations);

renderNav(wrapper, "Regions");
renderHeader(wrapper, "Regions");

renderRegionsCon(wrapper);
renderFooter(wrapper);
