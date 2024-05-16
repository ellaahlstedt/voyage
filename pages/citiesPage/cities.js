"use strict"

if (window.localStorage.getItem("username") === null || window.localStorage.getItem("token") === null) {
    window.location.href = "../loginPage/login.html";
}

async function renderCitiesPage(parent) {
    
    const citiesCon = document.createElement('div');
    citiesCon.id = "citiesCon";

    renderNav(parent, 'Cities');
    renderHeader(parent, 'Cities');
    parent.appendChild(citiesCon);
    renderFooter(parent);

    const destinations = await fetch_handler("../../logic/destinations.php");
    const countryName = window.location.href.split("country=")[1].replace("%20", " ");
    const filteredCountry = getDestinationsInRegionOrCountry(destinations, countryName, "country");
    
    renderListItem(citiesCon, filteredCountry.cities, filteredCountry.images);
    console.log(filteredCountry.cities);
}

renderCitiesPage(wrapper);