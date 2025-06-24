<?php

    include 'db.php';

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $id = $_POST['id'];
        $name = $_POST['name'];
        $email = $_POST['email'];

        $query = "UPDATE user SET name = ?, email = ? WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ssi", $name, $email, $id);

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'User updated successfully.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to update user.']);
        }

        $stmt->close();
    }

    $conn->close();