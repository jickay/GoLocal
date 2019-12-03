<?php

require_once 'requireAll.php';

<<<<<<< HEAD
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    // echo "getting data from POST";
    $json = file_get_contents('php://input');    //Retrive sent json object
    $obj = json_decode($json);                  //decode JSON object

    $username = filter_var($obj->username, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);    //Get the submitted username

    $opt = array(
        PDO::ATTR_ERRMODE  => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
        PDO::ATTR_EMULATE_PREPARES => false,     //I know that emulation is important but not too sure how this relates 
    );                                                                            
    ///update first name, last name, birthday in the specific profile
    $sql = "SELECT P.fname, P.lname, Pic.pictureID
            FROM profile AS P, profile_pics AS Pic
            WHERE P.username = :username AND Pic.username = :username";

    $sql_get_pass = $pdo->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $sql_get_pass->execute(array(':username' => $username));
    $rows = $sql_get_pass->fetch(PDO::FETCH_ASSOC);
    
    $Fname = $rows['fname']
    $Lname = $rows['lname']
    $pictureID = $rows['pictureID']


    /// get the picture within the profile
    $sql2 = "SELECT img_data
            FROM pitcure
            WHERE picture_id = :pictureID";

    $sql_get_pass2 = $pdo->prepare($sql2, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $sql_get_pass2->execute(array(':pictureID' => $pictureID));
    $rows2 = $sql_get_pass2->fetch(PDO::FETCH_ASSOC);

    $image = $rows2['pictureID']

    // return the username that edited for now
    $send = array(
      'Fname' => $Fname,
      'Lname' => $Lname,
      'image' => $image
    );
=======
if ($_SERVER['REQUEST_METHOD'] == 'POST'){                                                     

    $json = file_get_contents('php://input');    //Retrive sent json object
    $obj = json_decode($json);                   //decode JSON object

    // Not sure if we can also grab username to use to compare
    $username = filter_var($obj->username, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW); 

    $sql = "SELECT fname, lname, birthday
            FROM profile AS P
            WHERE P.username = :username";
    $stmt = $pdo->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $stmt->execute(array(':username' => $username));

    // return the profile details of the user
    $send = array(
        'fname' => $fname,
        'lname' => $lname,
        'birthday' => $birthday
    );

>>>>>>> 8bf70fabf1cf2de1c881abaed5d80a42060d49e8
    http_response_code(200);
    echo json_encode($send);

    $sql_get_pass = null;
    $pdo = null;
}

?>