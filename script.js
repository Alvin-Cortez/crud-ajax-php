$(document).ready(function(){
    // Show Add Modal
    $('#add').on('click', function() {
        $('#modal-add').addClass('show');
    });

    // Show Edit Modal (delegated)
    $(document).on('click', '.edit-action', function() {
        const id = $(this).data('id');
        const name = $(this).data('name');
        const email = $(this).data('email');

        $('#update-name').val(name);
        $('#update-email').val(email);
        $('#modal-update').data('id', id).addClass('show');
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
            url: '/action/add.php',
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
            url: '/action/update.php',
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
            url: '/action/delete.php',
            type: 'POST',
            data: {id: id},
            success: function(response){
                fetchRecords();
                $('#modal-delete').removeClass('show');
            }
        });
    });

    // Fetch records function
    function fetchRecords(page = 1) {
        $.ajax({
            url: '/action/fetch.php',
            type: 'POST',
            data: {page:page},
            dataType: 'json',
            success: function(response){
                if(response.status === 'success'){
                    let html = '';
                    let i = 1;
                    $.each(response.data, function(index, record) {
                        html += `<tr>
                            <td>${i++}</td>
                            <td>${record.name}</td>
                            <td>${record.email}</td>
                            <td>
                                <span class="edit-action" style="color:#2c6fff;cursor:pointer;text-decoration:underline;" data-id="${record.id}" data-name="${record.name}" data-email="${record.email}">Edit</span>
                                |
                                <span class="delete-action" style="color:#e74c3c;cursor:pointer;text-decoration:underline;" data-id="${record.id}">Delete</span>
                            </td>
                        </tr>`;
                    });
                    $('#user-table-body').html(html);

                    //Pagination
                    let paginationHtml = '';
                    for(let j = 1; j <= response.totalPages; j++){
                        paginationHtml += `<button class="page-btn" data-page=${j}>${j}</button>`
                    }
                    $('.pagination').html(paginationHtml);
                } else {
                    $('#user-table-body').html('<tr><td colspan="4">No records found</td></tr>');
                }
            }
        });
    }

    $(document).on('click', '.page-btn', function() {
        const page = $(this).data('page');
        fetchRecords(page);
    });

    // Search functionality
    $(document).on('keyup', '#search', function(){
        const query = $(this).val();
        searchRecords(query);
    });

    function searchRecords(query){
        $.ajax({
            type: "POST",
            url: "/action/search.php",
            data: {search : query},
            dataType: "json",
            success: function (response) {
                if(response.status === 'success'){
                    let html = '';
                    let i = 1;
                    $.each(response.data, function (index, user) { 
                       html += `<tr>
                            <td>${i++}</td>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td>
                                <span class="edit-action" style="color:#2c6fff;cursor:pointer;text-decoration:underline;" data-id="${user.id}" data-name="${user.name}" data-email="${user.email}">Edit</span>
                                |
                                <span class="delete-action" style="color:#e74c3c;cursor:pointer;text-decoration:underline;" data-id="${user.id}">Delete</span>
                            </td>
                        </tr>`;
                    });
                    $('#user-table-body').html(html);
                } else {
                    $('#user-table-body').html('<tr><td colspan="4">No records found</td></tr>');
                }
            }
        });
    }
    
    // Initial fetch
    fetchRecords();
});