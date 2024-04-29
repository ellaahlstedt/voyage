function renderNav(parent, currentPage) {
    let nav = document.createElement("nav");
    nav.id = "mainPagesNav";
    nav.classList.add("sticky");
    parent.appendChild(nav);

    let navItems = document.createElement("div");
    navItems.id = "navItemsCon";
    nav.appendChild(navItems);

    renderLogo(navItems, "42", "");

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
            link: "./pages/countriesPage/countries.html"
        },
        {
            name: "Cities",
            link: "./pages/citiesPage/cities.html"
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

    let UserCon = document.createElement("div");
    UserCon.id = "navUserCon";
    profileCon.appendChild(UserCon);

    // Får ändras senare till localstorage username
    let username = document.createElement("p");
    username.textContent = "username";
    username.classList.add("usernameNav");
    UserCon.appendChild(username);

    let userIcon = document.createElement("img");
    userIcon.setAttribute("src", "./fonts/icons/user.png");
    userIcon.setAttribute("alt", "User Icon");
    userIcon.classList.add("userIconNav");
    UserCon.appendChild(userIcon);

    let dropDownCon = document.createElement("ul");
    dropDownCon.id = "dropDownNav";
    profileCon.appendChild(dropDownCon);
}

let profileConClicked = false;
function dropDownNav(event) {
    if (profileConClicked) {
        profileConClicked = false;
        let dropDown = document.querySelector("#dropDownNav");
        dropDown.innerHTML = "";
    } else {
        profileConClicked = true;
        let dropDownCon = document.querySelector("#dropDownNav");

        let profileListItem = document.createElement("li");
        dropDownCon.appendChild(profileListItem);

        let LogOutListItem = document.createElement("li");
        dropDownCon.appendChild(LogOutListItem);

        let profileLink = document.createElement("a");
        profileLink.setAttribute("href", "./pages/logIn/logIn.html");
        profileLink.textContent = "Profile";
        profileListItem.appendChild(profileLink);

        let logOut = document.createElement("p");
        logOut.textContent = "Log Out";
        logOut.addEventListener("click", logOut);
        LogOutListItem.appendChild(logOut);
    }
}

function logOut() {
    // clear localstorage
}

