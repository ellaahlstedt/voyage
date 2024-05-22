"use strict";

state_handler.runApp();

function renderRegionsCon(parent) {
    let regionsCon = document.createElement("div");
    regionsCon.id = "regionsCon";
    parent.appendChild(regionsCon);
}

function updateRegionsCon(regions) {
    parent = document.querySelector("#regionsCon");

    for (const region of regions) {

        let regionsItem = document.createElement("div");
        regionsItem.classList = "regionsItem";
        regionsItem.setAttribute("stateId", region.id);
        regionsItem.style.backgroundImage = `url("images/${region.regionImage}")`

        let regionsText = document.createElement("h1");
        regionsText.classList = "regionsText";
        regionsText.textContent = region.region.toUpperCase();

        regionsItem.appendChild(regionsText);
        parent.appendChild(regionsItem);

        regionsItem.addEventListener("click", function () {
            getToCountryOrCityPage(region.region, "region");
        })
    }
}

const wrapper = document.querySelector("#wrapper");

renderNav(wrapper, "Regions");
renderHeader(wrapper, "Regions");

renderRegionsCon(wrapper);
renderFooter(wrapper);