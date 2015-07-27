$(function() {
    $('#reg-form_org_confirm').on('click', function() {
        clearAuthMessages();
        
        var form = $($(this).closest('form'));
        var message = '';
        var data = form.serialize();
        var dataFields = form.serializeArray();
        for (var i = 0, len = dataFields.length; i < len; i++) {
            if (dataFields[i].name == 'email') {
                var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                if (!re.test(dataFields[i].value)) {
                    message = window.templates['email_invalid']({options: {lang: window.page.lang}});
                    showAuthMessage(message);
                    return false
                }
            }
        }
        $.ajax({
            method: 'POST',
            url: '/users/register/',
            data: data,
            success: function(res) {
                var status = res.status;
                if (status === 'success') {
                    $('.auth-messagebox').addClass('hidden').html('');
                    $('.auth-window').addClass('hidden');
                    $('div.reg-success').removeClass('hidden');
                } else if (status === 'error') {
                    var reason = res.reason;
                    switch (reason){
                        case 'emailExists':
                            message = window.templates['email_exists']({options: {lang: window.page.lang}});
                            break;
                    }

                }

                showAuthMessage(message);
            },
            error: function(err) {
                message = 'Something went wrong! Try to register later...';
                showAuthMessage(message);
            }
        });
        return false
    });

    $('#login-form_org_confirm').on('click', function() {
        clearAuthMessages();
        var form = $($(this).closest('form'));

        var passInput = form.find('input[name="pass"]');
        var hash = window.sha1Hash(passInput.val());

        if (!!hash) {
            form.find('input[name="password"]').val(hash);
            passInput.val('');
            form.submit();
        } else {
            //showRequired(passInput)
        }
    });

    $('.login-popup input').on('keyup', function() {
        clearAuthMessages();
    });


    function validateInput(value, type) {

    }

    function showAuthMessage (text) {
        var messageBox = $('.auth-messagebox');
        messageBox.removeClass('hidden').html(text);
    }

    function clearAuthMessages () {
        var messageBox = $('.auth-messagebox');
        messageBox.addClass('hidden').html('');
    }


});
