$(function () {
    if (window.page.name !== 'editEvent') {
        return false;
    }


    var datePicker = $('.kit_date-picker');
    var allAudCheckbox = $('input[name="aud_Everyone"]');


    datePicker.pickmeup({
        'font-size': '16px',
        'first_day': 0,
        'prev': '',
        'next': '',
        'change': function(date) {
            var dpButton = $(this);
            var input = dpButton.find('input');
            input.val(date);
            dpButton.find('span').html(dpButton.pickmeup('get_date', 'd.m.Y'));
            dpButton.removeClass('required-warning');

            dpButton.pickmeup('hide')
        }
    });

    $('#update-event_button').on('click', function () {
        var form = $('#update-event_form');

        var allRequiredComplete = true;

        $('.required').each(function() {
            if (!validateSimpleInput(this)) {
                allRequiredComplete = false;
                return false;
            }
        });

        if(!allRequiredComplete) {
            return false;
        }
        if (!$('select[name="eventType"] option:selected').val()) {
            var typeCustomSelect = $('select[name="eventType"]').next();

            typeCustomSelect.addClass('required-warning');
            window.page.scrollTo(typeCustomSelect);

            allRequiredComplete = false;
            return false;
        }

        var contactsProvided = 0;
        $('.required-group').each(function() {
            if(!!$(this).val()) {
                contactsProvided++;
            }
        });

        if(contactsProvided == 0) {
            window.page.scrollTo($('.required-group').first());
            var timeout = 800;
            $('.required-group').each(function() {
                var that = $(this);

                setTimeout(function() {
                    clearRequiredGroup();
                    that.addClass('required-warning');
                }, timeout);
                timeout += 1000;

            });
            setTimeout(function() {
                clearRequiredGroup()
            }, timeout);
            return false;
        }

        if(!$('input[name="eventDate"]').val()) {
            window.page.scrollTo($('.kit_date-picker'));
            $('.kit_date-picker').addClass('required-warning');
            allRequiredComplete = false;
            return false;
        }
        if(!allRequiredComplete) {
            return false;
        } else {
            form.submit();
            return false;
        }

    });

    $('#upload-event_img').click(function(evt) {
        $('#event-img-input').click();
    });

    $('#upload-banner_img').click(function(evt) {
        $('#banner-img-input').click();
    });

    $('#update-org_img').click(function(evt) {
        $('#org-img-input').click();
    });


    $('#event-img-input').fileupload({
        dataType: 'json',
        start: function () {
            $('#event-img-container').addClass('disabled');
        },
        add: function (err, data) {
            var fileType = data.files[0].name.split('.').pop(), allowedtypes = 'jpeg,jpg,png,gif';
            if (allowedtypes.indexOf(fileType) < 0) {
                var text = templates.message({options: {text: 'Selected file is not an image. Please, pick another one.'}});
                window.page.showMessage(text);
                return false;
            } else {
                data.submit();
            }

        },
        done: function (e, data) {
            var result = data._response.result;
            var input = $('#event-img-path');
            if(result.status == 'success') {
                $('#event-img-container').html('<img height=236 width=236 src="' + result.path + ' ">');
                input.val(result.path);
            }
        },
        fail: function (err, data) {
            var text = templates.message({options: {text: 'Image upload failed. Please try another one, or reload page and upload it again.'}});
            window.page.showMessage(text);
        },
        always: function (err, data) {
            $('#event-img-container').removeClass('disabled');
        }
    });

    $('#banner-img-input').fileupload({
        dataType: 'json',
        start: function () {
            $('#banner-img-container').addClass('disabled');
        },
        add: function (err, data) {
            var fileType = data.files[0].name.split('.').pop(), allowedtypes = 'jpeg,jpg,png,gif';
            if (allowedtypes.indexOf(fileType) < 0) {
                var text = templates.message({options: {text: 'Selected file is not an image. Please, pick another one.'}});
                window.page.showMessage(text);
                return false;
            } else {
                data.submit();
            }

        },
        done: function (e, data) {
            var result = data._response.result;
            var input = $('#banner-img-path');
            if(result.status == 'success') {
                $('#banner-img-container').html('<img height=245 width=330 src="' + result.path + ' ">');
                input.val(result.path);
            }
        },
        fail: function (err, data) {
            var text = templates.message({options: {text: 'Image upload failed. Please try another one, or reload page and upload it again.'}});
            window.page.showMessage(text);
        },
        always: function (err, data) {
            $('#banner-img-container').removeClass('disabled');
        }
    });
    
    $('.audience-selector_wrapper').on('click', function () {
        var wrapper = $(this);
        if(wrapper.hasClass('open')) {
            wrapper.removeClass('open');
            wrapper.find('.audience-reminder').removeClass('hidden');
            wrapper.find('.aud-inner').addClass('hidden');
        } else {
            wrapper.addClass('open');
            wrapper.find('.audience-reminder').addClass('hidden');
            wrapper.find('.aud-inner').removeClass('hidden');
        }
    });

    allAudCheckbox.on('ifChecked', function() {
        $('.audience-selector_wrapper').find('input').each(function() {
            if ($(this).attr('name') != 'aud_Everyone') {
                $(this).iCheck('uncheck');
            }
        });
    });

    $('.custom-checkbox').on('ifChecked', function () {
        if ($(this).attr('name') !== 'aud_Everyone') {
            allAudCheckbox.iCheck('uncheck');
        }
    });

    //allAudCheckbox.iCheck('check');

    function validateSimpleInput(input) {
        if (!$(input).val()) {
            window.page.scrollTo(input);
            $(input).addClass('required-warning');
            return false
        }

        return true
    }

    function clearRequiredGroup() {
        $('.required-group').each(function() {
            $(this).removeClass('required-warning');
        });
    }
});
