<?php

require_once 'requireAll.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    // echo "getting data from POST";
    $json = file_get_contents('php://input');    //Retrive sent json object
    $obj = json_decode($json);                  //decode JSON object

    $username = filter_var($obj->username, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);    //Get the submitted username
    $fname = filter_var($obj->fname, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);    //Get the submitted passcode
    $lname = filter_var($obj->lname, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);  
    $birthday = filter_var($obj->birthday, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);  

    $opt = array(
        PDO::ATTR_ERRMODE  => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
        PDO::ATTR_EMULATE_PREPARES => false,     //I know that emulation is important but not too sure how this relates 
    );                                                                            
    ///update first name, last name, birthday in the specific profile
    $sql = "UPDATE profile
            SET fname = :fname, lname = :lname, birthday = :birthday
            WHERE uersname = :username";

    $sql_get_pass = $pdo->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $sql_get_pass->execute(array(':username' => $username,':fname' => $fname,':lname' => $lname, ':birthday' => $birthday));
    $rows = $sql_get_pass->fetch(PDO::FETCH_ASSOC);

    $username = $rows['username']

    // return the username that edited for now
    $send = array(
      'username' => $username,
    );
    http_response_code(200);
    echo json_encode($send);

    $sql_get_pass = null;
    $pdo = null;
}

?>