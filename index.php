<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <title>CRUD w Ajax</title>
</head>
<body>
    <div class="container">
        <h1>CRUD w Ajax</h1>
        <p>Simple CRUD application using Ajax</p>
        <div class="buttons">
            <button id="add">Add</button>
            <button id="delete">Delete</button>
        </div>
        <table >
            <thead>
                <tr>
                    <th><input type="checkbox"></th>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="user-table-body">

            </tbody>
        </table>
        <div class="pagination">
            <button class="page-btn" disabled>&laquo;</button>
            <button class="page-btn active">1</button>
            <button class="page-btn">2</button>
            <button class="page-btn">3</button>
            <button class="page-btn">&raquo;</button>
        </div>
    </div>

    <!-- Add Modal -->
    <div id="modal-add" class="modal">
        <div class="modal-content">
            <span class="modal-close" data-modal="modal-add">&times;</span>
            <h2>Add User</h2>
            <form id="form-add" action="add.php" method="post">
                <label>Name</label>
                <input type="text" name="name" required>
                <label>Email</label>
                <input type="email" name="email" required>
                <div class="modal-actions">
                    <button type="submit" class="modal-btn primary">Add</button>
                    <button type="button" class="modal-btn" data-modal="modal-add">Cancel</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Update Modal -->
    <div id="modal-update" class="modal">
        <div class="modal-content">
            <span class="modal-close" data-modal="modal-update">&times;</span>
            <h2>Update User</h2>
            <form id="form-update">
            <label>Name</label>
            <input type="text" name="name" required>
            <label>Email</label>
            <input type="email" name="email" required>
            <div class="modal-actions">
                <button type="submit" class="modal-btn primary">Update</button>
                <button type="button" class="modal-btn" data-modal="modal-update">Cancel</button>
            </div>
            </form>
        </div>
    </div>

    <!-- Delete Modal -->
    <div id="modal-delete" class="modal">
        <div class="modal-content">
            <span class="modal-close" data-modal="modal-delete">&times;</span>
            <h2>Delete User</h2>
            <p>Are you sure you want to delete this user?</p>
            <div class="modal-actions">
            <button id="confirm-delete" class="modal-btn danger">Delete</button>
            <button type="button" class="modal-btn" data-modal="modal-delete">Cancel</button>
            </div>
        </div>
    </div>

    <!-- Delete All modal -->
    <div id="modal-delete-all" class="modal">
        <div class="modal-content">
            <span class="modal-close" data-modal="modal-delete-all">&times;</span>
            <h2>Delete User</h2>
            <p>Are you sure you want to delete those user?</p>
            <div class="modal-actions">
            <button id="confirm-delete" class="modal-btn danger">Delete</button>
            <button type="button" class="modal-btn" data-modal="modal-delete">Cancel</button>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
    
</body>
</html>