$(function () {
    if (window.page.name !== 'contacts') {
        return false;
    }

    var contactsForm = $('#contacts-message');
    var required = $('.required');
    contactsForm.on('submit', function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        
        $.ajax({
            url: contactsForm.attr('action'),
            data: contactsForm.serialize(),
            dataType: 'JSON',
            success: function(data) {
                $('.overlay').removeClass('hidden');
                $('#message-success_popup').removeClass('hidden');
            
                $('.overlay').off('click').on('click', function (evt) {
                    if ($(evt.target).hasClass('popup-content_align')) {
                        return false;
                    }
                    hidePopup();
                });
                document.addEventListener('keydown', closePopupByEsc);
            },
            error: function (err) {
                $('#contacts-message').html('<p class="message">Service not available.</p>');
            }
        })
    });
    
    $('#contacts-message_send_').on('click', function () {
        $(this).addClass('.disabled');
        var allRequiredComplete = true;
        
        required.each(function() {
            if (!validateSimpleInput(this)) {
                allRequiredComplete = false;
                return false;
            }
        });
        
        if(!allRequiredComplete) {
            return false;
        } else {
            contactsForm.submit();
            return false;
        }
    });
    required.on('change', function() {
        $(this).removeClass('required-warning')
    });
    required.on('blur', function() {
        $(this).removeClass('required-warning')
    });
    function validateSimpleInput(input) {
        var value = $(input).val();
        if (!value || value.length < 3) {
            $(input).addClass('required-warning');
            return false
        }

        return true
    }
    
    function hidePopup() {
        $('.overlay').addClass('hidden');
        $('#message-success_popup').addClass('hidden');
        document.removeEventListener('keydown', closePopupByEsc);
    }
    function closePopupByEsc (evt) {
        if(evt.keyCode == 27) {
            hidePopup();
        }
    }

});
