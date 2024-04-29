"use strict"

function renderCitiesPage(parent) {
    const div = document.createElement('div');
    div.id = "citiesCon";

    //render NAV and header
    renderNav(wrapper, 'Cities');
    renderHeader(wrapper, 'Cities');

    //render Container for Cities, css breaks after 12 items
    parent.appendChild(div);

    // renderListItem(); för alla items. CSS is finished. REMOVE border from citiesCon

    //render footer

    renderFooter(wrapper);

}

renderCitiesPage(wrapper);