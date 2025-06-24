<?php

    require_once 'db.php';

    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $name = $_POST['name'];
        $email = $_POST['email'];

        $stmt = "INSERT INTO user (name, email) VALUES ('$name', '$email')";
        if(mysqli_query($conn, $stmt)){
            echo json_encode(['status' => 'success', 'message' => 'User added successfully.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error adding user: ' . mysqli_error($conn)]);
        }

        mysqli_close($conn);
    }