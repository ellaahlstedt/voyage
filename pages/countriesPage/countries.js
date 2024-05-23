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
    
    const url = window.location.href; 
    let regionParameter = null;

    if (url.includes("region=")) {
        regionParameter = url.split("region=")[1].replace("%20", " ");
    }

    if (regionParameter) {
        
        countriesCon.classList.add("filteredCountries");
        const filteredCountries = getDestinationsInRegionOrCountry(allRegions, allCountries, regionParameter, "region")
        console.log(filteredCountries);
        renderListItem(countriesCon, filteredCountries);

    } else {

        countriesCon.classList.add("allCountries");
        allCountries.sort(sortCountriesOrCities);
        
        renderListItem(countriesCon, allCountries);
    }
}

renderCountriesPage(wrapper);