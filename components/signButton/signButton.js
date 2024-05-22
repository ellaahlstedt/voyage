function renderSignButton(parent, text) {
    let button = document.createElement("button");
    button.textContent = text;
    button.id = "signButton";

    if (text == "Sign in") {
        button.addEventListener("click", onSignIn);
    } else {
        button.addEventListener("click", onRegister);
    }

    parent.appendChild(button);

}

async function onSignIn(event) {
    const usernameField = document.getElementById("loginInputtext").value.toLowerCase();
    const passwordField = document.getElementById("loginInputpassword").value;

    const body = {
        userName: usernameField,
        password: passwordField,
        action: "login"
    }

    const options = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body)
    }

    const resource = await fetch_handler("../../logic/users.php", options);
    window.localStorage.setItem("token", resource.token);
    window.localStorage.setItem("username", resource.username);
    window.localStorage.setItem("userId", resource.userId);
    window.location.href = "../../";
}

async function onRegister(event) {
    const usernameField = document.getElementById("loginInputtext").value.toLowerCase();
    const passwordField = document.getElementById("loginInputpassword").value;

    const body = {
        userName: usernameField,
        password: passwordField,
        action: "register"
    }

    const options = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body)
    }

    const resource = await fetch_handler("../../logic/users.php", options);

    if (resource.userName !== undefined) updateForm();
}