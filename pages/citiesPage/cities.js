"use strict"

if (window.localStorage.getItem("username") === null || window.localStorage.getItem("token") === null) {
    window.location.href = "../loginPage/login.html";
}

function renderCitiesPage(parent) {
    const citiesCon = document.createElement('div');
    citiesCon.id = "citiesCon";

    //render NAV and header
    renderNav(wrapper, 'Cities');
    renderHeader(wrapper, 'Cities');

    //render Container for Cities, css breaks after 12 items
    parent.appendChild(citiesCon);

    // renderListItem(); för alla items. CSS is finished. REMOVE border from citiesCon
    renderListItem(citiesCon);
    //render footer

    renderFooter(wrapper);

}

renderCitiesPage(wrapper);