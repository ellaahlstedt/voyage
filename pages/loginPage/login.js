renderLogin();

function renderLogin() {
    const parent = document.querySelector("#wrapper");

    // logo
    renderLogo(parent, 80, "#FFFFFF");

    // con
    let loginCon = document.createElement("div");
    loginCon.id = "loginPageCon";
    parent.appendChild(loginCon);

    // form
    let loginForm = document.createElement("form");
    loginForm.id = "loginPageForm";
    loginForm.setAttribute("method", "POST");
    loginForm.setAttribute("action", "#");
    loginForm.setAttribute("onSubmit", "event.preventDefault();");
    loginCon.appendChild(loginForm);

    // h2
    let formHeader = document.createElement("h2");
    formHeader.textContent = "Sign In";
    formHeader.id = "formHeader";
    loginForm.appendChild(formHeader);

    // texts inputs med labels - username & password
    let inputCon = document.createElement("div");
    inputCon.id = "inputsCon";
    loginForm.appendChild(inputCon);

    renderLoginInput(inputCon, "text", "Username");
    renderLoginInput(inputCon, "text", "Password");

    // button - sign in
    renderSignButton(loginForm, "Sign in");

    let updateFormCon = document.createElement("div");
    updateFormCon.id = "updateFormCon";
    loginForm.appendChild(updateFormCon);

    // not a member
    let buttonHeader = document.createElement("p");
    buttonHeader.textContent = "Not a member?";
    buttonHeader.id = "buttonHeader";
    updateFormCon.appendChild(buttonHeader);

    // button - register here - clickEvent
    let updateFormButton = document.createElement("button");
    updateFormButton.textContent = "Register Here";
    updateFormButton.id = "updateFormButton";
    updateFormButton.addEventListener("click", updateForm);
    updateFormCon.appendChild(updateFormButton);
}

function updateForm() {

    const formHeader = document.querySelector("#formHeader");
    if (formHeader.textContent == "Sign In") {
        // id från h2 - ändra textContent
        formHeader.textContent = "Register";

        // id från button - ändra textContent & clickEvent
        const signButton = document.querySelector("#signButton");
        signButton.textContent = "Register";
        signButton.removeEventListener("click", onSignIn);
        signButton.addEventListener("click", onRegister);

        // id från text - ändra textContent
        const buttonHeader = document.querySelector("#buttonHeader");
        buttonHeader.textContent = "Already a member?"

        // id från button - ändra textContent
        const updateFormButton = document.querySelector("#updateFormButton");
        updateFormButton.textContent = "Sign In";
    } else {
        // id från h2 - ändra textContent
        formHeader.textContent = "Sign In";

        // id från button - ändra textContent & clickEvent
        const signButton = document.querySelector("#signButton");
        signButton.textContent = "Sign In";
        signButton.removeEventListener("click", onRegister);
        signButton.addEventListener("click", onSignIn);

        // id från text - ändra textContent
        const buttonHeader = document.querySelector("#buttonHeader");
        buttonHeader.textContent = "Not a member?"

        // id från button - ändra textContent
        const updateFormButton = document.querySelector("#updateFormButton");
        updateFormButton.textContent = "Register";
    }



}