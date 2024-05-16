"use strict";

state_handler.runApp();

function renderRegionsCon(parent) {
    let regionsCon = document.createElement("div");
    regionsCon.id = "regionsCon";
    parent.appendChild(regionsCon);
}

function updateRegionsCon(destinations) {
    parent = document.querySelector("#regionsCon");

    for (const destination of destinations) {

        let regionsItem = document.createElement("div");
        regionsItem.classList = "regionsItem";
        regionsItem.setAttribute("stateId", destination.id);
        regionsItem.style.backgroundImage = `url("images/${destination.regionImage}")`

        let regionsText = document.createElement("h1");
        regionsText.classList = "regionsText";
        regionsText.textContent = destination.region.toUpperCase();

        regionsItem.appendChild(regionsText);
        parent.appendChild(regionsItem);

        regionsItem.addEventListener("click", function () {
            getToCountryOrCityPage(destination.region, "region");
        })
    }
}

const wrapper = document.querySelector("#wrapper");

renderNav(wrapper, "Regions");
renderHeader(wrapper, "Regions");

renderRegionsCon(wrapper);
renderFooter(wrapper);