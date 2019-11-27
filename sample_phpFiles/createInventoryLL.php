<?php

require_once 'requireAll.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $json = file_get_contents('php://input');    //Retrive sent json object
    $obj = json_decode($json);   

    //$inventory_id = filter_var($obj->inventory_id, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $user_id = filter_var($obj->user_id, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $cana_id = filter_var($obj->product_id, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $label = filter_var($obj->label, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $amount = filter_var($obj->amount, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $cost = filter_var($obj->cost, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $form= filter_var($obj->form, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $thc = filter_var($obj->thc, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $cbd = filter_var($obj->cbd, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $strain = filter_var($obj->strain, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $out_of_stock = 0;


    if(!is_float($amount) or !is_int($amount) ){
        //not valid amount
    }
    if(!is_floa($cost) or !is_int($cost)) {
        //not valid cost
    }

    if(!is_float($thc) or !is_float($thc)){
        //not valid thc percentage
    }

    if(!is_float($cbd) or !is_int($cbd)) {
        //not valid cbd percentage
    }
    

    $sql_insert_inven = "INSERT INTO inventory(user_id, product_id, label, amount, cost, form, thc, cbd, strain, out_of_stock, date_added) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $pdo->prepare($sql_insert_inven)->execute([$user_id, $cana_id, $label, $amount, $cost, $form, $thc, $cbd, $strain, $out_of_stock]);

    http_response_code(201);
    echo json_encode($send);
  
    // Close connection to the database
    my;

}

?>