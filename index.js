const wrapper = document.querySelector("#wrapper");
renderNav(wrapper, "Regions");
renderHeader(wrapper, "Regions");
renderFooter(wrapper);


/*async function adam() {
    try {
        const response = await fetch("./logic/users.php", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                id: "1"
            })
        });
        console.log(response);
        const resource = await response.json();
        console.log(resource);
    } catch (e) {
        alert("error");
    }
}
adam();*/

/*async function adam() {
    try {
        const response = await fetch("./logic/destinations.php", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: "1",
                field: "been",
                id: "10602"
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const resource = await response.json(); // Get response text
        console.log("Response Text:", response); // Log response text

        console.log(resource);

    } catch (error) {
        console.error("Error:", error.message);
        alert("Error occurred. Please check console for details.");
    }
}

adam();*/



/*
GET test for destinations. change id in response to find your destination. Works for regions, country, city.

async function adam() {
    try {
        const response = await fetch("./logic/destinations.php?id=1", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const resource = await response.json();
        console.log(resource);
    } catch (error) {
        console.error("Error:", error.message);
        alert("Error occurred. Please check console for details.");
    }
}

adam();*/
