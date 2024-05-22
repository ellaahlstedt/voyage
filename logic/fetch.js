async function fetch_handler(url, options) {

    let response;

    try {
        if (options === undefined) {
            response = await fetch(url);
        }
        else {
            response = await fetch(url, options);
        }

        if (response.ok) return response.json(); else alert("Invalid request!")

    } catch (error) {
        alert("Problem with connection! Please try again later!");
        return false;
    }
}