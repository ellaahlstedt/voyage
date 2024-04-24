function renderRegionsBox (parent) {
    let regionsBox = document.createElement("div");
    regionsBox.id = "regionsBox";
    parent.appendChild(regionsBox);

    for (let i = 0; i < 7; i++) {
        let regionsItem = document.createElement("div");
        regionsItem.classList = "regionsItem";
        regionsBox.appendChild(regionsItem);
    }
}