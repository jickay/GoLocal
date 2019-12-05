<?php

require_once 'requireAll.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    // echo "getting data from POST";
    $json = file_get_contents('php://input');    //Retrive sent json object
    $obj = json_decode($json);                  //decode JSON object

    $title = filter_var($obj->title, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);    
    $desc = filter_var($obj->description, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $price = filter_var($obj->price, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW); 
    $host = filter_var($obj->guide, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW); 
    $location = filter_var($obj->location, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $image = filter_var($obj->image, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

    $opt = array(
        PDO::ATTR_ERRMODE  => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
        PDO::ATTR_EMULATE_PREPARES => false,     //I know that emulation is important but not too sure how this relates 
    );                                                                            

    // Add activity 
    $sql = "INSERT INTO activity_package (title, description, price, host_user, location)
            VALUES (:title, :description, :price, :host, :location);";
    $sql_get_pass = $pdo->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $sql_get_pass->execute(array('title' => $title, 'description' => $desc, 'price' => $price, 'host' => $host, 'location' => $location));
    $rows = $sql_get_pass->fetch(PDO::FETCH_ASSOC);

    $activity_id = $pdo->lastInsertId();

    // Add picture
    $sql = "INSERT INTO picture (activity_id, img_data)
            VALUES (:activity_id, :img_data);";
    $sql_get_pass = $pdo->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $sql_get_pass->execute(array('activity_id' => $activity_id, 'img_data' => $image));
    $rows = $sql_get_pass->fetch(PDO::FETCH_ASSOC);

    // return the id, and pin of the logged in user
    $send = array(
      'id' => $row['activity_id'],
    );
    http_response_code(200);
    echo json_encode($send);
    // echo "Create success";

    $sql_get_pass = null;
    $pdo = null;
}

?>