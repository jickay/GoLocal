<?php

require_once 'requireAll.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST'){                                                     

    $json = file_get_contents('php://input');    //Retrive sent json object
    $obj = json_decode($json);                   //decode JSON object

    // Not sure if we can also grab username to use to compare
    $username = filter_var($obj->username, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW); 

    $sql = "SELECT fname, lname, birthday
            FROM profile AS P
            WHERE P.username = :username";
    $stmt = $pdo->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $stmt->execute(array(':username' => $username));

    // return the profile details of the user
    $send = array(
        'fname' => $fname,
        'lname' => $lname,
        'birthday' => $birthday
    );

    http_response_code(200);
    echo json_encode($send);

    $sql_get_pass = null;
    $pdo = null;
}

?>