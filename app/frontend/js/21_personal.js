$(function() {
    if (window.page.name !== 'personal') {
        return false;
    }


    var datePicker = $('.kit_date-picker');
    var allAudCheckbox = $('input[name="aud_Everyone"]');
    var eventsSearchForm = $('#events-search-form');
    var vacansiesSearchForm = $('#vacancies-search-form');
    var addVacancyForm = $('#add-vacancy-form');
    var addEventform = $('#add-event_form');

    /*
         datepickers 
    */
    datePicker.pickmeup({
        'font-size': '16px',
        'first_day': 0,
        'prev': '',
        'next': '',
        'change': function(date) {
            var dpButton = $(this);
            var input = dpButton.find('input');
            var dateValues = date.split('-');
            var selectedDate = new Date(dateValues[2], Number(dateValues[1]) - 1, dateValues[0]);
            
            var past = selectedDate < new Date();
            if (!past) {
                input.val(date);
                dpButton.find('span').html(dpButton.pickmeup('get_date', 'd.m.Y'));
                dpButton.removeClass('required-warning');
            } else {
                var messageText = window.page.lang == 'en'?'Cannot use past dates here!':'NL';
                var fullMessage = '<span class="error-message">' + messageText + '</span>';
                        
                input.val('');
                dpButton.find('span').html('-.-.-');
                window.page.showMessage(fullMessage)
            }
            

            dpButton.pickmeup('hide')
        }
    });
    
    /*
         Filters 
    */
    $(document).on('click', '.filter-button:not(".filter-button_active")', function () {
        var pressedButton = $(this);
        var form = $('#' + pressedButton.data('form'));

        pressedButton.parent().find('.filter-button').removeClass('filter-button_active');
        pressedButton.addClass('filter-button_active');
        $('input[name="sort"]').val(pressedButton.attr('id').replace(/^filter-/, ''));
        form.submit();
        return false;
    });
    $('input[name="searchText"]').on('keyup', function () {
        var input = $(this);
        var form = $('#' + input.data('form'));
        if (!input.val()) {
            eventsSearchForm.submit();
        }
    });

    /*
         invalid url warning
    */
    $('.input-url').on('blur', function () {
        var input = $(this);
        if(!validateUrl(input.val())) {
            input.addClass('url-warning');
        } else {
            input.removeClass('url-warning');
        }
    });
    /*
         required url cleanup
    */
    $('.required').on('change', function() {
        $(this).removeClass('required-warning')
    });

    /*
          tabs menu
    */
    $('.menu-entry:not(.menu-entry_active)').on('click', function () {
        var targetId = $(this).attr('id').replace(/^entry_/, '');
        $('.content-menu_tab').addClass('hidden');
        $('#' + targetId).removeClass('hidden')
    });
    //history api for tabs
    window.addEventListener('load', function(){
        if (this.history && this.history.pushState) {
            this.history.pushState('forward', null, '');
        }
    }, false);
    window.addEventListener('popstate', function(){
        loadMenuTab(window.location.hash.replace('#!', ''));
    }, false);
    //initial tab select
    loadMenuTab(window.location.hash.replace('#!', ''));

    /*
        settings and info
    */
    $('#org-img-input').fileupload({
        dataType: 'json',
        start: function () {
            $('.org-img_container').addClass('disabled');
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
        done: function (err, data) {
            var result = data._response.result;
            if(result.status == 'success') {
                $('.org-img_container').html('<img height=236 width=236 src="' + result.path + ' ">');
                $('#org-img-path').val(result.path)
            }
        },
        fail: function (err, data) {
            var text = templates.message({options: {text: 'Image upload failed. Please try another one, or reload page and upload it again.'}});
            window.page.showMessage(text);
        },
        always: function (err, data) {
            $('.org-img_container').removeClass('disabled');
        }
    });

    $('#update-info_button').on('click', function() {
        $('#personal-info').submit();
        return false;
    });

    $('#update-settings_button').on('click', function() {
        $('#personal-settings').submit();
            return false;
    });

    /*
         Events list
    */
    eventsSearchForm.on('submit', function(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        $.ajax({
            url: eventsSearchForm.attr('action'),
            data: eventsSearchForm.serialize(),
            dataType: 'JSON',
            success: function(data) {
                var output = window.templates.org_events_list({options: {events: data.events, i18n: data.i18n}});
                $('#search-results').html(output);
            },
            error: function(err) {
                $('#search-results').html('<p class="message">No results found!</p>');
            }
        })
    });
    
    $(document).on('click', '#event-search.active', function() {
        eventsSearchForm.submit();
    });

    $(document).on('click', '.delete-event', function() {
        var id = $(this).data('evtid');
        $('input[name="eventToDelete"]').val(id);
        window.page.showMessage($('#delete-evt_popup'));
        return false;
    });
    $(document).on('click', '.delete-vacancy', function() {
        var id = $(this).data('vacid');
        
        $('input[name="vacancyToDelete"]').val(id);
        window.page.showMessage($('#delete-vac_popup'));
        return false;
    });
    
    $('#delete-confirm_no').on('click', function () {
        window.page.hidePopups();
    });
    $('#vac-delete-confirm_no').on('click', function () {
        window.page.hidePopups();
    });

    $('#delete-confirm_yes').on('click', function () {
        $('#delete-event_form').submit();
    });
    $('#vac-delete-confirm_yes').on('click', function () {
        $('#delete-vacancy_form').submit();
    });

    /*
         vacancies
    */
    $('#add-vacancy_button').on('click', function () {
        var allRequiredComplete = true;

        addVacancyForm.find('.required').each(function() {
            if (!validateSimpleInput(this)) {
                allRequiredComplete = false;
                return false;
            }
        });
        if(!allRequiredComplete) {
            return false;
        } else {
            addVacancyForm.submit();
        }


    });

    vacansiesSearchForm.on('submit', function(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        $.ajax({
            url: vacansiesSearchForm.attr('action'),
            data: vacansiesSearchForm.serialize(),
            dataType: 'JSON',
            success: function(data) {
                var output = window.templates.org_vacancies_list({options: {vacancies: data.vacancies, i18n: data.i18n}});
                $('#vacancies-search-results').html(output);
            },
            error: function(err) {
                $('#vacancies-search-results').html('<p class="message">No results found!</p>');
            }
        })
    });

    $(document).on('click', '#vacancy-search.active', function() {
        vacansiesSearchForm.submit();
    });
    
    $('#add-vacancy-switch').on('click', function () {
        vacansiesSearchForm.addClass('hidden');
        addVacancyForm.removeClass('hidden');
    });
    $('#vacancy-list-switch').on('click', function () {
        vacansiesSearchForm.removeClass('hidden');
        addVacancyForm.addClass('hidden');
    });

    $('input[name="fullTime"]').on('ifChecked', function () {
        $('input[name="pastTime"]').iCheck('uncheck');
    });
    $('input[name="pastTime"]').on('ifChecked', function () {
        $('input[name="fullTime"]').iCheck('uncheck');
    });
    /*
        add new event
    */
    $('#upload-event_button').on('click', function () {
        var allRequiredComplete = true;

        addEventform.find('.required').each(function() {
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
            scrollTo(typeCustomSelect);

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
            scrollTo($('.required-group').first());
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
            $('html, body').animate({
                scrollTop: $('.kit_date-picker').offset().top
            }, 1200);
            $('input[name="eventDate"]').closest('.kit_date-picker').addClass('required-warning');
            allRequiredComplete = false;
            return false;
        }

        if(!allRequiredComplete) {
            return false;
        } else {
            addEventform.submit();
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

    /*
    * Event statistics
    * */
    
    $('body').on('click', '.event-stat', function () {
        var switcher = $(this);
        var parent = switcher.closest('.event-wrapper');
        var info = parent.find('.stats-info');
        var container = switcher.closest('.event-wrapper').find('.evt-stat');
        var localViews = info.find('input.stats-views').val();
        var postId = info.find('input[name="postId"]').val();

        switcher.addClass('active');
        parent.find('.event-controls').addClass('disabled');
        
        $.ajax({
            url: '/events/stats',
            data: {postId: postId},
            dataType: 'JSON',
            success: function(data) {
                var stats = {
                    views: localViews,
                    shares: data.shares,
                    likes: data.likes
                };
                var content = window.templates.statistics({
                    options: {
                        stats: stats,
                        lang: window.page.lang
                    }
                });
                window.addEventListener('click', function (evt) {
                    hideStats(switcher, container)
                });
                parent.find('.event-controls').removeClass('disabled');
                container.html(content).removeClass('hidden');
            },
            error: function(err) {
                window.page.showMessage('Statistics service is temporary unavailable.');
                hideStats(switcher, container);
            },
            complete: function () {
                parent.find('.event-controls').removeClass('disabled');
            }
        });
        return false;
    });

    /* 
    * Images inputs
    * */
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
        done: function (err, data) {
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
        done: function (err, data) {
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

    $('body').on('click', function (evt) {
        var tgt = $(evt.target);
        if(tgt.hasClass('audience-reminder') || tgt.parent().hasClass('audience-selector_wrapper')) {
            return false;
        }

        var wrapper = $('.audience-selector_wrapper');
        var state = wrapper.hasClass('open');
        if (!!state && !(tgt.hasClass('custom-checkbox_label') || tgt.hasClass('iCheck-helper'))) {

            wrapper.removeClass('open');
            wrapper.find('.audience-reminder').removeClass('hidden');
            wrapper.find('.aud-inner').addClass('hidden');
        }
    });

    $('.custom-checkbox').on('ifChecked', function () {
        if ($(this).attr('name') !== 'aud_Everyone') {
            allAudCheckbox.iCheck('uncheck');
        }
    });

    allAudCheckbox.iCheck('check');

    
    function validateSimpleInput(elem) {
        var input = $(elem);
        if (!input.val()) {
            scrollTo(elem);
            input.addClass('required-warning');
            return false
        }

        return true
    }

    function scrollTo(elem) {
        $('html, body').animate({
            scrollTop: $(elem).offset().top
        }, 1200);
    }

    function clearRequiredGroup() {
        $('.required-group').each(function() {
            $(this).removeClass('required-warning');
        });
    }
    
    function hideStats(switcher, container) {
        switcher.removeClass('active');
        container.addClass('hidden');
        window.removeEventListener('click', hideStats)
    }
    
    function loadMenuTab (tabId) {
        var id = '#entry_' + tabId;
        $(id).trigger('click');
    }
    
    function validateUrl (url) {
        // Regular Expression for URL validation
        //
        // Author: Diego Perini 
        // Updated: 2010/12/05
        // License: MIT
        var regexp = new RegExp('^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$', 'i');
        return url.match(regexp);
    }
});
