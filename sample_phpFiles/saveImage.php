<?php

    $uploaddir = './pictures/';
    $uploadfile = $uploaddir . basename($_FILES['uploadPicture']['name']);

    $msg = "";
    if (move_uploaded_file($_FILES['uploadPicture']['tmp_name'], $uploadfile)) {
      echo "File is valid, and was successfully uploaded.\n";
    } else {
      echo "Upload failed";
    }



?>
