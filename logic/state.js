

const _state = {
    destinations: [],

    // Dessa två nycklar måste finnas med så att man kan skicka fetches osv.
    token: window.localStorage.getItem("token"),
    username: window.localStorage.getItem("username")
}

async function get_user(page) {
    if (_state.username !== "" || _state.username !== undefined || _state.username !== null) {
        let url = `./logic/users.php?token=${_state.token}`;

        if (page !== undefined) url = `../../logic/users.php?token=${_state.token}`;

        const resource = await fetch_handler(url);
        console.log("hej tyrla");

        if (resource !== undefined) {
            _state.user = resource;
            console.log(_state);
        }
    }
}

const state_handler = {
    async runApp() {
        const destinationsResource = await fetch_handler("./logic/destinations.php");

        get_user();

        console.log(_state);

        // _state.users = usersResource;
        _state.destinations = destinationsResource;
        const wrapper = document.querySelector("#wrapper");
        updateRegionsCon(_state.destinations);
    },
    get(entity) {
        console.log(_state);
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

        const resource = await fetch_handler("./logic/users.php", options);
        localStorage.setItem("username", resource[0].userName);
        localStorage.setItem("token", resource.token);
        update_navProfileCon();
    },
    async delete(data) {
        // data = {id: , type: likedBy/beenIn}

        const token = localStorage.getItem("token");
        const body = { token: token, id: data.id, type: data.type };

        const options = {
            method: "DELETE",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(body)
        }

        const resource = await fetch_handler("", options);

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
    }
}

