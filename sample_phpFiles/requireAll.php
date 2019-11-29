<?php


// function console_log( $data ){
//     echo '<script>';
//     echo 'console.log('. json_encode( $data ) .')';
//     echo '</script>';
// }

// console_log("Start of requireAll");
  // Set access to origin
//   header('Access-Control-Allow-Origin: *');
  // header('Access-Control-Allow-Header: *');

   // Allow from any origin
   if (isset($_SERVER['HTTP_ORIGIN'])) {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");   
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }

  //////////////////////////////////////////////////////////

    // console_log("End of requireAll");

  // $_POST = json_decode(file_get_contents('php://input'), true);
  // Get a connection for the database
  require_once('dbconnect.php');
  //include('modRead.php');
  //include('validate.php');

  // $_POST = json_decode(file_get_contents('php://input'), true);


?>
