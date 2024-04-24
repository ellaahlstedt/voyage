function renderNav(parent, currentPage) {
    let nav = document.createElement("nav");
    nav.id = "mainPagesNav";
    parent.appendChild(nav);

    let navItems = document.createElement("div");
    navItems.id = "navItemsCon";
    nav.appendChild(navItems);

    renderLogo(navItems, "45px", "");

    let linksCon = document.createElement("div");
    linksCon.id = "linksCon";
    navItems.appendChild(linksCon);
    const links = [
        {
            name: "Regions",
            link: "./pages/landing/landing.html"
        },
        {
            name: "Countries",
            link: "./pages/countries/countries.html"
        },
        {
            name: "Cities",
            link: "./pages/cities/cities.html"
        }
    ];

    for (let item of links) {
        let a = document.createElement("a");
        a.textContent = item.name;
        a.classList.add("navLinks");
        a.setAttribute("href", item.link);
        if (item.name == currentPage) {
            a.style.fontWeight = "bold";
            let markerIcon = document.createElement("img");
            markerIcon.setAttribute("src", "./fonts/icons/marker.svg");
            markerIcon.setAttribute("alt", "Marker Icon");
            markerIcon.classList.add("markerIconNav");
            a.appendChild(markerIcon);
        }
        linksCon.appendChild(a);
    }

    let profileCon = document.createElement("div");
    profileCon.id = "navProfileCon";
    nav.appendChild(profileCon);

    let userIcon = document.createElement("img");
    userIcon.setAttribute("src", "./fonts/icons/user.png");
    userIcon.setAttribute("alt", "User Icon");
    userIcon.classList.add("userIconNav");
    profileCon.appendChild(userIcon);


}