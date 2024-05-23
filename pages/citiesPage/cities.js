"use strict";

if (window.localStorage.getItem("username") === null || window.localStorage.getItem("token") === null) {
    window.location.href = "../loginPage/login.html";
}

async function renderCitiesPage(parent) {
    const citiesCon = document.createElement("div");
    citiesCon.id = "citiesCon";

    renderNav(parent, "Cities");
    renderHeader(parent, "Cities");
    parent.appendChild(citiesCon);

    const allCities = await fetch_handler("../../logic/destinations.php?type=city");
    const allCountries = await fetch_handler("../../logic/destinations.php?type=country");
    const allRegions = await fetch_handler("../../logic/destinations.php?type=region");

    const url = window.location.href;
    let countryParameter = null;

    if (url.includes("country=")) {
        countryParameter = url.split("country=")[1].replace("%20", " ");
    }

    let cityImages = [];

    if (countryParameter) {
        const filteredCities = getDestinationsInRegionOrCountry(allCountries, allCities, countryParameter, "country");

        let filteredRegion = getRegion(allRegions, allCountries, countryParameter);

        let regionImageUrl = filteredRegion.regionImage;
        let regionName = regionImageUrl.split("../images/")[1].replace(".jpeg", "");

        for (let i = 1; i <= 20; i++) {
            let cityImage = `../images/${regionName}${i}.jpeg`;
            cityImages.push(cityImage);
        }

        renderListItem(citiesCon, filteredCities, cityImages);

    } else {
        allCities.sort(sortCountriesOrCities);

        let currentAmount = 0;
        let citiesAmount = [];
        for (let i = 0; i < 50; i++) {
            citiesAmount.push(allCities[i]);
            currentAmount = i;
        }

        for (const region of allRegions) {
            let regionImageUrl = region.regionImage;
            let regionName = regionImageUrl.split("../images/")[1].replace(".jpeg", "");

            for (let i = 1; i <= 20; i++) {
                let cityImage = `../images/${regionName}${i}.jpeg`;
                cityImages.push(cityImage);
            }
        }

        renderListItem(citiesCon, citiesAmount, cityImages);

        const buttonDiv = document.createElement("div");
        buttonDiv.id = "buttonDiv";
        parent.appendChild(buttonDiv);
        const pageButton = document.createElement("button");
        pageButton.textContent = "SHOW MORE";
        buttonDiv.appendChild(pageButton);

        pageButton.addEventListener("click", function test() {
            showMore(allCities, cityImages, citiesCon);
        });
    }
    renderFooter(parent);
}

function showMore(allCities, allCityImages, citiesCon) {
    let currentAmount = document.getElementById("citiesCon").children.length;

    let citiesAmount = [];
    const endIndex = Math.min(currentAmount + 50, allCities.length);
    for (let i = currentAmount; i < endIndex; i++) {
        citiesAmount.push(allCities[i]);
    }
    renderListItem(citiesCon, citiesAmount, allCityImages);

    if (currentAmount + 50 >= allCities.length) {
        document.getElementById("buttonDiv").style.display = "none";
    }
}

renderCitiesPage(wrapper);