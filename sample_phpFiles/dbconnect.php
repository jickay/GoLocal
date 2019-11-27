<?php
$servername = "localhost";                  //need to find what port the db is running on
$username = "root";                         //user name, using root on test database
$password = "The1supersecretpassword";      //password for database
$db = "looseleaf";                      //name of database
$cs = 'utf8';                               //characterset, not sure if important to specify

$dsn = "mysql:host=" . $servername . ";port=8080;dbname=" . $db . ";charset=" . $cs;

$opt = array(
    PDO::ATTR_ERRMODE  => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
    PDO::ATTR_EMULATE_PREPARES => false,     //I know that emulation is important but not too sure how this relates 
);

try {
    $pdo = new PDO($dsn, $username, $password, $opt);
    }
catch(PDOException $e)
    {
    echo "Connection failed: " . $e->getMessage();
    }

?>