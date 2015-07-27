$(function() {
    var header = $('header');

    header.on('click', '.login-link', function() {
        openLoginWindow();
    });
    header.on('click', '.profile-link', function() {
        //window.location.href = '/logout';

        $('.profile-menu').toggleClass('hidden');

        return false;
    });

    // Menu search
    header.on('click', '.search-button_inactive', function() {
        $('.menu_search').removeClass('search-inactive');
        $(this).removeClass('search-button_inactive')
    });

    header.on('click', '.search-button:not(.search-button_inactive)', function() {
        var searchInput = $('.menu_search');
        var searchText = searchInput.val();

        if(!!searchText) {
            $('#menu-search').submit();
        } else {
            searchInput.addClass('search-inactive');
            $(this).addClass('search-button_inactive')
        }
    });

    header.on('click', '.locale-switcher', function() {
        var  targetLang = ($(this).hasClass('en'))?'en':'nl';
        document.cookie = "selectedLang=" + targetLang;
        window.location.reload();

    });
    
    $(document).on('click', '.more-events_switch', function() {
        var moreSwitch = $(this);
        moreSwitch.parent().find('.more-event_container').removeClass('hidden');
        moreSwitch.addClass('hidden');
    });

    //common search
    $(document).on('keyup', '.input-search', function () {
        var input = $(this),
            value = input.val(),
            button = $('i.input-search_button');

        if (!!value) {
            input.addClass('active');
            button.addClass('active');
        } else {
            input.removeClass('active');
            button.removeClass('active');
            $(this).trigger('emptyinput');
        }
    });

    //login window popup
    function openLoginWindow() {
        $('.overlay').removeClass('hidden');
        $('#login-popup').removeClass('hidden');

        $('.overlay').on('click', function (evt) {
            if ($(evt.target).hasClass('popup-content_align')) {
                return false;
            }
            hideLoginWindow();
        });
        document.addEventListener('keydown', closePopupByEsc);
        $(document).on('closePopup', hideLoginWindow);
    }

    function closePopupByEsc (evt) {
        if(evt.keyCode == 27) {
            hideLoginWindow()
        }
    }

    function hideLoginWindow() {
        clearAuthMesages();
        $('.overlay').addClass('hidden');
        $('#login-popup').addClass('hidden');
        document.removeEventListener('keydown', closePopupByEsc);
        $(document).off('closePopup');
    }


    $('.signup_switch').on('click', function() {
        clearAuthMesages();
        $('.auth-window').addClass('hidden');
        $('div.register').removeClass('hidden');
    });
    $('.signin_switch').on('click', function() {
        clearAuthMesages();
        $('.auth-window').addClass('hidden');
        $('div.login').removeClass('hidden');
    });
    header.on('click', '.forgot-password_switch', function() {
        clearAuthMesages();
        $('.auth-window').addClass('hidden');
        $('div.recover-password').removeClass('hidden');
    });

    $('.popup-content').on('click', '.tab-switcher_inactive',  function() {
        var tabSwitcher = $(this);
        clearAuthMesages();
        $('.tab-switcher').each(function() {
            $(this).removeClass('tab-switcher_inactive');
        });

        if (tabSwitcher.hasClass('tab-switcher_org')) {
            $('.login-popup_com').each(function() {
                $(this).addClass('hidden');
            });
            $('.login-popup_org').each(function() {
                $(this).removeClass('hidden');
            });

            $('.tab-switcher_com').each(function() {
                $(this).addClass('tab-switcher_inactive');
            });
            $('.tab-switcher_org').each(function() {
                $(this).removeClass('tab-switcher_inactive');
            });

        } else if (tabSwitcher.hasClass('tab-switcher_com')) {
            $('.login-popup_org').each(function() {
                $(this).addClass('hidden');
            });
            $('.login-popup_com').each(function() {
                $(this).removeClass('hidden');
            });
            $('.tab-switcher_org').each(function() {
                $(this).addClass('tab-switcher_inactive');
            });
            $('.tab-switcher_com').each(function() {
                $(this).removeClass('tab-switcher_inactive');
            });
        }
    });


    /*
    * Content menu
    * */

    $('.content').on('click', '.menu-entry:not(".menu-entry_active")', function() {
        var entry = $(this);
        var tabId = entry.attr('id').replace(/^entry_/, '');

        entry.closest('.content-menu').find('.menu-entry_active').removeClass('menu-entry_active');
        entry.addClass('menu-entry_active');

        $('.content-menu_tab').each(function() {
            $(this).addClass('hidden');
        });
        $('#' + tabId).removeClass('hidden');
        
        window.location.hash = '!' + tabId
    });

    function clearAuthMesages () {
        var messageBox = $('.auth-messagebox');
        messageBox.addClass('hidden').html('');
    }

    /*
    * Custom controls
    * */

    $('.custom-select').selectbox({
        onChange: function (val, inst) {
            var appearance = inst.input.next();
            appearance.removeClass('required-warning');
            appearance.find('.sbSelector').addClass('sbSelector_active');
            $(this).trigger('customSelectChange')
        },
        effect: "slide"
    });


    $('input.custom-checkbox').iCheck({
        checkboxClass: 'icheckbox_minimal',
        radioClass: 'iradio_minimal',
        increaseArea: '20%' 
    });

    /*
    * Inputs
    * */
    $('.number-input').on('keyup', function (evt) {
        var input = $(this);
        if (evt.keyCode != 8) {
            if(!Number(input.val())) {
                input.val('');
            }
        }
         
    });
    $('.number-input').on('blur', function () {
        var input = $(this);
        if(!Number(input.val())) {
            input.val('0');
        }
    });

    $('.hours-input').on('keyup', function (evt) {
        var input = $(this);
        if (evt.keyCode != 8) {
            if(!Number(input.val()) || Number(input.val()) > 24 || Number(input.val()) < 0) {
                input.val('00');
            }
        }
    });
    $('.hours-input').on('blur', function (evt) {
        var input = $(this);
        var val = Number(input.val());
        if (val >=0 && val < 10) {
            input.val('0' + val);
            return false;
        }
        if(!val || val > 24 || val < 0) {
            input.val('00');
        }
    });

    $('.minutes-input').on('keyup', function (evt) {
        var input = $(this);
        var val = Number(input.val());
        if (evt.keyCode != 8) {
            if(!val || val > 60 || val < 0) {
                input.val('00');
            }
        }
    });
    $('.minutes-input').on('blur', function (evt) {
        var input = $(this);
        var val = Number(input.val());
        
        if (val >=0 && val < 10) {
            input.val('0' + val);
            return false;
        }
        if(!val || val > 60 || val < 0) {
            input.val('00');
        }
    });
    
    /*
      *Popups
     */
    $('.popup_close').on('click', function (evt) {
        closePopups();
    });

    $(document).on('click', '#message-ok', function (evt) {
        closePopups();
    });
    
    function closePopups () {
        $('.overlay').addClass('hidden');
        $('.popup').addClass('hidden');
        document.removeEventListener('keydown', closePopupByEsc);
    }

    //Organization names autocompletable input
    
    if (window.page.name === 'editEvent' || window.page.name === 'personal') {
        var searchInput = $('#sponsorSearch');
        var autocomplete = {
            input: searchInput,
            container: searchInput.parent(),
            hostsDisplay: $('.co-hosts_selected'),
            selectedHosts: {}, //Selected co-hosts list stored by id
            lastRequest: null,
            dropdown: $('.co-hosts_dropdown'),
            init: function () {
                var that = this;
                if (window.page.name === 'editEvent') {
                    $('.selected-host_item').each(function() {
                        var hostId = $(this).attr('id').replace('co-host_', '');
                        that.selectedHosts[hostId] = true;
                    });
                }
                
                this.input.on('keyup', function (evt) {
                    var text = $(this).val();
                    if (!!text && text.length > 1) {
                        that._sendRequest(text);
                    } else {
                        that._hideDropdown();
                    }
                });
                this.container.on('click', '.searchresult_item', function(evt) {
                    var target = $(evt.target);
                    var hostOptions = {
                        name: target.data('name'),
                        id: target.data('id')
                    };
                    
                    that._addHost(hostOptions)
                });
                this.container.on('click', '.remove-host_button', function(evt) {
                    evt.preventDefault();
                    var hostId = $(evt.target).attr('id').replace('remove-host_', '');
                    that._removeHost(hostId);
                    return false;
                });
            },
            _addHost: function (hostOptions) {
                if(!!this.selectedHosts[hostOptions.id]) {
                    return false;
                }
                var content = window.templates.selected_co_host({options: hostOptions});
                this.hostsDisplay.append(content);
                this.selectedHosts[hostOptions.id] = true;
                this._hideDropdown();
                this.input.val('');
            },
            _removeHost: function(hostId) {
                $('#co-host_' + hostId).remove();
                delete this.selectedHosts[hostId];
            },
            _sendRequest: function (text) {
                var that = this;
                if (!!this.lastRequest) {
                    this.lastRequest.abort();
                }
                this.lastRequest = $.ajax({
                    url: '/orgs/short-search',
                    method: 'GET',
                    data: {text: text},
                    success: function (response) {
                        that._applyRequestResults(response)
                    },
                    error: function (err) {
                        console.log(err)
                    }
                });
            },
            _applyRequestResults: function (response) {
                if(response.status === 'success') {
                    var content = window.templates.host_autocomplete_items({options: response});
                    this.dropdown.html(content).removeClass('hidden');
                    this.input.removeClass('incorrect');
                } else {
                    this.input.addClass('incorrect');
                    this._hideDropdown();
                }
            },
            _hideDropdown: function () {
                this.dropdown.html('').addClass('hidden');
            }
        };


        autocomplete.init();
    }
    
    
    
    
});
