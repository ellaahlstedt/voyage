<?php

ini_set("display_errors", 1);

$users_file = "users_db.json";
$destinations_db = "destinations_db.json";

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
    $users = $full_user_db;

    $destinations_json = file_get_contents($destinations_db);
    $full_destinations_db = json_decode($destinations_json, true);
    $non_separated_destinations = [
        $full_destinations_db["regions"],
        $full_destinations_db["countries"],
        $full_destinations_db["cities"]
    ];
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
    if (!isset($requestData["userName"], $requestData["field"], $requestData["token"], $requestData["type"], $requestData["id"])) {
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

        $modifiedUser = "";


        foreach ($users as $index => &$user) {
            if ($user["userName"] == $userName) {
//                $user[$field][] = $value;

                $modifiedUser = handle_city_country_additions($destination_id, $type, $user, $full_destinations_db, $field);
                if ($modifiedUser == null) {
                    sendJSON(["error" => "Destination is already in that field!"], 400);
                }

                break;
            }

        }
    };


    $full_user_db[$index] = $modifiedUser;
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

                        $modifiedUser = handle_city_country_deletes($objectId, $type, $user, $full_destinations_db, $field);
                        // TODO
                        // 1. Hitta vad det är för type dvs land eller stad
                        // 2. Om det är en stad, så ska man kolla om det finns andra städer som har samma city_id
                        // 3. Om det är ett land, så ska man kolla om det finns fler länder som har samma region_id

                        $users[$userIndex] = $modifiedUser;
                        $full_user_db = $users;
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


function handle_city_country_deletes($objectId, $type, $user, $full_destinations_db, $entity)
{

    if ($type == "city") {
        $current_city = $full_destinations_db["cities"][$objectId - 1];
        $current_city_country = $full_destinations_db["countries"][$current_city["country_id"] - 1];
        $current_country_region = $full_destinations_db["regions"][$current_city_country["region_id"] - 1];

        $other_cities_same_country = array_filter($user[$entity], function ($data) use ($current_city_country) {
            if (isset($data["country_id"]) and $data["country_id"] == $current_city_country) {
                return $data;
            }
        });


        if (count($other_cities_same_country) == 0) {
            foreach ($user[$entity] as $index => $liked_object) {
                if ($liked_object["id"] == $current_city_country and $liked_object["type"] == "country") {
                    array_splice($user[$entity], $index, 1);

                    $countries_in_same_region = array_filter($user[$entity], function ($data) use ($current_city_country) {
                        if (isset($data["region_id"]) and $data["type"] == "country" and $current_city_country["region_id"] == $data["region_id"]) return $data;
                    });

                    if (count($countries_in_same_region) == 0) {
                        foreach ($user[$entity] as $region_index => $liked_regions) {
                            if ($liked_regions["type"] == "region" and $liked_regions["id"] == $current_country_region["id"]) {
                                array_splice($user[$entity], $region_index, 1);
                                return $user;
                            }
                        }
                    }

                    return $user;
                }
            }
        }

        return $user;
    }

    if ($type == "country") {
        $current_country = $full_destinations_db["countries"][$objectId - 1];
        $current_country_region = $current_country["region_id"];

        $other_countries_same_region = array_filter($user[$entity], function ($data) use ($current_country_region) {
            if (isset($data["region_id"]) and $data["region_id"] == $current_country_region) {
                return $data;
            }
        });

        $i = 0;
        while ($i < count($user[$entity])) {
            $current_liked_object = $user[$entity][$i];
            if (isset($current_liked_object["country_id"]) and $current_liked_object["country_id"] == $objectId) {
                array_splice($user[$entity], $i, 1);
                $i = 0;
                continue;
            }

            $i++;
        }

        if (count($other_countries_same_region) == 0) {
            foreach ($user[$entity] as $index => $liked_object) {
                if ($liked_object["id"] == $current_country_region and $liked_object["type"] == "region") {
                    array_splice($user[$entity], $index, 1);
                    return $user;
                }
            }
        }

        return $user;
    }

    if ($type == "region") {
        $current_region = $full_destinations_db["regions"][$objectId - 1];
        $current_region_id = $current_region["id"];
        $country_ids_to_del = [];


        $index = 0;

        while ($index < count($user[$entity])) {
            $liked_object = $user[$entity][$index];
            if ($liked_object["id"] == $current_region_id and $liked_object["type"] == "region") {
                array_splice($user[$entity], $index, 1);
                $index = 0;
                break;
            }
            $index++;
        }

        $index = 0;


        while ($index < count($user[$entity])) {
            $liked_object = $user[$entity][$index];
            if ($liked_object["type"] == "country" and isset($liked_object["region_id"]) and $liked_object["region_id"] == $current_region_id) {
                $country_ids_to_del[] = $liked_object["id"];
                array_splice($user[$entity], $index, 1);
                $index = 0;
                continue;
            }

            $index++;
        }

        $index = 0;

        for ($i = 0; $i < count($country_ids_to_del); $i++) {
            $country_id = $country_ids_to_del[$i];
            while ($index < count($user[$entity])) {
                $liked_object = $user[$entity][$index];
                if ($liked_object["type"] == "city" and isset($liked_object["country_id"]) and $country_id == $liked_object["country_id"]) {
                    array_splice($user[$entity], $index, 1);
                    $index = 0;
                    continue;
                }

                $index++;
            }
        }


        return $user;
    }
}


function handle_city_country_additions($objectId, $type, $user, $full_destinations_db, $entity)
{
    if ($type == "cities") {
        $current_city = $full_destinations_db["cities"][$objectId - 1];

        if ($current_city == null) {
            sendJSON(["error" => "City does not exist!"], 400);
        }

        $current_city_country = $full_destinations_db["countries"][$current_city["country_id"] - 1];
        $current_country_region = $full_destinations_db["regions"][$current_city_country["region_id"] - 1];
        $country_exists = false;
        $region_exists = false;

        foreach ($user[$entity] as $liked_objects) {

            if ($liked_objects["type"] == "city" and $liked_objects["id"] == $objectId) {
                return null;
            }

            if ($liked_objects["type"] == "country" and $liked_objects["id"] == $current_city_country["id"]) {
                $country_exists = true;
            }

            if ($liked_objects["type"] == "region" and $liked_objects["id"] == $current_country_region["id"]) {
                $region_exists = true;
            }
        }


        if ($region_exists == false) {
            $user[$entity][] = $current_country_region;
            $user[$entity][] = $current_city_country;
            $user[$entity][] = $current_city;
            return $user;
        }

        if ($country_exists == false) {
            $user[$entity][] = $current_city;
            $user[$entity][] = $current_city_country;
            return $user;
        }

        $user[$entity][] = $current_city;
        return $user;
    }

    if ($type == "countries") {
        $current_country = $full_destinations_db["countries"][$objectId - 1];

        if ($current_country == null) {
            sendJSON(["error" => "Country does not exist!"], 400);
        }

        $current_country_region = $full_destinations_db["regions"][$current_country["region_id"] - 1];
        $region_exists = false;


        foreach ($user[$entity] as $liked_objects) {
            if ($liked_objects["type"] == "country" and $liked_objects["id"] == $objectId) {
                return null;
            }

            if ($liked_objects["type"] == "region" and $liked_objects["id"] == $current_country_region["id"]) $region_exists = true;
        }

        if ($region_exists == false) {
            $user[$entity][] = $current_country;
            $user[$entity][] = $current_country_region;
            return $user;
        }

        $user[$entity][] = $current_country;
        return $user;
    }
}

?>