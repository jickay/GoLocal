<?php

require_once 'requireAll.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET'){                                                     

    $sql = 'SELECT *
            FROM activity_package AS A, picture AS P
            WHERE A.activity_id = P.activity_id';
    $stmt = $pdo->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $stmt->execute();

    $send = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $id = $row['activity_id'];
        $title = $row['title'];
        $desc = $row['description'];

        $arr = array(
            'id' => $id,
            'title' => $title,
            'description' => $desc
        );
        array_push($send, $arr);
       
    };

    http_response_code(200);
    echo json_encode($send);

    $sql_get_pass = null;
    $pdo = null;
}

?>