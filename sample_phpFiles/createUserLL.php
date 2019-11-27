<?php

require_once 'requireAll.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $json = file_get_contents('php://input');    //Retrive sent json object
    $obj = json_decode($json);                  //convert json encoded string and convert it to PHP vairalble, ? 2nd arg=true means we get it as an associative array
  
    //get user name and password from json object
    $username = filter_var($obj->username, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $password = filter_var($obj->password, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

    //get quick_pin from json object
    $pin = filter_var($obj->pin, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $pin = (int)$pin;
  
    //keep pin as integer, check that it is 4 digits long.
    if( (!is_int($pin)) or (strlen((string)$pin) != 4 )){
      http_response_code(422);
      $sql_insert_user = null;
      $pdo = null;
      exit();
    }
  
    //check that the username and password are not empty strings. WILL NEED TO UPDATE with strong password verification
    if ((strlen($username) == 0) or (strlen($password) == 0)){
      http_response_code(422);
      $sql_insert_user = null;
      $pdo = null;
      exit();
    }
  
    //Check that the username is not already taken probably need to send someone
    if(checkUsernameAvailability($username)){
      http_response_code(422);
      $sql_insert_user = null;
      $pdo = null;
      exit();
    }
  
    $sql_insert_user = "INSERT INTO users(Username, Passcode, Quick_pin) VALUES(?, ?, ?)";
  
    $pdo->prepare($sql_insert_user)->execute([$username, $password, $pin]);
    
    $_ID = $pdo->lastInsertId();
  
    // Send the JSON feedback
    $send = array(
      "ID" => $_ID,
      "username" => $username,
      "password" => $password
    );
  
    http_response_code(201);
    echo json_encode($send);
  
    $sql_insert_user = null;
    $pdo = null;
  
  }
  
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  //                                             FUNCTIONS                                         //
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  
  
  
  function checkUsernameAvailability($username){
    $sql_get_matching_username = "SELECT username
                                    FROM users
                                      WHERE username = '?'";
    $pdo->prepare($sql_get_matching_username) -> execute([$username]);
    $retrived = $sql_get_matching_username->rowCount();
    if ($row_cnt == 0){
      return false;
    }else{
      return true;
    }
  
  }
  ?>

