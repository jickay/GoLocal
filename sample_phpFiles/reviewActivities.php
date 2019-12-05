<?php

require_once 'requireAll.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    // echo "getting data from POST";
    $json = file_get_contents('php://input');    //Retrive sent json object
    $obj = json_decode($json);                  //decode JSON object

    $username = filter_var($obj->username, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);    //Get the submitted username
    $activityID = filter_var($obj->activity_id, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);    //Get the submitted passcode
    $rating = filter_var($obj->rating, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);  
    $comment = filter_var($obj->comment, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

    $opt = array(
        PDO::ATTR_ERRMODE  => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
        PDO::ATTR_EMULATE_PREPARES => false,     //I know that emulation is important but not too sure how this relates 
    );                                                                            

    $sql = "INSERT INTO review (username, activity_id, rating, comment)
            VALUES (:username, :activityID, :rating, :comment);";
    $sql_get_pass = $pdo->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $sql_get_pass->execute(array(':username' => $username, ':activityID' => $activityID, ':rating' => $rating, ':comment' => $comment));
    $rows = $sql_get_pass->fetch(PDO::FETCH_ASSOC);

    // return the id, and pin of the logged in user
    $send = array(
      'username' => $username,
      'activity' => $activityID,
      'review'   => $review,
      'comment'  => $comments
    );
    http_response_code(200);
    echo json_encode($send);

    $sql_get_pass = null;
    $pdo = null;
}

?>