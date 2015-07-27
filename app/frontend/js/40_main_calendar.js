$(function () {
    if (window.page.name !== 'index') {
        return false;
    }
    var body = $('body');
    
    var mainCalendar = {
        update: function(date) {
            
            if (!date) {
                date =  $('.selected-date').val();
            }
            
            var filtersData = $('#calendar-filters').serialize();
            var requestUrl = '/update/calendar?date=' + date + '&' + filtersData;
            $.get(requestUrl, function(responce) {
                var content = window.templates.main_events_cal(responce);
                $('#calendar-wrapper').html(content);
                $('input.custom-checkbox').iCheck({
                    checkboxClass: 'icheckbox_minimal',
                    radioClass: 'iradio_minimal',
                    increaseArea: '20%'
                });
                updateContent();
            })
        }
    };


    body.on('click', '.calendar_prev-month', function () {
        var current =  $('.selected-date').val().split('-');
        current[1] = (Number(current[1]) - 1).toString();
        mainCalendar.update(current.join('-'));
    });

    body.on('click', '.calendar_next-month', function () {
        var current =  $('.selected-date').val().split('-');
        current[1] = (Number(current[1]) + 1).toString();
        mainCalendar.update(current.join('-'));
    });

    body.on('click', '.show-events_button:not(.daynum-empty)', function() {
        var targetId = $(this).attr('id').replace('button', 'events');

        window.page.showMessage($('#' + targetId));
    });
    body.on('click', '.day-events_close', function() {
        window.page.hidePopups();
    });

    body.on('click', '.day-events_left', function() {
        var parent = $(this).parent();
        var currentOpenEvt = parent.find('.day-event').not('.hidden');
        var currentOpenNum = Number(currentOpenEvt.attr('class').replace('day-event day-event', ''));
        var nextEvt = $('.day-event' + (currentOpenNum - 1));
        var hasEventBeforeNext = !!$('.day-event' + (currentOpenNum - 2 )).length > 0 ;

        parent.find('.day-events_right').removeClass('hidden');
        if (!hasEventBeforeNext) {
            parent.find('.day-events_left').addClass('hidden');
        }
        
        if(!!nextEvt) {
            parent.find('.day-event').each(function() {
                $(this).addClass('hidden');
            });
            nextEvt.removeClass('hidden');
        }
    });

    body.on('click', '.day-events_right', function() {
        var parent = $(this).parent();
        var currentOpenEvt = parent.find('.day-event').not('.hidden');
        var currentOpenNum = Number(currentOpenEvt.attr('class').replace('day-event day-event', ''));
        
        var nextEvt = parent.find('.day-event' + (currentOpenNum + 1));
        var hasEventAfterNext = !!parent.find('.day-event' + (currentOpenNum + 2 )).length > 0;
        parent.find('.day-events_left').removeClass('hidden');
        if (!hasEventAfterNext) {
            parent.find('.day-events_right').addClass('hidden');
        }
        if(!!nextEvt) {
            parent.find('.day-event').each(function() {
                $(this).addClass('hidden');
            });
            nextEvt.removeClass('hidden');
        }
        
        

    });

    body.on('click', function (evt) {
        var tgt = $(evt.target);
        if(tgt.hasClass('filters-reminder') || tgt.parent().hasClass('calendar-filters_wrapper')) {
            return false;
        }

        var wrapper = $('.calendar-filters_wrapper');
        var state = wrapper.hasClass('open');
        
        if (!!state && !(tgt.hasClass('custom-checkbox_label') || tgt.hasClass('iCheck-helper'))) {
            mainCalendar.update();
        }
    });
    
    
    // Events search
    var form = $('#cal-search-filters');

    form.on('submit', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();

        $.ajax({
            url: form.attr('action'),
            data: form.serialize(),
            dataType: 'JSON',
            success: function(data) {
                $('#cal-search-results').html(window.templates.events_search_list({options: data.page.searchResult}));
            },
            error: function (err) {
                $('#cal-search-results').html('<p class="message">Service not available.</p>');
            }
        });
        return false;
    });
    $(document).on('emptyinput', function () {
        form.submit();
    });

    $('#cal-search').on('click', function () {
        if ($(this).hasClass('active')) {
            form.submit();
        }
        return false;
    });

    $(document).on('click', '.filter-button:not(".filter-button_active")', function () {
        var pressedButton = $(this);
        $('.filter-button').removeClass('filter-button_active');
        pressedButton.addClass('filter-button_active');
        $('input[name="sort"]').val(pressedButton.attr('id').replace(/^evt-sort-/, ''));
        form.submit();
        return false;
    });
    var datePicker = $('input[name="filterDatePicker"]').closest('.kit_date-picker'); 
    datePicker.pickmeup({
        'font-size': '16px',
        'first_day': 0,
        'prev': '',
        'next': '',
        'change': function(date) {
            console.log('tese')
            var dpButton = $(this);
            var input = dpButton.find('input');
            input.val(date);
            dpButton.find('span').html(dpButton.pickmeup('get_date', 'd.m.Y'));
            dpButton.pickmeup('hide');
            form.submit();
        }
    });

    $('#cal-evt-search').on('click', function () {
        if ($(this).hasClass('active')) {
            form.submit();
        }
    });

    $('.cal-search_filters').on('customSelectChange', function () {
        form.submit()
    });
    
    $(document).on('click', '#show-cal-view', function (evt) {
        hideEventsDatabase();
        return false;
    });
    
    updateContent();


    function updateContent() {
        var datePicker = $('input[name="calendarDatePicker"]').closest('.kit_date-picker');
        $('.calendar-filters_wrapper').on('click', function () {
            var wrapper = $(this);
            if(wrapper.hasClass('open')) {
                wrapper.removeClass('open');
                wrapper.find('.filters-reminder').removeClass('hidden');
                wrapper.find('form').addClass('hidden');
                mainCalendar.update($('.datepicker-input').val());
            } else {
                wrapper.addClass('open');
                wrapper.find('.filters-reminder').addClass('hidden');
                wrapper.find('form').removeClass('hidden');
            }
        });
        
        $(document).on('click', '#cal-external-search', function () {
            var button = $(this);
            var value = $('#event-search').val();
            
            if (button.hasClass('active')) {
                $('#cal-search-filters').find('input[name="searchText"]').val(value);
                $('#cal-search').trigger('click');
                showEventsDatabase();
            }
        });
        $('#back-to-list').on('click', function () {
            showEventsDatabase();
            return false;
        });
        $(document).on('click', function(evt) {
            if (!$(evt.target).closest('.day-events').length && !$(evt.target).is('.show-events_button:not(.daynum-empty)')) {
                $('.day-events').addClass('hidden');
            }
            
        });
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

                mainCalendar.update(dpButton.pickmeup('get_date', 'd-m-Y'));
                dpButton.pickmeup('hide');
            }
        });
    }

});

function showEventsDatabase() {
    $('footer').addClass('fixed');
    $('#cal-events-search').removeClass('hidden');
    $('#calendar-wrapper').addClass('hidden');
    $('.events-list').addClass('hidden');
    $('#cal-search-filters').submit();
}

function hideEventsDatabase() {
    $('footer').removeClass('fixed');
    $('#cal-events-search').addClass('hidden');
    $('#calendar-wrapper').removeClass('hidden');
    $('.events-list').removeClass('hidden');
    
}
