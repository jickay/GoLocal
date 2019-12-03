<?php

require_once 'requireAll.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    // echo "getting data from POST";
    $json = file_get_contents('php://input');    //Retrive sent json object
    $obj = json_decode($json);                   //decode JSON object

    date_default_timezone_set('America/Edmonton'); // Set timezone
    $date = date('Y-m-d H:i:s', time());           // Gets date automatically

    // Just need to change these to get correct values
    $username = filter_var($obj->username, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW); 
    $picture = filter_var($obj->picture, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW); 
    $activityID = filter_var($obj->activityID, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

    $opt = array(
        PDO::ATTR_ERRMODE  => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
        PDO::ATTR_EMULATE_PREPARES => false,     // I know that emulation is important but not too sure how this relates 
    );  

    $sql = "INSERT INTO picture (username, activity_id, date, img_data)
            VALUES (username = :username, activity_id = :activityID, date = :date, img_data = :img_data)";
    $sql_get_pass = $pdo->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $sql_get_pass->execute(array(':username' => $username, ':activity_id' => $activityID, ':date' => $date, ':img_data' => $picture));
    $rows = $sql_get_pass->fetch(PDO::FETCH_ASSOC);

    // return the profile details of the user
    $send = array(
      'username' => $username,
      'img_data' => $picture
    );
    
    http_response_code(200);
    echo json_encode($send);

    $sql_get_pass = null;
    $pdo = null;
}

?>