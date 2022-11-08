<?php
    $Name = $_POST['Name'];
    $EmailID = $_POST['EmailID'];
    $PhoneNo = $_POST['PhoneNo'];
    $pass1 = $_POST['pass1'];
    $pass2 = $_POST['pass2'];
    $conn = new mysqli('localhost:3307','root','','signup_emoplayer');
    if ($conn -> connect_errno) {
        echo "Failed to connect to MySQL: " . $conn -> connect_error;
        exit();
      }else{ 
        $stmt = $conn->prepare('insert into signup(Name,EmailID,PhoneNo,pass1,pass2) values(?,?,?,?,?)');
        $stmt->bind_param('ssiss',$Name,$EmailID,$PhoneNo,$pass1,$pass2);
        $stmt->execute();
        echo "Registered sucessfully!";
        $stmt->close();
        $conn->close();
    }
?>