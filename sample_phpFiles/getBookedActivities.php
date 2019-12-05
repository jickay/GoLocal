<?php

require_once 'requireAll.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST'){      
    $json = file_get_contents('php://input');    //Retrive sent json object
    $obj = json_decode($json);                  //decode JSON object

    $username = filter_var($obj->username, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);                                               

    $sql = 'SELECT *
            FROM booking AS b, activity_package AS a
            WHERE b.username = :username AND b.activity_id = a.activity_id';
            // -- FROM activity_package AS A, picture AS P
            // -- WHERE A.activity_id = P.activity_id';
    $stmt = $pdo->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $stmt->execute(array(':username' => $username));

    $send = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // echo $row;
        $id = $row['activity_id'];
        $title = $row['title'];
        $desc = $row['description'];
        $price = $row['price'];
        $avail = $row['availability'];
        $img = $row['img_data'];

        $arr = array(
            'id' => $id,
            'title' => $title,
            'description' => $desc,
            'price' => $price,
            'avail' => $avail,
            'image' => $image
        );
        array_push($send, $arr);
       
    };

    http_response_code(200);
    echo json_encode($send);

    $sql_get_pass = null;
    $pdo = null;
}

?>