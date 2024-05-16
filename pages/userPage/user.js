"use strict"

if (window.localStorage.getItem("username") === null || window.localStorage.getItem("token") === null) {
    window.location.href = "../loginPage/login.html";
}

function renderUserHeader(parent) {
    let header = document.createElement("header");
    header.id = "header";
    parent.appendChild(header);

    let myVoyages = document.createElement("div");
    myVoyages.id = "myVoyages";

    let myTextBox = document.createElement("div");
    myTextBox.id = "myTextBox";
    let myText = document.createElement("h1");
    myText.id = "myText";
    myText.textContent = "My";
    myTextBox.appendChild(myText);


    let logoBox = document.createElement("div");
    logoBox.id = "logoBox";

    let logo = document.createElement("div");
    renderLogo(logo, "70", "");
    logoBox.appendChild(logo);

    let sText = document.createElement("h1");
    sText.id = "sText";
    sText.textContent = "s";
    logoBox.appendChild(sText);

    header.appendChild(myVoyages);
    myVoyages.appendChild(myTextBox);
    myVoyages.appendChild(logoBox);

    let trainCon = document.createElement("div");
    trainCon.style.background = "url(../../images/rails.png";
    trainCon.id = "trainCon";
    let loadingBar = document.createElement("div");
    loadingBar.id = "loadingBar";
    let train = document.createElement("img");
    train.id = "img_train";
    trainCon.appendChild(train);
    trainCon.appendChild(loadingBar);
    train.src = "../../images/train.png";
    header.appendChild(trainCon);

    let total_countries = 50;
    let beenList = _state.been.length;
    let percentage = beenList / 50 * 100;

    if (percentage > 75) percentage = 75;
    loadingBar.style.width += `${percentage}%`

    let countriesAmount = document.createElement("p");
    countriesAmount.id = "countriesAmount";
    countriesAmount.textContent = `${beenList} / ${total_countries} countries`;
    loadingBar.appendChild(countriesAmount);
}

renderNav(wrapper);
renderUserHeader(wrapper);
renderBeenfavCon(wrapper, "beenList", "beenList");
renderBeenfavCon(wrapper, "wishlistList", "wishlistList");
renderFooter(wrapper);