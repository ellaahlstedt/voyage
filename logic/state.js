

const _state = {

    destinations: [],

    // Dessa två nycklar måste finnas med så att man kan skicka fetches osv.
    token: window.localStorage.getItem("token"),
    username: window.localStorage.getItem("username")
}

const state_handler = {
    async runApp() {
        // const usersResource = await fetch_handler("./logic/users.php");
        const destinationsResource = await fetch_handler("./logic/destinations.php");

        // _state.users = usersResource;
        _state.destinations = destinationsResource;
        const wrapper = document.querySelector("#wrapper");
        updateRegionsCon(_state.destinations);
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
    },
    async postItem(field, data) {
        //userId, field, value, token


        const token = localStorage.getItem("token");
        const userName = localStorage.getItem("username")
        console.log(userName);
        const body = { token: token, userName: userName, field: field, value: data };

        const options = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(body)
        };
        console.log(options);

        if (field == "been") {
            const resource = await fetch_handler("../../logic/destinations.php", options);
            _state.user.been.push(resource);
        }
        else if (field == "liked") {
            const resource = await fetch_handler("../../logic/destinations.php", options);
            _state.user.liked.push(resource);

            //lägg till för liked
        }
    },
}

