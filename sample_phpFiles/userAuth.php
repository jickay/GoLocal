<?php

require_once 'requireAll.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    // echo "getting data from POST";
    $json = file_get_contents('php://input');    //Retrive sent json object
    $obj = json_decode($json);                  //decode JSON object

    $username = filter_var($obj->username, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);    //Get the submitted username
    $password = filter_var($obj->password, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);    //Get the submitted passcode

    $opt = array(
        PDO::ATTR_ERRMODE  => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
        PDO::ATTR_EMULATE_PREPARES => false,     //I know that emulation is important but not too sure how this relates 
    );                                                                            

    $sql = 'SELECT * FROM user WHERE username = :username';
    $sql_get_pass = $pdo->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $sql_get_pass->execute(array(':username' => $username));
    $user = $sql_get_pass->fetch(PDO::FETCH_ASSOC);

    $retrived = $sql_get_pass->rowCount();   // Get the number of rows returned

    //make sure only one was returned, more than one means are duplicate user names in the database which is not good :(
    if ($retrived != 1) {
        http_response_code(401);
        $sql_get_pass = null;
        $pdo = null;
        exit();
    }

    //Check submitted passcode against
    if($password != $user['password']){
        http_response_code(401);
        $sql_get_pass = null;
        $pdo = null;
        exit();
    }

    // return the id, and pin of the logged in user
    $send = array(
      'username' => $username,
      'password' => $password,
      'usertype' => $user['usertype']
    );
    http_response_code(200);
    echo json_encode($send);

    $sql_get_pass = null;
    $pdo = null;
}

?>