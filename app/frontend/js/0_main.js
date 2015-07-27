
$(function () {
    window.page = {
        name: $('body').attr('id'),
        lang: $('.locale-switcher').not('hidden').hasClass('en')?'en':'nl',
        overlay: $('.overlay'),
        showMessage: function (message) { //message could be a string of text/html, or an jQuery object (popup instance)
            this.overlay.removeClass('hidden');
            
            if (typeof message === 'object') {
                message.removeClass('hidden');
            } else if (typeof message === 'string') {
                $('#message-box').html(message);
                $('#messages_popup').removeClass('hidden');
            }
            
            this.overlay.off('click').on('click', function (evt) {
                if ($(evt.target).hasClass('popup-content_align')) {
                    return false;
                }
                window.page.hidePopups();
            });
            document.addEventListener('keydown', closePopupByEsc);
        },
        hidePopups: function() {
            this.overlay.addClass('hidden');
            $('.popup').addClass('hidden');
    
            document.removeEventListener('keydown', closePopupByEsc);
        },
        scrollTo: function (elem) {
            $('html, body').animate({
                scrollTop: $(elem).offset().top
            }, 1200);
        }
        
    };
    function closePopupByEsc (evt) {
        if(evt.keyCode == 27) {
            window.page.hidePopups();
        }
    }
});
