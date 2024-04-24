function renderNav(parent, currentPage) {
    let nav = document.createElement("nav");
    nav.id = "mainPagesNav";
    nav.classList.add("sticky");
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
            link: "./"
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
    profileCon.addEventListener("click", dropDownNav);
    nav.appendChild(profileCon);

    // Får ändras senare
    let username = document.createElement("p");
    username.textContent = "username";
    username.classList.add("usernameNav");
    profileCon.appendChild(username);

    let userIcon = document.createElement("img");
    userIcon.setAttribute("src", "./fonts/icons/user.png");
    userIcon.setAttribute("alt", "User Icon");
    userIcon.classList.add("userIconNav");
    profileCon.appendChild(userIcon);

}

// Drop-down
// Profile & Log out
function dropDownNav(event) {
    let profileCon = document.querySelector("#navProfileCon");

    let dropDownCon = document.createElement("ul");
    dropDownCon.id = "dropDownNav";
    profileCon.appendChild(dropDownCon);

    let profileListItem = document.createElement("li");
    dropDownCon.appendChild(profileListItem);

    let LogOutListItem = document.createElement("li");
    dropDownCon.appendChild(LogOutListItem);

    let profileLink = document.createElement("a");
    profileLink.setAttribute("href", "./pages/logIn/logIn.html");
    profileLink.textContent = "Profile";
    profileListItem.appendChild(profileLink);

}

