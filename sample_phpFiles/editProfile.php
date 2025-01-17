<?php

require_once 'requireAll.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    // echo "getting data from POST";
    $json = file_get_contents('php://input');    //Retrive sent json object
    $obj = json_decode($json);                   //decode JSON object

    // Just need to change these to get correct values
    $username = filter_var($obj->username, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW); 
    $fname = filter_var($obj->fname, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $lname = filter_var($obj->lname, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW); 
    $birthday = filter_var($obj->birthday, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $bio = filter_var($obj->bio, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);  
    $image = filter_var($obj->image, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW); 
    
    $opt = array(
      PDO::ATTR_ERRMODE  => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
      PDO::ATTR_EMULATE_PREPARES => false,     //I know that emulation is important but not too sure how this relates 
    );   


    // update profile table
    $sql = "UPDATE profile
            SET fname = :fname, lname = :lname, birthday = :birthday, bio = :bio
            WHERE username = :username";
    $sql_get_pass = $pdo->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $sql_get_pass->execute(array(':fname' => $fname, ':lname' => $lname, ':bio' => $bio,
                                 ':birthday' => $birthday, ':username' => $username));
    $rows = $sql_get_pass->fetch(PDO::FETCH_ASSOC);
    
    $sql = "SELECT profile_id
            FROM profile
            WHERE username = :username";
    $sql_get_pass = $pdo->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $sql_get_pass->execute(array(':username' => $username));
    $profile_row = $sql_get_pass->fetch(PDO::FETCH_ASSOC);

    $pid = $profile_row['profile_id'];

    // update image
    $sql = "UPDATE picture
            SET img_data = :image
            WHERE profile_id = :profile_id";
    $sql_get_pass = $pdo->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $sql_get_pass->execute(array(':image' => $image, ':profile_id' => $pid));
    $image_row = $sql_get_pass->fetch(PDO::FETCH_ASSOC);

    // return the profile details of the user
    $send = array(
      // 'picture_id' => $image_row['picture_id'],
      'username' => $username,
      'fname' => $fname,
      // 'lname' => $lname,
      'bio' => $bio,
      // 'birthday' => $birthday
      'profileData' => $pid
    );
    
    
    http_response_code(200);
    echo json_encode($send);

    $sql_get_pass = null;
    $pdo = null;
}

?>