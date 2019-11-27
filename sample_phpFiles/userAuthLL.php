<?php

require_once 'requireAll.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $json = file_get_contents('php://input');    //Retrive sent json object
    $obj = json_decode($json);                  //decode JSON object

    $username = filter_var($obj->username, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);    //Get the submitted username
    $password = filter_var($obj->password, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);    //Get the submitted passcode

    $sql_get_pass = $pdo->preapre('SELECT Participant_code, Passcode, Pin FROM users WHERE username = ?');    //prepare statement
    $sql_get_pass->execute([$username]);                                                                               //execute with variables
    $user = $sql_get_pass->fetch();                                                                                   //Retrive return from SELECT statment
    
    $retrived = $sql_get_pass->rowCount();   // Get the number of rows returned
    
    //make sure only one was returned, more than one means are duplicate user names in the database which is not good :(
    if ($retrived != 1) {
        http_response_code(401);
        $sql_get_pass = null;
        $pdo = null;
        exit();
    }
    //Check submitted passcode against 
    if($password != $row['Passcode']){
        http_response_code(401);
        $sql_get_pass = null;
        $pdo = null;
        exit();
    }
    // return the id, and pin of the logged in user
    $id = $row['Participant_code'];
    $pin = $row['Pin'];
    $send = array(
      'Participant_code' => $id,
      'Pin' => $pin
    );
    http_response_code(200);
    echo json_encode($send);

    $sql_get_pass = null;
    $pdo = null;


}

?>