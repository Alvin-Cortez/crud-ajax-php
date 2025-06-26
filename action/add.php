<?php

    require_once '../db.php';

    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $name = $_POST['name'];
        $email = $_POST['email'];

        $stmt = $conn->prepare("INSERT INTO user (name, email) VALUES (?, ?)");
        $stmt->bind_param("ss", $name, $email);

        if($stmt->execute()){
            echo json_encode(['status' => 'success', 'message' => 'User added successfully.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error adding user: ' . $stmt->error]);
        }

        $stmt->close();
        $conn->close();
    }