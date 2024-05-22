<?php

ini_set("display_errors", 1);

$filename = "database.json";

$requestMethods = $_SERVER["REQUEST_METHOD"];
$allowedMethods = ["GET", "POST", "DELETE"];


if (!in_array($requestMethods, $allowedMethods)) {
    $error = ["error" => "invalid HTTP method"];
    sendJSON($error, 405);
}


$destinations = [];
$users = [];

//om användare finns
if (file_exists($filename)) {
    $json = file_get_contents($filename);
    $full_db = json_decode($json, true);
    $users = $full_db["users"];
    $destinations = $full_db["destinations"];
}

//validate token
function validateToken($token, $requestData, $users)
{
    foreach ($users as $user) {
        if ($user["userName"] == $requestData["userName"] && sha1($user["userName"] . $user["userPassword"]) == $token) {
            return true; // Token is valid
        }
    }
    return false;
};

//GET destination by Id //lägg till så den tar emot token

if ($requestMethods == "GET") {
    if (isset($_GET["id"])) {
        $id = $_GET["id"];

        foreach ($destinations as $destination) {
            if ($destination["id"] == $id) {
                sendJSON($destination);
                break;
            } else {

                foreach ($destination["countries"] as $country) {
                    if ($country["id"] == $id) {
                        sendJSON($country);
                        break;
                    } else {

                        foreach ($country["cities"] as $city) {
                            if ($city["id"] == $id) {
                                sendJSON($city);
                            }
                        }
                    }
                }
            }

        }
        $error = ["error" => "Not Found"];
        sendJSON($error, 404);
    } else {
        sendJSON($destinations);


    }
    $error = ["error" => "No id passed for destination."];
    sendJSON($error, 400);


    /* GET test for destinations. change id in response to find your destination. Works for regions, country, city.

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
}

$contentType = $_SERVER["CONTENT_TYPE"];

$requestJSON = file_get_contents("php://input");
$requestData = json_decode($requestJSON, true);

if ($contentType != "application/json") {
    $error = ["error" => "Invalid Content Type"];
    sendJSON($error, 400);
}


//POST destination to  either liked or been //needs to find user and add value to right field // ADD REQUIRE TOKEN
if ($requestMethods == "POST") {
    if (!isset($requestData["userName"], $requestData["value"], $requestData["field"], $requestData["token"])) {
        $error = ["error" => "Bad Request"];
        sendJSON($error, 400);
    }

    $token = $requestData["token"];
    
    if (!validateToken($token,$requestData, $users)) {
        $error = ["error" => "invalid Token"];
        sendJSON($error, 401);
        exit();

    } else {

    $userName = $requestData["userName"];
    $value = $requestData["value"];
    $field = $requestData["field"];
    $token = $requestData["token"];


    foreach ($users as &$user) {
        if ($user["userName"] == $userName) {
            $user[$field][] = $value;
            $modifiedUser = $user;
            break;
        }
//Request POST example
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

    } };


    $full_db["users"] = $users;
    $json = json_encode($full_db, JSON_PRETTY_PRINT);
    file_put_contents($filename, $json);
    sendJSON($modifiedUser);
}

//Removes objects from Users BEEN or LIKED. Parameters: Object id(to be removed), userId, field. //add TOKEN requirement 
if ($requestMethods == "DELETE") {
    if (!isset($requestData["id"], $requestData["userId"], $requestData["field"], $requestData["token"])) {
        $error = ["error" => "Bad Request"];
        sendJSON($error, 400);
        exit();
    }

    $token = $requestData["token"];

    if (!validateToken($token,$requestData, $users)) {
        $error = ["error" => "invalid Token"];
        sendJSON($error, 401);
        exit();

    } else {

        $objectId = $requestData["id"];
        $userId = $requestData["userId"];
        $field = $requestData["field"];
        $objectDeleted = false; // used to check if object or user is found
        $modifiedUser = null;


        foreach ($users as $userIndex => $user) {

            if ($user["userId"] == $userId) {
                foreach ($user[$field] as $index => $item) {
                    if ($item == $objectId) {
                        array_splice($user[$field], $index, 1);
                        $objectDeleted = true;
                        $modifiedUser = $user;
                        $users[$userIndex] = $modifiedUser;
                        $full_db["users"] = $users;
                        $json = json_encode($full_db, JSON_PRETTY_PRINT);
                        file_put_contents($filename, $json);
                        sendJSON($modifiedUser);
                        exit();
                    }
                }
            }

        }

        if ($objectDeleted !== true) {
            $error = ["error" => "User or Object not found"];
            sendJSON($error, 404);
            exit();
        }
        //Request DELETE example
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


    }
};

?>

<?php
function sendJSON($data, $statusCode = 200)
{
    header('Content-Type: application/json');
    http_response_code($statusCode);
    $json = json_encode($data);
    echo $json;
    exit();
}

?>