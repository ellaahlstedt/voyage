"use strict";

function getDestinationsInRegionOrCountry (destinations, name) {
    let destinationsInCountryOrCity;

    for (const destination of destinations) {
        if (destination.region == name) {
            destinationsInCountryOrCity = destination;
            break;
        }
    }
    
    return destinationsInCountryOrCity;
}