<?php

require_once 'requireAll.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST'){                                                     

    $json = file_get_contents('php://input');    //Retrive sent json object
    $obj = json_decode($json);                   //decode JSON object

    // Not sure if we can also grab username to use to compare
    $username = filter_var($obj->username, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW); 

    $sql = "SELECT *
            FROM profile AS P, picture AS Q
            WHERE P.username = :username AND Q.profile_id = P.profile_id";
    // $stmt = $pdo->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    // $stmt->execute(array(':username' => $username));
    // $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $sql_get_pass = $pdo->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $sql_get_pass->execute(array(':username' => $username));
    $row = $sql_get_pass->fetch(PDO::FETCH_ASSOC);

    // // return the profile details of the user
    $send = array(
        'fname' => $row['fname'],
        'lname' => $row['lname'],
        'birthday' => $row['birthday'],
        'bio' => $row['bio'],
        'image' => $row['img_data']
    );

    http_response_code(200);
    echo json_encode($send);

    $sql_get_pass = null;
    $pdo = null;
}

?>