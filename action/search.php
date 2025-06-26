<?php

    require_once '../db.php';

    $search = trim($_POST['search'] ?? '');
    $limit = 5;

    if($search != ''){
        $search = "%$search%";
        $stmt = $conn->prepare('SELECT * FROM user WHERE name LIKE ? OR email LIKE ? LIMIT ?');
        $stmt->bind_param("ssi", $search, $search, $limit);
    } else {
        $stmt = $conn->prepare('SELECT * FROM user ORDER BY id ASC LIMIT ?');
        $stmt->bind_param("i", $limit);
    }

    if($stmt){
        $stmt->execute();
        $result = $stmt->get_result();
        $users = [];

        while($row = $result->fetch_assoc()){
            $users[] = $row;
        }

        echo json_encode([
            'status' => count($users) > 0 ? 'success' : 'empty',
            'data' => $users,
            'message' => count($users) > 0 ? '' : 'No users found' 
        ]);

        $stmt->close();
    }