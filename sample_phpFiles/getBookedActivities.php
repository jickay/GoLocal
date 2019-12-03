<?php

require_once 'requireAll.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET'){      
    $json = file_get_contents('php://input');    //Retrive sent json object
    $obj = json_decode($json);                  //decode JSON object

    $username = filter_var($obj->username, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);                                               

    $sql = 'SELECT *
            FROM booking AS b WHERE b.username = :username';
            // -- FROM activity_package AS A, picture AS P
            // -- WHERE A.activity_id = P.activity_id';
    $stmt = $pdo->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $stmt->execute(array(':username' => $username));

    // TODO: Retrieve activity information after grabbing booking information.

    
    
    $send = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // echo $row;
        $activity_id = $row['activityID'];

        $sql2 = 'SELECT *
            FROM activity_package
            WHERE activity_id = :id';
            // -- FROM activity_package AS A, picture AS P
            // -- WHERE A.activity_id = P.activity_id';
         $stmt2 = $pdo->prepare($sql2, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
         $stmt2->execute(array(':id' => $activity_id));
         $row2 = $stmt2->fetch(PDO::FETCH_ASSOC)
        $id = $row2['activity_id'];
        $title = $row2['title'];
        $desc = $row2['description'];
        $price = $row2['price'];
        $avail = $row[2'availability'];
         $arr = array(
            'id' => $id,
            'title' => $title,
            'description' => $desc,
            'price' => $price,
            'avail' => $avail
        );
        array_push($send, $arr);
       
    };

    http_response_code(200);
    echo json_encode($send);

    $sql_get_pass = null;
    $pdo = null;
}

?>