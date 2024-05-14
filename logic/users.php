<?php 

ini_set("display_errors", 1);

$filename = "database.json";

$requestMethods = $_SERVER["REQUEST_METHOD"];
$allowedMethods = ["GET", "POST", "PATCH", "DELETE"];


if(!in_array($requestMethods, $allowedMethods)) {
    $error = ["error" => "invalid HTTP method"];
    sendJSON($error, 405);
}

if ($contentType != "application/json") {
        $error = ["error" => "Invalid Content Type"];
        sendJSON($error, 405);
}


$users = [];

//om användare finns
if (file_exists($filename)){
    $json = file_get_contents($filename);
    $full_db = json_decode($json, true);
    $users = $full_db["users"];
}

//GET användare med ID
if ($requestMethods == "GET") {
    if (isset($_GET["id"])) {
        $id = $_GET["id"];

        foreach($users as $user) {
            if($user["id"] == $id) {
                sendJSON($user);
            }
        }
        $error = ["error" => "Not Found"];
        sendJSON($error, 404);
    }
    $error = ["error" => "No id passed for user."];
    sendJSON($error, 400);
}

$requestJSON = file_get_contents("php://input");
$requestData = json_decode($requestJSON, true);


if ($contentType != "application/json") {
    $error = ["error" => "Invalid Content Type"];
    sendJSON($error, 400);
}
$contentType = $_SERVER["CONTENT_TYPE"];
// lägg till ny användare. Lägg till tom array av been o liked + token
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
                $token = sha1($user["userName"] . $user["password"]);
                sendJSON($token);
            }
        }
    }

    $liked = $requestData["liked"];
    $been = $requestData["been"];
    
    //create ID
    $highestId = 0;
    //array for existing users
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
    $newUser = ["userId" => $nextId, "userName" => $userName, "password" => $password, "liked" => [], "been" => []];
    $users[] = $newUser;
    $full_db["users"] = $users;
    $json = json_encode($full_db, JSON_PRETTY_PRINT);
    file_put_contents($filename, $json);
    sendJSON($newUser);
    //request POST example
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
}

//patchar userName
if ($requestMethods == "PATCH") {
    if (!isset($requestData["id"], $requestData["userName"], $requestData["token"])) {
        $error = ["error" => "Bad Request"];
        sendJSON($error, 400);
    }

    $incoming_token = $requestData["token"];
    $token_valid = false;
    
    foreach($users as $user) {
        $encrypted_user = sha1($user["userName"] . $user["password"] == $incoming_token);
        if ($encrypted_user == $token) $token_valid = true;
        
    }

    if ($token_valid == false) {
        $error = ["error" => "Token is invalid!"];
        sendJSON($error, 400);
    }

    $id = $requestData["id"];
    $newName = $requestData["userName"];

    foreach ($users as $index => $user) {
        if ($user["userId"] == $id) {
            $user["userName"] = $newName;
            $users[$index] = $user;
            $full_db["users"] = $users;
            $json = json_encode($full_db, JSON_PRETTY_PRINT);
            file_put_contents($filename, $json);
            sendJSON($user);
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
        $encrypted_user = sha1($user["userName"] . $user["password"] == $incoming_token);
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
            $full_db["users"] = $users;
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