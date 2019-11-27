<?php

require_once 'requireAll.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $json = file_get_contents('php://input');    //Retrive sent json object
    $obj = json_decode($json, JSON_PRETTY_PRINT);                  //convert json encoded string and convert it to PHP vairalble, ? 2nd arg=true means we get it as an associative array
  
    echo "'<script>console.log(\" $obj \")</script>'";
    //get user name and password from json object
    //$username = filter_var($obj->form, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    //$password = filter_var($obj->password, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

    //$sql_insert_user = "INSERT INTO users(username, password, pin) VALUES(?, ?, ?)";
  
    //$pdo->prepare($sql_insert_user)->execute([$username, $password, $pin]);

    //$_ID = $pdo->lastInsertId();
  
    // Send the JSON feedback
    //$send = array(
      //"ID" => $_ID,
      //"username" => $username,
      //"password" => $password
    //);
  
    //http_response_code(201);
    //echo json_encode($send);
  
    // Close connection to the database
    //mysqli_close($dbc);
  }
?>