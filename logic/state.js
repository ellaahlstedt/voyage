
const _state = {
        // const data = await fetcher(url, options);
        // _state.token = data.token;
    token: "asokdaoskdasodkas",
    username: "Tyrla",
    destinations: [],
    been: []
}

const state_handler = {
    async runApp() {
        const usersResource = await fetch_handler("");
        const destinationsResource = await fetch_handler("");

        _state.users = usersResource;
        _state.destinations = destinationsResource;
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
        const body = { token: token, id: data.id, username: data.username };

        const options = {
            method: "PATCH",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(body)
        };

        const resource = await fetch_handler("", options);
        const user = _state.users.find((x) => x.id == data.id);
        user.username = resource.username;

        // update navProfileCon
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

