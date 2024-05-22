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
        regionsText.textContent = region.name.toUpperCase();

        regionsItem.appendChild(regionsText);
        parent.appendChild(regionsItem);

        regionsItem.addEventListener("click", function () {
            getToCountryOrCityPage(region.name, "region");
        })
    }
}

const wrapper = document.querySelector("#wrapper");

renderNav(wrapper, "Regions");
renderHeader(wrapper, "Regions");

renderRegionsCon(wrapper);
renderFooter(wrapper);

/*async function test() {

    const body = {

        userName: "hej1",
        field: "liked",
        token: "58d1fd74a497b7647e6d1c629614e15d1023f742",
        type: "countries",
        id: 2
    }

    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        }
        ,
        body: JSON.stringify(body)
    }
    const response = await fetch("./logic/destinations.php", options)
    const resource = await response.json();
    console.log(resource);
}

test();*/


