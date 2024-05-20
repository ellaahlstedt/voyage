"use strict";

function getDestinationsInRegionOrCountry (destinations, name, type) {
    let filteredDestination;

    for (const region of destinations) {
        
        if (type == "region" && region.region == name) {
            filteredDestination = region;

        } else if (type == "country") {
            for (const country of region.countries) {
                if (country.name == name) {
                    filteredDestination = country;
                    break;
                }
            }
        }
    }
    return filteredDestination;
}

function getToCountryOrCityPage(name, type) {
    let destinationPageLink;

    if (type == "region") {
        destinationPageLink = window.location.href.toLowerCase().includes("pages") ? "../countriesPage/countries.html" : "./pages/countriesPage/countries.html";
    } else if (type == "country") {
        destinationPageLink = window.location.href.toLowerCase().includes("pages") ? "../citiesPage/cities.html" : "./pages/citiesPage/cities.html";
    }

    const destinationLink = `${destinationPageLink}?${type}=${name}`;
    window.location.href = destinationLink;
}

function sortCountriesOrCities(a, b) {
    if (b.name < a.name) {
        return 1;
    } else {
        return -1;
    }
}