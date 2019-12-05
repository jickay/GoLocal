<?php

require_once 'requireAll.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    // echo "getting data from POST";
    $json = file_get_contents('php://input');    //Retrive sent json object
    $obj = json_decode($json);                  //decode JSON object

    $activity_id = filter_var($obj->activity_id, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);    //Get the submitted passcod                                                                      

    $sql = "SELECT *
            FROM review
            WHERE activity_id = :activity_id";
    $stmt = $pdo->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $stmt->execute(array(':activity_id' => $activity_id));

    $send = array();
    while($rows = $stmt->fetch(PDO::FETCH_ASSOC)){

      $username = $rows['username'];
      $rating = $rows['rating'];
      $comment = $rows['comment'];

      $arr = array(
          'username' => $username,
          'rating' => $rating,
          'comment' => $comment,
      );
      array_push($send, $arr);

    }
    // return the id, and pin of the logged in user
    http_response_code(200);
    echo json_encode($send);

    $sql_get_pass = null;
    $pdo = null;
}

?>