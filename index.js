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
        regionsItem.setAttribute("state_id", destination.id);
        regionsItem.style.backgroundImage = `url("images/${destination.regionImage}")`

        let regionsText = document.createElement("h1");
        regionsText.classList = "regionsText";
        regionsText.textContent = destination.region.toUpperCase();

        regionsItem.appendChild(regionsText);
        parent.appendChild(regionsItem);

        regionsItem.addEventListener("click", function () {
            getToCountriesPage(destination.region);
        })
    }
}

function getToCountriesPage(region) {
    const countriesPageLink = window.location.href.toLowerCase().includes("pages") ? "../countriesPage/countries.html" : "./pages/countriesPage/countries.html";
    const destinationLink = `${countriesPageLink}?region=${region}`;
    window.location.href = destinationLink;;
}

const wrapper = document.querySelector("#wrapper");

renderNav(wrapper, "Regions");
renderHeader(wrapper, "Regions");

renderRegionsCon(wrapper);
renderFooter(wrapper);