function renderNav(parent, currentPage) {

    let imgSrc = window.location.href.toLowerCase().includes("pages") ? "../../fonts/icons/user.png" : "./fonts/icons/user.png";

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
            link: window.location.href.toLowerCase().includes("pages") ? "../../" : "./"
        },
        {
            name: "Countries",
            link: window.location.href.toLowerCase().includes("pages") ? "../countriesPage/countries.html" : "./pages/countriesPage/countries.html"
        },
        {
            name: "Cities",
            link: window.location.href.toLowerCase().includes("pages") ? "../citiesPage/cities.html" : "./pages/citiesPage/cities.html"
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
            const markerSrc = window.location.href.toLowerCase().includes("pages") ? "../../fonts/icons/marker.svg" : "./fonts/icons/marker.svg";
            markerIcon.setAttribute("src", markerSrc);
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
    username.textContent = window.localStorage.getItem("username");
    username.classList.add("usernameNav");
    UserCon.appendChild(username);

    let userIcon = document.createElement("img");
    userIcon.setAttribute("src", imgSrc);
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

        let settingsListItem = document.createElement("li");
        dropDownCon.appendChild(settingsListItem);

        let logOutListItem = document.createElement("li");
        dropDownCon.appendChild(logOutListItem);

        let profileLink = document.createElement("a");
        const userSrc = window.location.href.toLowerCase().includes("pages") ? "../../pages/userPage/user.html" : "./pages/userPage/user.html";
        profileLink.setAttribute("href", userSrc);
        profileLink.textContent = "Profile";
        profileListItem.appendChild(profileLink);

        let settings = document.createElement("p");
        settings.textContent = "Settings";
        settings.id = "navSettings";
        settings.addEventListener("click", settingsPopup);
        settingsListItem.appendChild(settings);


        let settingsIcon = document.createElement("img");
        let settingsSrc = window.location.href.toLowerCase().includes("pages") ? "../../fonts/icons/settings.png" : "./fonts/icons/settings.png";
        settingsIcon.setAttribute("src", settingsSrc);
        settingsIcon.setAttribute("alt", "Cogwheel");
        settingsIcon.id = "navSettingsIcon";
        settingsIcon.addEventListener("click", settingsPopup);
        settingsListItem.appendChild(settingsIcon);

        let logOut = document.createElement("p");
        logOut.textContent = "Log Out";
        logOut.id = "navLogout";
        logOut.addEventListener("click", logOut_event);
        logOutListItem.appendChild(logOut);
    }
}

function logOut_event() {
    // clear localstorage
    window.localStorage.clear();
    window.location.reload();
}

function updateUsername() {
    // patch
}

function settingsPopup() {
    // parent
    let wrapper = document.querySelector("#wrapper");
    let parent = document.createElement("div");
    parent.id = "settingsPopupCon";
    wrapper.appendChild(parent);

    // container
    let settingsPopupCon = document.createElement("form");
    settingsPopupCon.id = "settingsPopupForm";
    parent.appendChild(settingsPopupCon);

    // exit icon
    let exitIcon = document.createElement("img");
    let exitIconSrc = window.location.href.toLowerCase().includes("pages") ? "../../fonts/icons/close.png" : "./fonts/icons/close.png";
    exitIcon.setAttribute("src", exitIconSrc);
    exitIcon.setAttribute("alt", "Exit Icon");
    exitIcon.id = "popupExitIcon";
    exitIcon.addEventListener("click", settingsPopupClose);
    settingsPopupCon.appendChild(exitIcon);

    // h2
    let settingsPopupHeader = document.createElement("h2");
    settingsPopupHeader.textContent = "Change Username";
    settingsPopupHeader.id = "settingsPopupHeader";
    settingsPopupCon.appendChild(settingsPopupHeader);

    // label & input
    let settingsPopupInputCon = document.createElement("div");
    settingsPopupInputCon.id = "settingsPopupInputCon";
    settingsPopupCon.appendChild(settingsPopupInputCon);
    renderLoginInput(settingsPopupInputCon, "text", "New Username");

    // Save button
    let settingsPopupBtn = document.createElement("button");
    settingsPopupBtn.id = "settingsPopupBtn";
    settingsPopupBtn.textContent = "Save";
    settingsPopupBtn.addEventListener("click", function (event) {
        event.preventDefault();
        updateUsername();
    })
    settingsPopupCon.appendChild(settingsPopupBtn);

    let formBackgroundCon = document.createElement("div");
    formBackgroundCon.id = "formBackgroundCon";
    formBackgroundCon.addEventListener("click", settingsPopupClose);
    parent.appendChild(formBackgroundCon);

}

function settingsPopupClose() {
    document.querySelector("#settingsPopupCon").remove();
}
