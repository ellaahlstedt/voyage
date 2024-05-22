"use strict"

if (window.localStorage.getItem("username") === null || window.localStorage.getItem("token") === null) {
    window.location.href = "../loginPage/login.html";
}

async function renderCountriesPage (parent) {
    
    const countriesCon = document.createElement("div");
    countriesCon.id = "countriesCon";

    renderNav(parent, 'Countries');
    renderHeader(parent, 'Countries');
    parent.appendChild(countriesCon);
    renderFooter(parent);

    const allCountries = await fetch_handler("../../logic/destinations.php?type=country");
    const allRegions = await fetch_handler("../../logic/destinations.php?type=region");
    
    renderListItem(countriesCon, allCountries);

    /*
    const url = window.location.href; 
    let regionParameter = null;

    if (url.includes("region=")) {
        regionParameter = url.split("region=")[1].replace("%20", " "); // Adams kod
    }
    
    if (regionParameter) {
        
        countriesCon.classList.add("filteredCountries");
        const filteredRegion = getDestinationsInRegionOrCountry(destinations, regionParameter, "region")
        filteredRegion.countries.sort(sortCountriesOrCities);

        renderListItem(countriesCon, filteredRegion.countries);

    } else {
        const allCountries = [];

        for (const destination of destinations) {
            for (const country of destination.countries) {
                allCountries.push(country);
            }
        }

        countriesCon.classList.add("allCountries");
        allCountries.sort(sortCountriesOrCities);
        renderListItem(countriesCon, allCountries);
    }
    */
}

renderCountriesPage(wrapper);