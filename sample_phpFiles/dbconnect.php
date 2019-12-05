<?php
    function console_log( $data ){
        echo '<script>';
        echo 'console.log('. json_encode( $data ) .')';
        echo '</script>';
    }

    $servername = "localhost";                  //need to find what port the db is running on
    $username = "root";                         //user name, using root on test database
    $password = "password";      //password for database
    $db = "app";                      //name of database
    $cs = 'utf8';                               //characterset, not sure if important to specify

    $dsn = "mysql:host=" . $servername . ";port=3306;dbname=" . $db . ";charset=" . $cs;

    // console_log($dsn);

    $opt = array(
        PDO::ATTR_ERRMODE  => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
        PDO::ATTR_EMULATE_PREPARES => false,     //I know that emulation is important but not too sure how this relates 
    );

    try {
        $pdo = new PDO($dsn, $username, $password, $opt);
        // $conn = new PDO($dsn, $username, $password);
        // // set the PDO error mode to exception
        // $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        // echo "Connected successfully";

    } catch(PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }

?>