$(function () {
    if (window.page.name !== 'editVacancy') {
        return false;
    }


    var datePicker = $('.kit_date-picker');


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

    $('input[name="fullTime"]').on('ifChecked', function () {
        $('input[name="pastTime"]').iCheck('uncheck');
    });
    $('input[name="pastTime"]').on('ifChecked', function () {
        $('input[name="fullTime"]').iCheck('uncheck');
    });

    $('#edit-vacancy_button').on('click', function () {
        var form = $('#update-vacancy_form');

        var allRequiredComplete = true;

        $('.required').each(function() {
            if (!validateSimpleInput(this)) {
                allRequiredComplete = false;
                return false;
            }
        });

        if(!allRequiredComplete) {
            return false;
        } else {
            form.submit();
            return false;
        }

    });

    function validateSimpleInput(input) {
        if (!$(input).val()) {
            scrollTo(input);
            $(input).addClass('required-warning');
            return false
        }

        return true
    }

    function scrollTo(elem) {
        $('html, body').animate({
            scrollTop: $(elem).offset().top
        }, 1200);
    }
});
