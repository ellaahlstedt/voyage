<?php 

ini_set("display_errors", 1);

$filename = "./users_db.json";

$requestMethods = $_SERVER["REQUEST_METHOD"];
$allowedMethods = ["GET", "POST", "PATCH", "DELETE"];


if(!in_array($requestMethods, $allowedMethods)) {
    $error = ["error" => "invalid HTTP method"];
    sendJSON($error, 405);
}

$users = [];

if (file_exists($filename)){
    $json = file_get_contents($filename);
    $full_db = json_decode($json, true);
    $users = $full_db;
}

if ($requestMethods == "GET") {
    if (isset($_GET["token"])) { 
        $token = $_GET["token"]; 
        $userId;

        foreach($users as $user) {
            $name = $user["userName"];
            $password = $user["userPassword"];
            $userToken = sha1("$name$password");
            
            if ($userToken == $token) {
                $user_to_send = [
                    "userId" => $user["userId"],
                    "been" => $user["been"],
                    "liked" => $user["liked"]
                ];

                sendJSON($user_to_send);
            }
        }

        $error = ["error" => "Not Found"];
        sendJSON($error, 404);
    }
    else { 
        sendJSON($users);
    }
    $error = ["error" => "No id passed for user."];
    sendJSON($error, 400);
}

$requestJSON = file_get_contents("php://input");
$requestData = json_decode($requestJSON, true);

$contentType = $_SERVER["CONTENT_TYPE"];
if ($contentType != "application/json") {
    $error = ["error" => "Invalid Content Type"];
    sendJSON($error, 400);
}

// Add user
if ($requestMethods == "POST") {
    if (!isset($requestData["userName"], $requestData["password"])) {
        $error = ["error" => "Bad Request"];
        sendJSON($error, 400);
    }

    $userName = $requestData["userName"];
    $password = $requestData["password"];

    if ($requestData["action"] == "login") {
        foreach ($users as $user) {
            if ($user["userName"] == $requestData["userName"]) {
                $token = sha1($user["userName"] . $user["userPassword"]);
                sendJSON(["token" => $token, "username" => $user["userName"], "userId" => $user["userId"]]);
            }
        }
    }
    
    $highestId = 0;
    
    foreach ($users as $user) {

        if ($user["userName"] == $userName) {
            $error = ["error" => "Username is already taken."];
            sendJSON($error, 404);
        }

        if ($user["userId"] > $highestId) {
            $highestId = $user["userId"];
        }
    }

    $nextId = $highestId + 1;
    $newUser = ["userId" => $nextId, "userName" => $userName, "userPassword" => $password, "liked" => [], "been" => []];
    $users[] = $newUser;
    $full_db = $users;
    $json = json_encode($full_db, JSON_PRETTY_PRINT);
    file_put_contents($filename, $json);
    sendJSON($newUser);
  
}

if ($requestMethods == "PATCH") {
    if (!isset($requestData["userName"], $requestData["token"])) {
        $error = ["error" => "Bad Request"];
        sendJSON($error, 400);
    }

    $incoming_token = $requestData["token"];
    $token_valid = false;
    $userId = 0;
    
    foreach($users as $user) {
        $name = $user["userName"];
        $password = $user["userPassword"];
        $userToken = sha1("$name$password");
        
       
        $encrypted_user = sha1($user["userName"] . $user["userPassword"] == $incoming_token);
        if ($userToken == $incoming_token) {
            $userId = $user["userId"]; 
            $token_valid = true;
        }
        
    }

    if ($token_valid == false) {
        $error = ["error" => "Token is invalid!"];
        sendJSON($error, 400);
    }

    $newName = $requestData["userName"];

    foreach ($users as $index => $user) {
        if ($user["userId"] == $userId) {
            $user["userName"] = $newName;
            $users[$index] = $user;
            $full_db = $users;
            $json = json_encode($full_db, JSON_PRETTY_PRINT);
            file_put_contents($filename, $json);
            $token = sha1($user["userName"] . $user["userPassword"]);
            sendJSON([$user, "token" => $token]);
        }
    }
    $error = ["error" => "Not Found"];
    sendJSON($error, 404);

}

if ($requestMethods == "DELETE") {
    if (!isset($requestData["id"], $requestData["token"])) {
        $error = ["error" => "Bad Request"];
        sendJSON($error, 400);
    }

    $incoming_token = $requestData["token"];
    $token_valid = false;
    
    foreach($users as $user) {
        $encrypted_user = sha1($user["userName"] . $user["userPassword"] == $incoming_token);
        if ($encrypted_user == $token) $token_valid = true;
        
    }

    if ($token_valid == false) {
        $error = ["error" => "Token is invalid!"];
        sendJSON($error, 400);
    }

    $id = $requestData["id"];

    foreach($users as $index => $user) {
        if ($user["userId"] == $id) {
            array_splice($users, $index, 1);
            $full_db = $users;
            $json = json_encode($full_db, JSON_PRETTY_PRINT);
            file_put_contents($filename, $json);
            sendJSON($full_db);
        }
    }
    $error = ["error" => "Not Found"];
    sendJSON($error, 404);
}
?>

<?php

function sendJSON($data, $statusCode = 200) {
    header: 'Content-Type: application/json';
    http_response_code($statusCode);
    $json = json_encode($data);
    echo $json;
    exit();
}

?>