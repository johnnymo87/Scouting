$(document).ready(function() {
    var $loginDialog = $('#login-dialog').dialog({
        height: 300,
        modal: true,
        autoOpen: false
    });

    $('#login-tab').click(function(e) {
        e.preventDefault();

        $loginDialog.dialog('open');
        $('#login-dialog').removeClass('hidden');
    });
});