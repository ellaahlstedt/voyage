function renderSignButton(parent, text) {
    let button = document.createElement("button");
    button.textContent = text;
    button.id = "signButton";

    if (text == "Sign In") {
        button.addEventListener("click", onSignIn);
    } else {
        button.addEventListener("click", onRegister);
    }

    parent.appendChild(button);

}

function onSignIn(event) {

}

function onRegister(event) {

}