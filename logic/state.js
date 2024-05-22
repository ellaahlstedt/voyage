

const _state = {

    // Dessa två nycklar måste finnas med så att man kan skicka fetches osv.
    token: window.localStorage.getItem("token"),
    username: window.localStorage.getItem("username")
}

async function get_user(page) {
    if (_state.username !== "" || _state.username !== undefined || _state.username !== null) {
        let url = "";
        if (_state.token) {
            url = `./logic/users.php?token=${_state.token}`;
        }

        if (page !== undefined) url = `../../logic/users.php?token=${_state.token}`;

        const resource = await fetch_handler(url);

        if (resource !== undefined) {
            _state.user = resource;
        }
    }
}

const state_handler = {
    async runApp() {
        const regionsResource = await fetch_handler("./logic/destinations.php?type=region");
        const countriesResource = await fetch_handler("./logic/destinations.php?type=country");
        const citiesResource = await fetch_handler("./logic/destinations.php?type=city");

        get_user();
        _state.regions = regionsResource;
        _state.countries = countriesResource;
        _state.cities = citiesResource;

        updateRegionsCon(_state.regions);
    },
    get(entity) {
        return JSON.parse(JSON.stringify(_state[entity]));
    },
    async post(data) {
        // data = {username: , password: }

        const token = localStorage.getItem("token");
        const body = { token: token, username: data.username, password: data.password };

        const options = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(body)
        };

        const resource = await fetch_handler("", options);
        _state.users.push(resource);
    },

    async patch(data) {
        // data = {id: , username: }

        const token = localStorage.getItem("token");
        const body = { token: token, userName: data.username };

        const options = {
            method: "PATCH",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(body)
        };

        let usersSrc = window.location.href.toLowerCase().includes("pages") ? "../../logic/users.php" : "./logic/users.php";
        const resource = await fetch_handler(usersSrc, options);
        localStorage.setItem("username", resource[0].userName);
        localStorage.setItem("token", resource.token);
        update_navProfileCon();
    },
    async delete(data) {

        const body = { data };

        const options = {
            method: "DELETE",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(body)
        }

        const resource = await fetch_handler("./logic/destinations.php", options);

        switch (data.type) {
            case "liked":
                for (let i = 0; i < _state.users.likedBy.length; i++) {
                    if (_state.users.likedBy[i] == resource.id) {
                        _state.users.likedBy.splice(i, 1);
                    }
                }
                // update likeCon
                break;
            case "been":
                for (let i = 0; i < _state.users.beenIn.length; i++) {
                    if (_state.users.beenIn[i] == resource.id) {
                        _state.users.beenIn.splice(i, 1);
                    }
                }
                // update beenCon
                break;
        }
    },
    async postItem(field, data) {
        //userId, field, value, token


        const token = localStorage.getItem("token");
        const userName = localStorage.getItem("username");
        const body = { token: token, userName: userName, field: field, value: data };

        const options = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(body)
        };

        if (field == "been") {
            await fetch_handler("../../logic/destinations.php", options);

        }
        else if (field == "liked") {
            await fetch_handler("../../logic/destinations.php", options);

        }
    }
}

