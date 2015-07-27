$(function() {
    if (window.page.name !== 'index') {
        return false;
    }
    var slideSpeed = 8000;
    function Slider() {
        if (this instanceof Slider) {
            return this;
        } else {
            return new Slider();
        }
    }

    Slider.prototype = {
        container: $('.slider'),
        wrapper: $('.slides-wrapper'),
        autorollInterval: null,
        totalSlides: $('#slides-qty').val()
    };

    Slider.prototype.startAutoroll = function() {
        var _that = this;
        this.autorollInterval = setInterval(function() {
            if(_that.getCurrentSlide() == _that.totalSlides) {
                _that.reset();
            } else {
                _that.nextSlide();
            }
        }, slideSpeed);
    };

    Slider.prototype.stopAutoroll = function() {
        clearInterval(this.autorollInterval);
        setTimeout(function() {
            slider.startAutoroll();
        }, slideSpeed)
    };

    Slider.prototype.nextSlide = function() {
        var currentSlide = this.getCurrentSlide();
        if(currentSlide == this.totalSlides) {
            return false;
        } else {
            this.setSlide(currentSlide + 1);
        }
    };

    Slider.prototype.prevSlide = function() {
        var currentSlide = this.getCurrentSlide();
        if(currentSlide == 1) {
            return false;
        } else {
            this.setSlide(currentSlide - 1);
        }
    };

    Slider.prototype.setSlide = function(pos) {
        var coords = (pos -1) * 960;
        $('.slide:not("#slide' + pos + '")').addClass('slide_inactive');
        $('#slide' + pos).removeClass('slide_inactive');
        this.wrapper.css('left', '-' + coords + 'px');
        this._setIndicator(pos);
        //swapSlideImg(pos);
    };

    Slider.prototype.reset = function() {
        var _that = this;
        $('.slide').addClass('slide_inactive');
        setTimeout(function() {
            _that.wrapper.css('left', '0px');
            _that._setIndicator('1');
            //swapSlideImg('1');
            $('#slide1').removeClass('slide_inactive');
        }, 1000);
    };

    Slider.prototype.getCurrentSlide = function() {
        return parseInt($('.slide-button_active').attr('id').match(/^slide-button([\d])/)[1]);
    };
    Slider.prototype._setIndicator = function(pos) {
        $('.slide-button').removeClass('slide-button_active');
        $('#slide-button' + pos).addClass('slide-button_active');
    };

    var slider = Slider();
    window.slider = slider;
    slider.startAutoroll();


    slider.container.on('click', '.slide-button', function() {
        var button = $(this);
        if(!button.hasClass('slide-button_active')) {
            var selectedSlide = parseInt(button.attr('id').match(/^slide-button([\d])/)[1]);
            slider.setSlide(selectedSlide);
            slider.stopAutoroll();
        }
        return false
    });

    $('.prev-slide').on('click', function() {
        slider.prevSlide();
        slider.stopAutoroll();
        return false
    });
    $('.next-slide').on('click', function() {
        slider.nextSlide();
        slider.stopAutoroll();
        return false
    });
    
    function swapSlideImg (pos) {
        $('.slide-pic_wrapper').fadeOut(500);
        $('#slide-pic' + pos).fadeIn(1500);
    }
});
