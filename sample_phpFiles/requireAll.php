<?php
  // Set access to origin
  header('Access-Control-Allow-Origin: *');
  // header('Access-Control-Allow-Header: *');


  //////////////////////////////////////////////////////////
  if (isset($_SERVER['HTTP_ORIGIN'])) {
    // header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
  }

// Access-Control headers are received during OPTIONS requests
  if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

      if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
          header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

      if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
          header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
  }

  //////////////////////////////////////////////////////////

  // $_POST = json_decode(file_get_contents('php://input'), true);
  // Get a connection for the database
  require_once('dbconnect.php');
  //include('modRead.php');
  //include('validate.php');

  // $_POST = json_decode(file_get_contents('php://input'), true);


?>
