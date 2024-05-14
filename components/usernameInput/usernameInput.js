function renderLoginInput(parent, type, text) {
    let inputCon = document.createElement("div");
    inputCon.id = "inputCon";
    parent.appendChild(inputCon);

    const label = document.createElement("label");
    label.setAttribute("for", "loginInput" + type);
    label.textContent = text;
    inputCon.appendChild(label);


    const input = document.createElement("input");
    input.setAttribute("type", type);
    input.id = "loginInput" + type;
    inputCon.appendChild(input);
}