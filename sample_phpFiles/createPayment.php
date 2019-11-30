<?php

require_once 'requireAll.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    // echo "getting data from POST";
    $json = file_get_contents('php://input');    //Retrive sent json object
    $obj = json_decode($json);                   //decode JSON object

    date_default_timezone_set('America/Edmonton'); // Set timezone
    $date = date('Y-m-d H:i:s', time());           // Gets date automatically

    // Just need to change these to get correct values
    $account_num = filter_var($obj->account_num, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $username = filter_var($obj->username, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW); 
    $amount = filter_var($obj->amount, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW); 
    $payment_type = filter_var($obj->payment_type, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);  

    $opt = array(
        PDO::ATTR_ERRMODE  => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
        PDO::ATTR_EMULATE_PREPARES => false,     //I know that emulation is important but not too sure how this relates 
    );                                                                            

    $sql = "INSERT INTO payment (account_num, amount, date, type, username)
            VALUES (:account_num, :amount, :date, :type, :username);";
    $sql_get_pass = $pdo->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $sql_get_pass->execute(array(':account_num' => $account_num, ':amount' => $amount, ':date' => $date,
                                 ':type' => $type, ':username' => $username));
    $rows = $sql_get_pass->fetch(PDO::FETCH_ASSOC);

    // return the accountNum, username and amount paid of the logged in user
    $send = array(
      'accountNum' => $account_num,
      'username' => $username,
      'amount' => $amount
    );
    
    http_response_code(200);
    echo json_encode($send);

    $sql_get_pass = null;
    $pdo = null;
}

?>