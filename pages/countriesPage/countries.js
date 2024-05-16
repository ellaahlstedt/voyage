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

    const destinations = await fetch_handler("../../logic/destinations.php");
    const regionName = window.location.href.split("region=")[1].replace("%20", " "); // Adams kod
    const filteredRegion = getDestinationsInRegionOrCountry(destinations, regionName)
    
    renderListItem(countriesCon, filteredRegion.countries);

    /*
    const allCountries = [];
    
    for (const destination of destinations) {
        for (const country of destination.countries) {
            allCountries.push(country);
        }
    }
    
    const url = window.location.href;
    const regionName = window.location.href.split("region=")[1].replace("%20", " "); // Adams kod
    console.log(regionName);
   
    if (regionName) {
        const regionCountries = getDestinationsInRegionOrCountry(destinations, regionName)
        filterCountriesByRegion(countriesCon, regionCountries)
    } else {
        renderListItem(countriesCon, allCountries);
    }    
    */
}

/*
function filterCountriesByRegion (countriesCon, regionCountries) {

    countriesCon.innerHTML = "";
    renderListItem(countriesCon, regionCountries);
}
*/

renderCountriesPage(wrapper);