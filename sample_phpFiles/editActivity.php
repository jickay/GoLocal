<?php

require_once 'requireAll.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    // echo "getting data from POST";
    $json = file_get_contents('php://input');    //Retrive sent json object
    $obj = json_decode($json);                  //decode JSON object

    $activity_id = filter_var($obj->activity_id, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);    //Get the submitted username
    $location = filter_var($obj->location, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);    //Get the submitted passcode
    $activityDate = filter_var($obj->activityDate, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $availability = filter_var($obj->availability, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $category = filter_var($obj->category, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);  
    $price = filter_var($obj->price, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);  
    $title = filter_var($obj->title, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);  
    $description = filter_var($obj->description, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $image = filter_var($obj->image, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);  

    $opt = array(
        PDO::ATTR_ERRMODE  => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
        PDO::ATTR_EMULATE_PREPARES => false,     //I know that emulation is important but not too sure how this relates 
    );                                                                            

    $sql = "UPDATE activity_package
            SET location = :location, date = :activityDate, availability = :availability, category = :category, price = :price, title = :title, description = :description
            WHERE activity_id = :activity_id;
            
    $stmt = $pdo->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $stmt->execute(array(':username' => $username,':location' => $location,':category' => $category,':price' => $price,':title' => $title,':description' => $description));
    $row = $sql_get_pass->fetch(PDO::FETCH_ASSOC);
    $id = $row['activity_id'];



    $sql2 = "UPDATE picture 
            SET img_data = :image
            WHERE activity_id = :activity_id";
            
    $stmt2 = $pdo->prepare($sql2, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $stmt2->execute(array(':activity_id' => $activity_id,'image' => $image));

    // return the id
    $send = array(
      'activity_id' => $activity_id
    );
    http_response_code(200);
    echo json_encode($send);

    $sql_get_pass = null;
    $pdo = null;
}

?>