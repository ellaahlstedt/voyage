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
        
        let currentAmount = 0;
        let citiesAmount = [];
        for(let i = 0; i < 50; i++) {
            citiesAmount.push(allCities[i]);
            currentAmount = i;
        }
        
        renderListItem(citiesCon, citiesAmount, allCityImages);
        console.log(citiesCon)

        const buttonDiv = document.createElement("div");
        buttonDiv.id = "buttonDiv";
        parent.appendChild(buttonDiv);
        const pageButton = document.createElement("button");
        pageButton.textContent = "SHOW MORE";
        buttonDiv.appendChild(pageButton);

        pageButton.addEventListener("click", function test() {
            console.log("hej2");
            showMore(allCities, allCityImages, citiesCon);
        });
    }
    renderFooter(parent);
}

function showMore(allCities, allCityImages, citiesCon) {
    console.log(citiesCon)
    let currentAmount = document.getElementById("citiesCon").children.length;

    let citiesAmount = [];
    const endIndex = Math.min(currentAmount + 50, allCities.length);
    for(let i = currentAmount; i < endIndex; i++) {
	    citiesAmount.push(allCities[i]);
    }
    renderListItem(citiesCon, citiesAmount, allCityImages);
}

renderCitiesPage(wrapper);