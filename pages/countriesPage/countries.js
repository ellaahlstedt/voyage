"use strict"


if (window.localStorage.getItem("username") === null || window.localStorage.getItem("token") === null) {
    window.location.href = "../loginPage/login.html";
}

function renderCountriesPage(parent) {
    const countriesCon = document.createElement('div');
    countriesCon.id = "countriesCon";

    //render NAV and header
    renderNav(wrapper, 'Countries');
    renderHeader(wrapper, 'Countries');

    //render Container for Cities, css breaks after 12 items
    parent.appendChild(countriesCon);

    // renderListItem(); för alla items. CSS is finished. REMOVE border from citiesCon
    renderListItem(countriesCon);
    //render footer

    renderFooter(wrapper);

}

renderCountriesPage(wrapper);