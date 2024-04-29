"use strict"

function renderCountriesPage(parent) {
    const div = document.createElement('div');
    div.id = "countriesCon";

    //render NAV and header
    renderNav(wrapper, 'Countries');
    renderHeader(wrapper, 'Countries');

    //render Container for Cities, css breaks after 12 items
    parent.appendChild(div);

    // renderListItem(); för alla items. CSS is finished. REMOVE border from citiesCon

    //render footer

    renderFooter(wrapper);

}

renderCountriesPage(wrapper);