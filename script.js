$(document).ready(function(){
    // Show Add Modal
    $('#add').on('click', function() {
        $('#modal-add').addClass('show');
    });

    // Show Edit Modal (delegated)
    $(document).on('click', '.edit-action', function() {
        const id = $(this).data('id');
        // Fetch user data by id (Ajax) and fill the form
        $.get('fetch.php', function(users){
            users = JSON.parse(users);
            const user = users.find(u => u.id == id);
            if(user){
                $('#modal-update input[name="name"]').val(user.name);
                $('#modal-update input[name="email"]').val(user.email);
                $('#modal-update').data('id', id).addClass('show');
            }
        });
    });

    // Show Delete Modal (delegated)
    $(document).on('click', '.delete-action', function() {
        const id = $(this).data('id');
        $('#modal-delete').data('id', id).addClass('show');
    });

    // Hide modals
    $('.modal-close, .modal-btn[data-modal]').on('click', function() {
        $('#' + $(this).data('modal')).removeClass('show');
    });

    // Add User
    $('#form-add').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            url: 'add.php',
            type: 'POST',
            data: $(this).serialize(),
            success: function(response){
                fetchRecords();
                $('#modal-add').removeClass('show');
                $('#form-add')[0].reset();
            }
        });
    });

    // Update User
    $('#form-update').on('submit', function(e){
        e.preventDefault();
        const id = $('#modal-update').data('id');
        $.ajax({
            url: 'update.php',
            type: 'POST',
            data: $(this).serialize() + '&id=' + id,
            success: function(response){
                fetchRecords();
                $('#modal-update').removeClass('show');
            }
        });
    });

    // Delete User
    $('#confirm-delete').on('click', function(){
        const id = $('#modal-delete').data('id');
        $.ajax({
            url: 'delete.php',
            type: 'POST',
            data: {id: id},
            success: function(response){
                fetchRecords();
                $('#modal-delete').removeClass('show');
            }
        });
    });

    // Fetch records function
    function fetchRecords() {
        $.ajax({
            url: 'fetch.php',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                let rows = '';
                $.each(data, function(index, record) {
                    rows += `<tr>
                        <td><input type="checkbox" class="record-checkbox" data-id="${record.id}"></td>
                        <td>${record.id}</td>
                        <td>${record.name}</td>
                        <td>${record.email}</td>
                        <td>
                            <span class="edit-action" style="color:#2c6fff;cursor:pointer;text-decoration:underline;" data-id="${record.id}">Edit</span>
                            |
                            <span class="delete-action" style="color:#e74c3c;cursor:pointer;text-decoration:underline;" data-id="${record.id}">Delete</span>
                        </td>
                    </tr>`;
                });
                $('#user-table-body').html(rows);
            }
        });
    }

    // Initial fetch
    fetchRecords();
});