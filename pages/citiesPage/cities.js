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
    const url = window.location.href;
    let countryParameter = null;
    
    if (url.includes("country=")) {
        countryParameter = url.split("country=")[1].replace("%20", " "); // Adams kod
    }
    
    if (countryParameter) {
        
        const filteredCountry = getDestinationsInRegionOrCountry(destinations, countryParameter, "country");
        filteredCountry.cities.sort(sortCountriesOrCities);
        
        for (const destination of destinations) {
            for (const country of destination.countries) {
                if (country.name == countryParameter) {
                    renderListItem(citiesCon, filteredCountry.cities, destination.cityImages);
                }
            }
        }
        
    } else {
        const allCities = [];

        for (const destination of destinations) {
            for (const country of destination.countries) {
                for (const city of country.cities) {
                    allCities.push(city);
                }
            }
        }

        let allCityImages = [];

        for (const destination of destinations) {
            for (const cityImage of destination.cityImages) {
                allCityImages.push(cityImage);
            }
        }

        allCities.sort(sortCountriesOrCities);
        renderListItem(citiesCon, allCities, allCityImages);
    }
}

renderCitiesPage(wrapper);