<?php 

    include '../db.php';

    $page = isset($_POST['page']) ? (int)$_POST['page'] : 1;
    $limit = 5;
    $offset = ($page - 1) * $limit;

    $totalResult = $conn->query("SELECT COUNT(*) as total FROM user");
    $totalRow = $totalResult->fetch_assoc();
    $totalPage = ceil($totalRow['total'] / $limit);

    $stmt = $conn->prepare("SELECT * FROM user ORDER BY id ASC LIMIT ?, ?");
    $stmt->bind_param("ii", $offset, $limit);

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
            'totalPages' => $totalPage,
            'message' => count($users) > 0 ? 'success' : 'No users found.'
        ]);

        $stmt->close();
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Query error']);
    }

    $conn->close();