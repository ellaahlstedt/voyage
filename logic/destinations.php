<?php

ini_set("display_errors", 1);

$users_file = "database.json";
$destinations_db = "database.json";

$requestMethods = $_SERVER["REQUEST_METHOD"];
$allowedMethods = ["GET", "POST", "DELETE"];


if (!in_array($requestMethods, $allowedMethods)) {
    $error = ["error" => "invalid HTTP method"];
    sendJSON($error, 405);
}


$destinations = [];
$users = [];

//om användare finns
if (file_exists($users_file) and file_exists($destinations_db)) {
    $users_json = file_get_contents($users_file);
    $full_user_db = json_decode($users_json, true);
    $users = $full_user_db["users"];

    $destinations_json = file_get_contents($destinations_db);
    $full_destinations_db = json_decode($destinations_json, true);
    $non_separated_destinations = [
        $full_destinations_db["regions"],
        $full_destinations_db["countries"],
        $full_destinations_db["cities"]
    ];

    $full_user_db["destinations"][] = $non_separated_destinations;

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
}

//GET destination by Id //lägg till så den tar emot token

if ($requestMethods == "GET") {

    if (!isset($_GET["id"]) and !isset($_GET["all"]) and isset($_GET["type"])) {
        $type = $_GET["type"];

        if ($type == "region") sendJSON($full_destinations_db["regions"]);

        if ($type == "country") sendJSON($full_destinations_db["countries"]);

        if ($type == "city") sendJSON($full_destinations_db["cities"]);

        sendJSON($full_destinations_db);
    }

    if (isset($_GET["id"]) and isset($_GET["type"]) and !isset($_GET["all"])) {
        $type = $_GET["type"];
        $id = $_GET["id"];

        if ($type == "region") sendJSON($full_destinations_db["regions"][$id - 1]);

        if ($type == "country") sendJSON($full_destinations_db["countries"][$id - 1]);

        if ($type == "city") sendJSON($full_destinations_db["cities"][$id - 1]);
    }

    if (isset($_GET["id"], $_GET["type"], $_GET["all"])) {
        $id = $_GET["id"];
        $type = $_GET["type"];
        $all = $_GET["all"];

        if ($type == "region") {
            if ($all == "true") {

                $region_countries = ["name" => $full_destinations_db["regions"][$id - 1]["name"]];
                $region_countries["countries"] = [];

                foreach ($full_destinations_db["countries"] as $country) {
                    if ($country["region_id"] == $id) $region_countries["countries"][] = $country;
                }

                sendJSON($region_countries);
            }
        }

        if ($type == "country") {
            if ($all == "true") {
                $country_cities = ["name" => $full_destinations_db["countries"][$id - 1]["name"]];
                $country_cities["cities"] = [];

                foreach ($full_destinations_db["cities"] as $city) {
                    if ($city["country_id"] == $id) $country_cities["cities"][] = $city;
                }

                sendJSON($country_cities);
            }
        }

        if ($type == "city") {
            sendJSON($full_destinations_db["cities"][$id - 1]);
        }


        $error = ["error" => "Not Found"];
        sendJSON($error, 404);
    } else {
        sendJSON($full_destinations_db);
    }

    $error = ["error" => "No id passed for destination."];
    sendJSON($error, 400);
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
    if (!isset($requestData["userName"], $requestData["field"], $requestData["token"], $requestData["type"])) {
        $error = ["error" => "Bad Request"];
        sendJSON($error, 400);
    }

    $token = $requestData["token"];

    if (!validateToken($token, $requestData, $users)) {
        $error = ["error" => "invalid Token"];
        sendJSON($error, 401);
        exit();

    } else {

        $userName = $requestData["userName"];
        $field = $requestData["field"];
        $token = $requestData["token"];
        $type = $requestData["type"];
        $destination_id = $requestData["id"];

        $value = $full_destinations_db[$type][$destination_id - 1];



        foreach ($users as &$user) {
            if ($user["userName"] == $userName) {
                $user[$field][] = $value;
                $modifiedUser = $user;
                break;
            }

        }
    };


    $full_user_db["users"] = $users;
    $users_json = json_encode($full_user_db, JSON_PRETTY_PRINT);
    file_put_contents($users_file, $users_json);
    sendJSON($modifiedUser);
}

//Removes objects from Users BEEN or LIKED. Parameters: Object id(to be removed), userId, field. //add TOKEN requirement 
if ($requestMethods == "DELETE") {
    if (!isset($requestData["id"], $requestData["userId"], $requestData["field"], $requestData["token"], $requestData["type"])) {
        $error = ["error" => "Bad Request"];
        sendJSON($error, 400);
        exit();
    }

    $token = $requestData["token"];

    if (!validateToken($token, $requestData, $users)) {
        $error = ["error" => "invalid Token"];
        sendJSON($error, 401);
        exit();

    } else {

        $objectId = $requestData["id"];
        $type = $requestData["type"];
        $userId = $requestData["userId"];
        $field = $requestData["field"];
        $objectDeleted = false; // used to check if object or user is found
        $modifiedUser = null;


        foreach ($users as $userIndex => $user) {

            if ($user["userId"] == $userId) {
                foreach ($user[$field] as $index => $item) {
                    if ($item["id"] == $objectId and $item["type"] == $type) {
                        array_splice($user[$field], $index, 1);
                        $objectDeleted = true;
                        $modifiedUser = $user;
                        $users[$userIndex] = $modifiedUser;
                        $full_user_db["users"] = $users;
                        $users_json = json_encode($full_user_db, JSON_PRETTY_PRINT);
                        file_put_contents($users_file, $users_json);
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