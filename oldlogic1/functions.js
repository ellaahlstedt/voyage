"use strict";

function getDestinationsInRegionOrCountry (destinations, items, name, type) {
    let filteredDestinations = [];

    if (type == "region") {
        
        for (const destination of destinations) {
            if (destination.region == name) {
                for (const item of items) {
                    if (destination.id == item.region_id) {
                        filteredDestinations.push(item);
                    }
                }
            }

        }
    } else if (type == "country") {
        
        for (const destination of destinations) {
            if (destination.name == name) {
                for (const item of items) {
                    if (destination.id == item.country_id) {
                        filteredDestinations.push(item);
                    }
                }
            }

        } 
    }
    return filteredDestinations;

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