<?php

require_once 'requireAll.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $json = file_get_contents('php://input');    //Retrive sent json object
    $obj = json_decode($json);                  //decode JSON object

$user_id = filter_var($obj->user_ID, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

$sql_get_inventory = $pdo->prepare("SELECT Label, Amount, Cost, Form, THC, CBD, Strain FROM Inventory WHERE User_id = ? ");
$sql_get_inventory->execute([$user_id]);                                                                               //execute with variables
$inventory = $sql_get_inventory->fetch(PDO::FETCH_ASSOC);

$label = $inventory['Label'];
$amount = $inventory['Amount'];
$cost = $inventory['Cost'];
$form = $inventory['Form'];
$thc = $inventory['THC'];
$cbd = $inventory['CBD'];
$strain = $inventory['Strain'];

$send = array( 'label' => $label,
                'amount' => $amount,
                'cost' => $cost,
                'form' => $form,
                'thc' => $thc,
                'cbd' => $cbd,
                'strain' => $strain
);

$send2 = array("hello", "MARY", "PETER");

http_response_code(200);
$myJSON = json_encode($send);
echo $myJSON;

$sql_get_inventory = null;
$pdo = null;
}


?>