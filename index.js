"use strict";

function renderRegionsCon (parent) {
    let regionsCon = document.createElement("div");
    regionsCon.id = "regionsCon";
    parent.appendChild(regionsCon);

    for (let i = 0; i < 7; i++) {
        let regionsItem = document.createElement("div");
        regionsItem.classList = "regionsItem";
        regionsItem.style.backgroundImage = "url('images/cyprus.jpeg')"  // Ska ändras la bara till för det visuella nu 

        let regionsText = document.createElement("h1");
        regionsText.classList = "regionsText";
        regionsText.textContent = "REGIONS"
        
        regionsItem.appendChild(regionsText);
        regionsCon.appendChild(regionsItem);
    }
}

const wrapper = document.querySelector("#wrapper");

renderNav(wrapper, "Regions");
renderHeader(wrapper, "Regions");

renderRegionsCon(wrapper);
renderFooter(wrapper);