
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

window.templates = {};
window.templates.common_search = function(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (options, page) {
jade_mixins["common_search"] = function(options){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var evtsLength= options.events.length
var orgsLength= options.orgs.length
var vacsLength= options.vacs.length
var i18n = options.i18n?options.i18n:page.i18n 
buf.push("<div class=\"search-stat\">");
if ( evtsLength > 0)
{
buf.push("<span class=\"search-stat_record\">Events<b>" + (jade.escape((jade_interp = evtsLength) == null ? '' : jade_interp)) + "</b></span>");
}
if ( orgsLength > 0)
{
buf.push("<span class=\"search-stat_record\">Organizations<b>" + (jade.escape((jade_interp = orgsLength) == null ? '' : jade_interp)) + "</b></span>");
}
if ( vacsLength > 0)
{
buf.push("<span class=\"search-stat_record\">Vacancies<b>" + (jade.escape((jade_interp = vacsLength) == null ? '' : jade_interp)) + "</b></span>");
}
buf.push("</div>");
if ( evtsLength > 0)
{
buf.push("<div class=\"common-search_result search-result_events\">");
// iterate [0, 1, 2, 3]
;(function(){
  var $$obj = [0, 1, 2, 3];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var counter = $$obj[$index];

var event = (!!options.events)?options.events[counter]:null
if ( event)
{
jade_mixins["event_item"](event);
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var counter = $$obj[$index];

var event = (!!options.events)?options.events[counter]:null
if ( event)
{
jade_mixins["event_item"](event);
}
    }

  }
}).call(this);

if ( evtsLength> 4)
{
buf.push("<span class=\"more-event_container hidden\">");
// iterate options.events
;(function(){
  var $$obj = options.events;
  if ('number' == typeof $$obj.length) {

    for (var i = 0, $$l = $$obj.length; i < $$l; i++) {
      var event = $$obj[i];

if ( i >= 4)
{
jade_mixins["event_item"](event);
}
    }

  } else {
    var $$l = 0;
    for (var i in $$obj) {
      $$l++;      var event = $$obj[i];

if ( i >= 4)
{
jade_mixins["event_item"](event);
}
    }

  }
}).call(this);

buf.push("</span><a class=\"more-events_switch\">" + (jade.escape((jade_interp = i18n.more) == null ? '' : jade_interp)) + "</a>");
}
buf.push("</div>");
}
if ( orgsLength > 0)
{
buf.push("<div class=\"common-search_result search-result_orgs\">");
// iterate [0, 1, 2, 3]
;(function(){
  var $$obj = [0, 1, 2, 3];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var counter = $$obj[$index];

var org = (!!options.orgs)?options.orgs[counter]:null
if ( org)
{
jade_mixins["org_item"](org);
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var counter = $$obj[$index];

var org = (!!options.orgs)?options.orgs[counter]:null
if ( org)
{
jade_mixins["org_item"](org);
}
    }

  }
}).call(this);

if ( orgsLength> 4)
{
buf.push("<span class=\"more-event_container hidden\">");
// iterate options.orgs
;(function(){
  var $$obj = options.orgs;
  if ('number' == typeof $$obj.length) {

    for (var i = 0, $$l = $$obj.length; i < $$l; i++) {
      var org = $$obj[i];

if ( i >= 4)
{
jade_mixins["org_item"](org);
}
    }

  } else {
    var $$l = 0;
    for (var i in $$obj) {
      $$l++;      var org = $$obj[i];

if ( i >= 4)
{
jade_mixins["org_item"](org);
}
    }

  }
}).call(this);

buf.push("</span><a class=\"more-events_switch\">" + (jade.escape((jade_interp = i18n.more) == null ? '' : jade_interp)) + "</a>");
}
buf.push("</div>");
}
if ( vacsLength > 0)
{
buf.push("<div class=\"common-search_result search-result_vacancies\">");
// iterate [0, 1, 2, 3]
;(function(){
  var $$obj = [0, 1, 2, 3];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var counter = $$obj[$index];

var vacancy = (!!options.vacs)?options.vacs[counter]:null
if ( vacancy)
{
jade_mixins["vac_item"](vacancy, i18n);
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var counter = $$obj[$index];

var vacancy = (!!options.vacs)?options.vacs[counter]:null
if ( vacancy)
{
jade_mixins["vac_item"](vacancy, i18n);
}
    }

  }
}).call(this);

if ( vacsLength> 4)
{
buf.push("<span class=\"more-event_container hidden\">");
// iterate options.vacs
;(function(){
  var $$obj = options.vacs;
  if ('number' == typeof $$obj.length) {

    for (var i = 0, $$l = $$obj.length; i < $$l; i++) {
      var vacancy = $$obj[i];

if ( i >= 4)
{
jade_mixins["vac_item"](vacancy, i18n);
}
    }

  } else {
    var $$l = 0;
    for (var i in $$obj) {
      $$l++;      var vacancy = $$obj[i];

if ( i >= 4)
{
jade_mixins["vac_item"](vacancy, i18n);
}
    }

  }
}).call(this);

buf.push("</span><a class=\"more-events_switch\">" + (jade.escape((jade_interp = i18n.more) == null ? '' : jade_interp)) + "</a>");
}
buf.push("</div>");
}
if ( evtsLength == 0 && orgsLength == 0 && vacsLength == 0)
{
buf.push("<p class=\"message\">No results found!</p>");
}
};
jade_mixins["event_item"] = function(event){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<span class=\"event-wrapper\"><a target=\"_blank\"" + (jade.attr("href", '/events/get?id=' + event._id, true, false)) + "><img height=\"90\" width=\"90\"" + (jade.attr("src", "" + (event.image) + "", true, false)) + "/></a><a target=\"_blank\"" + (jade.attr("href", '/events/get?id=' + event._id, true, false)) + "><h2>" + (jade.escape((jade_interp = event.eventName) == null ? '' : jade_interp)) + "</h2></a><span class=\"event-category\">" + (jade.escape((jade_interp = event.eventType) == null ? '' : jade_interp)) + "</span><br/><span class=\"event-date\">" + (jade.escape((jade_interp = event.friendlyDate) == null ? '' : jade_interp)) + "</span></span>");
};
jade_mixins["org_item"] = function(org){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<a target=\"_blank\"" + (jade.attr("href", '/orgs/get?id=' + org._id, true, false)) + "><h2>" + (jade.escape((jade_interp = org.name) == null ? '' : jade_interp)) + "</h2></a>");
};
jade_mixins["vac_item"] = function(vacancy, i18n){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<span class=\"event-wrapper\"><a target=\"_blank\"" + (jade.attr("href", '/vacancies/get?id=' + vacancy._id, true, false)) + "><h2>" + (jade.escape((jade_interp = vacancy.vacancyName) == null ? '' : jade_interp)) + "</h2></a>");
if ( vacancy.fullTime)
{
buf.push("<span class=\"event-category\">" + (jade.escape((jade_interp = i18n.fullTime) == null ? '' : jade_interp)) + "</span>");
}
else if ( vacancy.pastTime)
{
buf.push("<span class=\"event-category\">" + (jade.escape((jade_interp = i18n.pastTime) == null ? '' : jade_interp)) + "</span>");
}
buf.push("<span class=\"event-date\">" + (jade.escape((jade_interp = vacancy.friendlyDate) == null ? '' : jade_interp)) + "</span></span>");
};
jade_mixins["common_search"](options);}.call(this,"options" in locals_for_with?locals_for_with.options:typeof options!=="undefined"?options:undefined,"page" in locals_for_with?locals_for_with.page:typeof page!=="undefined"?page:undefined));;return buf.join("");
}
window.templates.email_exists = function(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (options) {
buf.push("<span class=\"auth-messageBox_content\">");
if ( options.lang == 'en')
{
buf.push("<p>This e-mail is already registered.</p>");
}
else
{
buf.push("<p>Het e-mail is al geregistereerd in ons systeem.</p>");
}
buf.push("</span>");}.call(this,"options" in locals_for_with?locals_for_with.options:typeof options!=="undefined"?options:undefined));;return buf.join("");
}
window.templates.email_invalid = function(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (options) {
buf.push("<span class=\"auth-messageBox_content\">");
if ( options.lang == 'en')
{
buf.push("<p>E-mail is not correct.</p>");
}
else
{
buf.push("<p>E-mail is niet juist.</p>");
}
buf.push("</span>");}.call(this,"options" in locals_for_with?locals_for_with.options:typeof options!=="undefined"?options:undefined));;return buf.join("");
}
window.templates.events_search_list = function(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (options) {
jade_mixins["events_search_list"] = function(options){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var len = options.events.length
if ( len > 0)
{
// iterate [0, 1, 2, 3, 4, 5, 6, 7]
;(function(){
  var $$obj = [0, 1, 2, 3, 4, 5, 6, 7];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var counter = $$obj[$index];

var event = (!!options.events)?options.events[counter]:null
if ( event)
{
buf.push("<span class=\"event-wrapper\"><a target=\"_blank\"" + (jade.attr("href", '/events/get?id=' + event._id, true, false)) + "><img height=\"90\" width=\"90\"" + (jade.attr("src", "" + (event.image) + "", true, false)) + "/></a><a target=\"_blank\"" + (jade.attr("href", '/events/get?id=' + event._id, true, false)) + "><h2>" + (jade.escape((jade_interp = event.eventName) == null ? '' : jade_interp)) + "</h2></a><span class=\"event-category\">" + (jade.escape((jade_interp = event.eventType) == null ? '' : jade_interp)) + "</span><br/><span class=\"event-date\">" + (jade.escape((jade_interp = event.friendlyDate) == null ? '' : jade_interp)) + "</span></span>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var counter = $$obj[$index];

var event = (!!options.events)?options.events[counter]:null
if ( event)
{
buf.push("<span class=\"event-wrapper\"><a target=\"_blank\"" + (jade.attr("href", '/events/get?id=' + event._id, true, false)) + "><img height=\"90\" width=\"90\"" + (jade.attr("src", "" + (event.image) + "", true, false)) + "/></a><a target=\"_blank\"" + (jade.attr("href", '/events/get?id=' + event._id, true, false)) + "><h2>" + (jade.escape((jade_interp = event.eventName) == null ? '' : jade_interp)) + "</h2></a><span class=\"event-category\">" + (jade.escape((jade_interp = event.eventType) == null ? '' : jade_interp)) + "</span><br/><span class=\"event-date\">" + (jade.escape((jade_interp = event.friendlyDate) == null ? '' : jade_interp)) + "</span></span>");
}
    }

  }
}).call(this);

if ( len > 8)
{
buf.push("<span class=\"more-event_container hidden\">");
// iterate options.events
;(function(){
  var $$obj = options.events;
  if ('number' == typeof $$obj.length) {

    for (var i = 0, $$l = $$obj.length; i < $$l; i++) {
      var event = $$obj[i];

if ( i >= 8)
{
buf.push("<span class=\"event-wrapper\"><a target=\"_blank\"" + (jade.attr("href", '/events/get?id=' + event._id, true, false)) + "><img height=\"90\" width=\"90\"" + (jade.attr("src", "" + (event.image) + "", true, false)) + "/></a><a target=\"_blank\"" + (jade.attr("href", '/events/get?id=' + event._id, true, false)) + "><h2>" + (jade.escape((jade_interp = event.eventName) == null ? '' : jade_interp)) + "</h2></a><span class=\"event-category\">" + (jade.escape((jade_interp = event.eventType) == null ? '' : jade_interp)) + "</span><br/><span class=\"event-date\">" + (jade.escape((jade_interp = event.friendlyDate) == null ? '' : jade_interp)) + "</span></span>");
}
    }

  } else {
    var $$l = 0;
    for (var i in $$obj) {
      $$l++;      var event = $$obj[i];

if ( i >= 8)
{
buf.push("<span class=\"event-wrapper\"><a target=\"_blank\"" + (jade.attr("href", '/events/get?id=' + event._id, true, false)) + "><img height=\"90\" width=\"90\"" + (jade.attr("src", "" + (event.image) + "", true, false)) + "/></a><a target=\"_blank\"" + (jade.attr("href", '/events/get?id=' + event._id, true, false)) + "><h2>" + (jade.escape((jade_interp = event.eventName) == null ? '' : jade_interp)) + "</h2></a><span class=\"event-category\">" + (jade.escape((jade_interp = event.eventType) == null ? '' : jade_interp)) + "</span><br/><span class=\"event-date\">" + (jade.escape((jade_interp = event.friendlyDate) == null ? '' : jade_interp)) + "</span></span>");
}
    }

  }
}).call(this);

buf.push("</span><a class=\"more-events_switch\">More events</a>");
}
}
else
{
buf.push("<p class=\"message\">No results found!</p>");
}
};
jade_mixins["events_search_list"](options);}.call(this,"options" in locals_for_with?locals_for_with.options:typeof options!=="undefined"?options:undefined));;return buf.join("");
}
window.templates.host_autocomplete_items = function(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (options) {




jade_mixins["host_autocomplete_items"] = function(options){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<ul>");
if ( options.status == 'success')
{
// iterate options.orgs
;(function(){
  var $$obj = options.orgs;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var org = $$obj[$index];

buf.push("<li><a" + (jade.attr("data-id", org._id, true, false)) + (jade.attr("data-name", org.name, true, false)) + " class=\"searchresult_item\">" + (jade.escape((jade_interp = org.name) == null ? '' : jade_interp)) + "</a></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var org = $$obj[$index];

buf.push("<li><a" + (jade.attr("data-id", org._id, true, false)) + (jade.attr("data-name", org.name, true, false)) + " class=\"searchresult_item\">" + (jade.escape((jade_interp = org.name) == null ? '' : jade_interp)) + "</a></li>");
    }

  }
}).call(this);

}
buf.push("</ul>");
};
jade_mixins["host_autocomplete_items"](options);}.call(this,"options" in locals_for_with?locals_for_with.options:typeof options!=="undefined"?options:undefined));;return buf.join("");
}
window.templates.main_events_cal = function(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (page) {
jade_mixins["main_calendar"] = function(options){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var weekDays = options.weekdays;
buf.push("<a id=\"back-to-list\" class=\"backNavLink\">" + (jade.escape((jade_interp = page.i18n.backToList) == null ? '' : jade_interp)) + "</a><div class=\"calendar\"><input type=\"hidden\"" + (jade.attr("value", options.selectedDate, true, false)) + " class=\"selected-date\"/><div class=\"year\">" + (jade.escape((jade_interp = options.year) == null ? '' : jade_interp)) + "</div><div class=\"months\"><a class=\"calendar_prev-month\"></a><a class=\"calendar_next-month\"></a><div class=\"months-gradient\"></div><span class=\"months-wrapper\"><p class=\"prev-month\">" + (jade.escape((jade_interp = options.prevMonth.monthName) == null ? '' : jade_interp)) + "</p><p class=\"selected-month\">" + (jade.escape((jade_interp = options.selectedMonth.monthName) == null ? '' : jade_interp)) + "</p><p class=\"next-month\">" + (jade.escape((jade_interp = options.nextMonth.monthName) == null ? '' : jade_interp)) + "</p></span></div><div class=\"week-days\">");
// iterate weekDays
;(function(){
  var $$obj = weekDays;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var dayName = $$obj[$index];

buf.push("<p>" + (jade.escape(null == (jade_interp = dayName) ? "" : jade_interp)) + "</p>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var dayName = $$obj[$index];

buf.push("<p>" + (jade.escape(null == (jade_interp = dayName) ? "" : jade_interp)) + "</p>");
    }

  }
}).call(this);

buf.push("</div><div class=\"days\">");
// iterate options.prevMonth.days
;(function(){
  var $$obj = options.prevMonth.days;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var day = $$obj[$index];

buf.push("<span" + (jade.cls(['cal-day','cal-day_inactive',day.events.length > 0?'':'empty'], [null,null,true])) + ">");
if ( day.events.length > 0)
{
buf.push("<img" + (jade.attr("src", day.events[0].image, true, false)) + " height=\"162\" width=\"162\" alt=\"\"/>");
}
buf.push("<p" + (jade.cls([day.events.length > 0?'':'daynum-empty'], [true])) + ">" + (jade.escape((jade_interp = day.day) == null ? '' : jade_interp)) + "</p></span>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var day = $$obj[$index];

buf.push("<span" + (jade.cls(['cal-day','cal-day_inactive',day.events.length > 0?'':'empty'], [null,null,true])) + ">");
if ( day.events.length > 0)
{
buf.push("<img" + (jade.attr("src", day.events[0].image, true, false)) + " height=\"162\" width=\"162\" alt=\"\"/>");
}
buf.push("<p" + (jade.cls([day.events.length > 0?'':'daynum-empty'], [true])) + ">" + (jade.escape((jade_interp = day.day) == null ? '' : jade_interp)) + "</p></span>");
    }

  }
}).call(this);

// iterate options.selectedMonth.days
;(function(){
  var $$obj = options.selectedMonth.days;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var day = $$obj[$index];

if ( day.day)
{
buf.push("<span" + (jade.cls(['cal-day',day.events.length > 0?'':'empty'], [null,true])) + ">");
if ( day.events.length > 0)
{
if ( day.events.length < 2)
{
buf.push("<span class=\"event-thumbnail\"><span><img" + (jade.attr("src", day.events[0].image, true, false)) + " height=\"162\" width=\"162\" alt=\"\"/></span></span>");
}
else
{
// iterate day.events
;(function(){
  var $$obj = day.events;
  if ('number' == typeof $$obj.length) {

    for (var k = 0, $$l = $$obj.length; k < $$l; k++) {
      var v = $$obj[k];

if ( k < 3)
{
buf.push("<span class=\"event-thumbnail\"><span" + (jade.cls(['event-thumbnail_wrapper','event-thumb_' + k], [null,true])) + "><img" + (jade.attr("src", day.events[k].image, true, false)) + " height=\"162\" width=\"162\" alt=\"\"/></span></span>");
}
    }

  } else {
    var $$l = 0;
    for (var k in $$obj) {
      $$l++;      var v = $$obj[k];

if ( k < 3)
{
buf.push("<span class=\"event-thumbnail\"><span" + (jade.cls(['event-thumbnail_wrapper','event-thumb_' + k], [null,true])) + "><img" + (jade.attr("src", day.events[k].image, true, false)) + " height=\"162\" width=\"162\" alt=\"\"/></span></span>");
}
    }

  }
}).call(this);

}
buf.push("<div" + (jade.attr("id", 'events-'+ options.selectedMonth.monthName.toLowerCase() + '_'+ day.day, true, false)) + " class=\"popup day-events hidden\"><i class=\"day-events_close\"></i>");
if ( day.events.length > 1)
{
buf.push("<a class=\"day-events_left hidden\"></a><a class=\"day-events_right\"></a>");
}
buf.push("<div class=\"day-events_wrapper\">");
// iterate day.events
;(function(){
  var $$obj = day.events;
  if ('number' == typeof $$obj.length) {

    for (var key = 0, $$l = $$obj.length; key < $$l; key++) {
      var evt = $$obj[key];

var evtClass = 'day-event' + key
buf.push("<span" + (jade.cls(['day-event',key>0?evtClass + ' hidden':evtClass], [null,true])) + "><span class=\"event-month-title\">" + (jade.escape((jade_interp = evt.friendlyDate.toUpperCase()) == null ? '' : jade_interp)) + "</span><span class=\"event-day-title\">" + (jade.escape((jade_interp = evt.dayOfWeek) == null ? '' : jade_interp)) + "</span><a" + (jade.attr("href", '/events/get?id=' + evt._id, true, false)) + " target=\"_blank\"><img alt=\"\"" + (jade.attr("src", evt.image, true, false)) + " height=\"236\" width=\"236\"/></a><a" + (jade.attr("href", '/events/get?id=' + evt._id, true, false)) + " target=\"_blank\"><span class=\"day-event_title\">" + (jade.escape((jade_interp = evt.eventName) == null ? '' : jade_interp)) + "</span></a><span class=\"day-event_org-name\">by <a" + (jade.attr("href", '/orgs/get?id=' + evt.owner, true, false)) + " target=\"_blank\">" + (jade.escape((jade_interp = evt.ownerName) == null ? '' : jade_interp)) + "</a>");
// iterate evt.coHosts
;(function(){
  var $$obj = evt.coHosts;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var coHost = $$obj[$index];

buf.push("<a" + (jade.attr("href", '/orgs/get?id=' + coHost.id, true, false)) + " target=\"_blank\">" + (jade.escape((jade_interp = coHost.name) == null ? '' : jade_interp)) + "</a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var coHost = $$obj[$index];

buf.push("<a" + (jade.attr("href", '/orgs/get?id=' + coHost.id, true, false)) + " target=\"_blank\">" + (jade.escape((jade_interp = coHost.name) == null ? '' : jade_interp)) + "</a>");
    }

  }
}).call(this);

buf.push("</span><span class=\"day-event_about\">" + (jade.escape((jade_interp = evt.about) == null ? '' : jade_interp)) + "</span></span>");
    }

  } else {
    var $$l = 0;
    for (var key in $$obj) {
      $$l++;      var evt = $$obj[key];

var evtClass = 'day-event' + key
buf.push("<span" + (jade.cls(['day-event',key>0?evtClass + ' hidden':evtClass], [null,true])) + "><span class=\"event-month-title\">" + (jade.escape((jade_interp = evt.friendlyDate.toUpperCase()) == null ? '' : jade_interp)) + "</span><span class=\"event-day-title\">" + (jade.escape((jade_interp = evt.dayOfWeek) == null ? '' : jade_interp)) + "</span><a" + (jade.attr("href", '/events/get?id=' + evt._id, true, false)) + " target=\"_blank\"><img alt=\"\"" + (jade.attr("src", evt.image, true, false)) + " height=\"236\" width=\"236\"/></a><a" + (jade.attr("href", '/events/get?id=' + evt._id, true, false)) + " target=\"_blank\"><span class=\"day-event_title\">" + (jade.escape((jade_interp = evt.eventName) == null ? '' : jade_interp)) + "</span></a><span class=\"day-event_org-name\">by <a" + (jade.attr("href", '/orgs/get?id=' + evt.owner, true, false)) + " target=\"_blank\">" + (jade.escape((jade_interp = evt.ownerName) == null ? '' : jade_interp)) + "</a>");
// iterate evt.coHosts
;(function(){
  var $$obj = evt.coHosts;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var coHost = $$obj[$index];

buf.push("<a" + (jade.attr("href", '/orgs/get?id=' + coHost.id, true, false)) + " target=\"_blank\">" + (jade.escape((jade_interp = coHost.name) == null ? '' : jade_interp)) + "</a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var coHost = $$obj[$index];

buf.push("<a" + (jade.attr("href", '/orgs/get?id=' + coHost.id, true, false)) + " target=\"_blank\">" + (jade.escape((jade_interp = coHost.name) == null ? '' : jade_interp)) + "</a>");
    }

  }
}).call(this);

buf.push("</span><span class=\"day-event_about\">" + (jade.escape((jade_interp = evt.about) == null ? '' : jade_interp)) + "</span></span>");
    }

  }
}).call(this);

buf.push("</div></div>");
}
buf.push("<p" + (jade.attr("id", 'button-'+ options.selectedMonth.monthName.toLowerCase() + '_'+ day.day, true, false)) + (jade.cls(['show-events_button',day.events.length > 0?'':'daynum-empty'], [null,true])) + ">" + (jade.escape((jade_interp = day.day) == null ? '' : jade_interp)) + "</p></span>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var day = $$obj[$index];

if ( day.day)
{
buf.push("<span" + (jade.cls(['cal-day',day.events.length > 0?'':'empty'], [null,true])) + ">");
if ( day.events.length > 0)
{
if ( day.events.length < 2)
{
buf.push("<span class=\"event-thumbnail\"><span><img" + (jade.attr("src", day.events[0].image, true, false)) + " height=\"162\" width=\"162\" alt=\"\"/></span></span>");
}
else
{
// iterate day.events
;(function(){
  var $$obj = day.events;
  if ('number' == typeof $$obj.length) {

    for (var k = 0, $$l = $$obj.length; k < $$l; k++) {
      var v = $$obj[k];

if ( k < 3)
{
buf.push("<span class=\"event-thumbnail\"><span" + (jade.cls(['event-thumbnail_wrapper','event-thumb_' + k], [null,true])) + "><img" + (jade.attr("src", day.events[k].image, true, false)) + " height=\"162\" width=\"162\" alt=\"\"/></span></span>");
}
    }

  } else {
    var $$l = 0;
    for (var k in $$obj) {
      $$l++;      var v = $$obj[k];

if ( k < 3)
{
buf.push("<span class=\"event-thumbnail\"><span" + (jade.cls(['event-thumbnail_wrapper','event-thumb_' + k], [null,true])) + "><img" + (jade.attr("src", day.events[k].image, true, false)) + " height=\"162\" width=\"162\" alt=\"\"/></span></span>");
}
    }

  }
}).call(this);

}
buf.push("<div" + (jade.attr("id", 'events-'+ options.selectedMonth.monthName.toLowerCase() + '_'+ day.day, true, false)) + " class=\"popup day-events hidden\"><i class=\"day-events_close\"></i>");
if ( day.events.length > 1)
{
buf.push("<a class=\"day-events_left hidden\"></a><a class=\"day-events_right\"></a>");
}
buf.push("<div class=\"day-events_wrapper\">");
// iterate day.events
;(function(){
  var $$obj = day.events;
  if ('number' == typeof $$obj.length) {

    for (var key = 0, $$l = $$obj.length; key < $$l; key++) {
      var evt = $$obj[key];

var evtClass = 'day-event' + key
buf.push("<span" + (jade.cls(['day-event',key>0?evtClass + ' hidden':evtClass], [null,true])) + "><span class=\"event-month-title\">" + (jade.escape((jade_interp = evt.friendlyDate.toUpperCase()) == null ? '' : jade_interp)) + "</span><span class=\"event-day-title\">" + (jade.escape((jade_interp = evt.dayOfWeek) == null ? '' : jade_interp)) + "</span><a" + (jade.attr("href", '/events/get?id=' + evt._id, true, false)) + " target=\"_blank\"><img alt=\"\"" + (jade.attr("src", evt.image, true, false)) + " height=\"236\" width=\"236\"/></a><a" + (jade.attr("href", '/events/get?id=' + evt._id, true, false)) + " target=\"_blank\"><span class=\"day-event_title\">" + (jade.escape((jade_interp = evt.eventName) == null ? '' : jade_interp)) + "</span></a><span class=\"day-event_org-name\">by <a" + (jade.attr("href", '/orgs/get?id=' + evt.owner, true, false)) + " target=\"_blank\">" + (jade.escape((jade_interp = evt.ownerName) == null ? '' : jade_interp)) + "</a>");
// iterate evt.coHosts
;(function(){
  var $$obj = evt.coHosts;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var coHost = $$obj[$index];

buf.push("<a" + (jade.attr("href", '/orgs/get?id=' + coHost.id, true, false)) + " target=\"_blank\">" + (jade.escape((jade_interp = coHost.name) == null ? '' : jade_interp)) + "</a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var coHost = $$obj[$index];

buf.push("<a" + (jade.attr("href", '/orgs/get?id=' + coHost.id, true, false)) + " target=\"_blank\">" + (jade.escape((jade_interp = coHost.name) == null ? '' : jade_interp)) + "</a>");
    }

  }
}).call(this);

buf.push("</span><span class=\"day-event_about\">" + (jade.escape((jade_interp = evt.about) == null ? '' : jade_interp)) + "</span></span>");
    }

  } else {
    var $$l = 0;
    for (var key in $$obj) {
      $$l++;      var evt = $$obj[key];

var evtClass = 'day-event' + key
buf.push("<span" + (jade.cls(['day-event',key>0?evtClass + ' hidden':evtClass], [null,true])) + "><span class=\"event-month-title\">" + (jade.escape((jade_interp = evt.friendlyDate.toUpperCase()) == null ? '' : jade_interp)) + "</span><span class=\"event-day-title\">" + (jade.escape((jade_interp = evt.dayOfWeek) == null ? '' : jade_interp)) + "</span><a" + (jade.attr("href", '/events/get?id=' + evt._id, true, false)) + " target=\"_blank\"><img alt=\"\"" + (jade.attr("src", evt.image, true, false)) + " height=\"236\" width=\"236\"/></a><a" + (jade.attr("href", '/events/get?id=' + evt._id, true, false)) + " target=\"_blank\"><span class=\"day-event_title\">" + (jade.escape((jade_interp = evt.eventName) == null ? '' : jade_interp)) + "</span></a><span class=\"day-event_org-name\">by <a" + (jade.attr("href", '/orgs/get?id=' + evt.owner, true, false)) + " target=\"_blank\">" + (jade.escape((jade_interp = evt.ownerName) == null ? '' : jade_interp)) + "</a>");
// iterate evt.coHosts
;(function(){
  var $$obj = evt.coHosts;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var coHost = $$obj[$index];

buf.push("<a" + (jade.attr("href", '/orgs/get?id=' + coHost.id, true, false)) + " target=\"_blank\">" + (jade.escape((jade_interp = coHost.name) == null ? '' : jade_interp)) + "</a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var coHost = $$obj[$index];

buf.push("<a" + (jade.attr("href", '/orgs/get?id=' + coHost.id, true, false)) + " target=\"_blank\">" + (jade.escape((jade_interp = coHost.name) == null ? '' : jade_interp)) + "</a>");
    }

  }
}).call(this);

buf.push("</span><span class=\"day-event_about\">" + (jade.escape((jade_interp = evt.about) == null ? '' : jade_interp)) + "</span></span>");
    }

  }
}).call(this);

buf.push("</div></div>");
}
buf.push("<p" + (jade.attr("id", 'button-'+ options.selectedMonth.monthName.toLowerCase() + '_'+ day.day, true, false)) + (jade.cls(['show-events_button',day.events.length > 0?'':'daynum-empty'], [null,true])) + ">" + (jade.escape((jade_interp = day.day) == null ? '' : jade_interp)) + "</p></span>");
}
    }

  }
}).call(this);

// iterate options.nextMonth.days
;(function(){
  var $$obj = options.nextMonth.days;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var day = $$obj[$index];

if ( day.day)
{
buf.push("<span" + (jade.cls(['cal-day','cal-day_inactive',day.events.length > 0?'':'empty'], [null,null,true])) + ">");
if ( day.events.length > 0)
{
buf.push("<img" + (jade.attr("src", day.events[0].image, true, false)) + " height=\"162\" width=\"162\" alt=\"\"/>");
}
buf.push("<p" + (jade.cls([day.events.length > 0?'':'daynum-empty'], [true])) + ">" + (jade.escape((jade_interp = day.day) == null ? '' : jade_interp)) + "</p></span>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var day = $$obj[$index];

if ( day.day)
{
buf.push("<span" + (jade.cls(['cal-day','cal-day_inactive',day.events.length > 0?'':'empty'], [null,null,true])) + ">");
if ( day.events.length > 0)
{
buf.push("<img" + (jade.attr("src", day.events[0].image, true, false)) + " height=\"162\" width=\"162\" alt=\"\"/>");
}
buf.push("<p" + (jade.cls([day.events.length > 0?'':'daynum-empty'], [true])) + ">" + (jade.escape((jade_interp = day.day) == null ? '' : jade_interp)) + "</p></span>");
}
    }

  }
}).call(this);

buf.push("</div><div class=\"calendar-controls\"><span class=\"caledar-filters\"><p>" + (jade.escape((jade_interp = page.i18n.show) == null ? '' : jade_interp)) + "</p><span class=\"calendar-filters_wrapper\"><i></i><label class=\"filters-reminder\">" + (jade.escape((jade_interp = page.i18n.selectTypes) == null ? '' : jade_interp)) + "</label><form id=\"calendar-filters\" class=\"hidden\">");
// iterate page.structure.evtTypes
;(function(){
  var $$obj = page.structure.evtTypes;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var type = $$obj[$index];

jade_mixins["checkbox"]({title: type.title, name: type.name, checked: options.filters[type.name]?'1':null});
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var type = $$obj[$index];

jade_mixins["checkbox"]({title: type.title, name: type.name, checked: options.filters[type.name]?'1':null});
    }

  }
}).call(this);

buf.push("</form></span></span>");
jade_mixins["date_picker"]({text: page.i18n.datePicker, size: 'm', selectedDate: options.selectedDate, name: 'calendarDatePicker'});
buf.push("</div></div>");
};








jade_mixins["date_picker"] = function(options){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div" + (jade.attr("id", options.id ? 'dp_' + options.id : '', true, false)) + (jade.cls(['kit_date-picker',options.size?'kit_date-picker_size_' + options.size:''], [null,true])) + "><input type=\"hidden\"" + (jade.attr("name", options.name?options.name:'', true, false)) + (jade.attr("id", options.id?options.id:'', true, false)) + (jade.attr("value", options.selectedDate?options.selectedDate:'', true, false)) + " class=\"datepicker-input\"/><span>" + (jade.escape((jade_interp = options.text) == null ? '' : jade_interp)) + "</span><i class=\"date-icon\"></i></div>");
};

























jade_mixins["checkbox"] = function(options){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<label class=\"custom-checkbox_label\">" + (jade.escape((jade_interp = options.title) == null ? '' : jade_interp)) + "<input type=\"checkbox\"" + (jade.attr("name", options.name, true, false)) + (jade.attr("checked", options.checked?'checked':null, true, false)) + " class=\"custom-checkbox\"/></label>");
};































jade_mixins["main_calendar"](page.calendar);}.call(this,"page" in locals_for_with?locals_for_with.page:typeof page!=="undefined"?page:undefined));;return buf.join("");
}
window.templates.message = function(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (options) {
jade_mixins["kit_button"] = function(options){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<a" + (jade.attr("id", options.id?options.id:'', true, false)) + (jade.attr("href", options.href?options.href:null, true, false)) + (jade.cls(['kit_button',"button_size_" + (options.size) + ""], [null,true])) + "><p>" + (jade.escape((jade_interp = options.text) == null ? '' : jade_interp)) + "</p></a>");
};




































































buf.push("<p>" + (jade.escape((jade_interp = options.text) == null ? '' : jade_interp)) + " </p>");
jade_mixins["kit_button"]({size: 'n', text: 'ok', id: 'message-ok'});}.call(this,"options" in locals_for_with?locals_for_with.options:typeof options!=="undefined"?options:undefined));;return buf.join("");
}
window.templates.org_events_list = function(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (options, page) {
jade_mixins["org_events_list"] = function(options){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var len = options.events.length
if ( len > 0)
{
// iterate [0, 1, 2, 3]
;(function(){
  var $$obj = [0, 1, 2, 3];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var counter = $$obj[$index];

var event = (!!options.events)?options.events[counter]:null
if ( event)
{
jade_mixins["org_events_searchresult"](event);
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var counter = $$obj[$index];

var event = (!!options.events)?options.events[counter]:null
if ( event)
{
jade_mixins["org_events_searchresult"](event);
}
    }

  }
}).call(this);

if ( len > 4)
{
buf.push("<span class=\"more-event_container hidden\">");
// iterate options.events
;(function(){
  var $$obj = options.events;
  if ('number' == typeof $$obj.length) {

    for (var i = 0, $$l = $$obj.length; i < $$l; i++) {
      var event = $$obj[i];

if ( i >= 4)
{
jade_mixins["org_events_searchresult"](event);
}
    }

  } else {
    var $$l = 0;
    for (var i in $$obj) {
      $$l++;      var event = $$obj[i];

if ( i >= 4)
{
jade_mixins["org_events_searchresult"](event);
}
    }

  }
}).call(this);

buf.push("</span><a class=\"more-events_switch\">More events</a>");
}
}
else
{
buf.push("<p class=\"message\">No results found!</p>");
}
};
jade_mixins["org_events_searchresult"] = function(event){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<span class=\"event-wrapper\"><a" + (jade.attr("href", '/events/edit?id=' + event._id, true, false)) + "><img height=\"90\" width=\"90\"" + (jade.attr("src", "" + (event.image) + "", true, false)) + "/></a><a" + (jade.attr("href", '/events/edit?id=' + event._id, true, false)) + "><h2>" + (jade.escape((jade_interp = event.eventName) == null ? '' : jade_interp)) + "</h2></a><span class=\"event-category\">" + (jade.escape((jade_interp = event.eventType) == null ? '' : jade_interp)) + "</span><br/><span class=\"event-date\">" + (jade.escape((jade_interp = event.friendlyDate) == null ? '' : jade_interp)) + "</span><span class=\"evt-stat hidden\"></span>");
jade_mixins["event_controls"](event._id, event.views, event.fbPostId);
buf.push("</span>");
};
jade_mixins["event_controls"] = function(id, views, fbPostId){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<span class=\"event-controls\"><span class=\"stats-info\"><input type=\"hidden\"" + (jade.attr("value", views, true, false)) + " class=\"stats-views\"/><input type=\"hidden\"" + (jade.attr("value", fbPostId, true, false)) + " name=\"postId\"/></span><a" + (jade.attr("href", '/events/edit/?id=' + id, true, false)) + " class=\"event-control edit-event\">" + (jade.escape((jade_interp = page.i18n?page.i18n.editEvent:options.i18n.editEvent) == null ? '' : jade_interp)) + "</a><a href=\"#\"" + (jade.attr("data-evtId", id, true, false)) + " class=\"event-control event-stat\">" + (jade.escape((jade_interp = page.i18n?page.i18n.eventStat:options.i18n.eventStat) == null ? '' : jade_interp)) + "</a><a href=\"#\"" + (jade.attr("data-evtId", id, true, false)) + " class=\"event-control delete-event\">" + (jade.escape((jade_interp = page.i18n?page.i18n.deleteEvent:options.i18n.deleteEvent) == null ? '' : jade_interp)) + "</a></span>");
};
jade_mixins["org_events_list"](options);}.call(this,"options" in locals_for_with?locals_for_with.options:typeof options!=="undefined"?options:undefined,"page" in locals_for_with?locals_for_with.page:typeof page!=="undefined"?page:undefined));;return buf.join("");
}
window.templates.org_list = function(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (k, options) {
jade_mixins["org_list"] = function(options){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var orgsQty = 0;
for (k in options.orgs) {orgsQty++}
if ( !!options.orgs && orgsQty > 0)
{
var i = 1
// iterate options.orgs
;(function(){
  var $$obj = options.orgs;
  if ('number' == typeof $$obj.length) {

    for (var k = 0, $$l = $$obj.length; k < $$l; k++) {
      var v = $$obj[k];

if ( k != 'totals')
{
buf.push("<span" + (jade.cls(['org-list_title',options.key?'org-list_' + options.key + ' org-list_' + options.key + '_' + i:''], [null,true])) + ">" + (jade.escape((jade_interp = k) == null ? '' : jade_interp)) + "</span>");
if ( options.orgs.totals)
{
buf.push("<span class=\"vacancies-total\">" + (jade.escape((jade_interp = options.orgs.totals[k] + ' vacancies') == null ? '' : jade_interp)) + "</span>");
}
buf.push("<ul" + (jade.cls([options.key?'org-list_' + options.key + '_list' + i:''], [true])) + ">");
// iterate v
;(function(){
  var $$obj = v;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var org = $$obj[$index];

buf.push("<li><a" + (jade.attr("href", '/orgs/get/?id=' + org._id, true, false)) + " target=\"_blank\">" + (jade.escape((jade_interp = org.name) == null ? '' : jade_interp)) + "</a>");
if ( org.vacancies > 0 && options.key == 'vacancy')
{
buf.push("<span class=\"vacancies-link\"><a" + (jade.attr("href", org.vacanciesPage?org.vacanciesPage:'/orgs/get/?id=' + org._id, true, false)) + " target=\"_blank\">" + (jade.escape((jade_interp = org.vacancies + ' vacancies') == null ? '' : jade_interp)) + "</a></span>");
}
buf.push("</li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var org = $$obj[$index];

buf.push("<li><a" + (jade.attr("href", '/orgs/get/?id=' + org._id, true, false)) + " target=\"_blank\">" + (jade.escape((jade_interp = org.name) == null ? '' : jade_interp)) + "</a>");
if ( org.vacancies > 0 && options.key == 'vacancy')
{
buf.push("<span class=\"vacancies-link\"><a" + (jade.attr("href", org.vacanciesPage?org.vacanciesPage:'/orgs/get/?id=' + org._id, true, false)) + " target=\"_blank\">" + (jade.escape((jade_interp = org.vacancies + ' vacancies') == null ? '' : jade_interp)) + "</a></span>");
}
buf.push("</li>");
    }

  }
}).call(this);

buf.push("</ul>");
}
i++
    }

  } else {
    var $$l = 0;
    for (var k in $$obj) {
      $$l++;      var v = $$obj[k];

if ( k != 'totals')
{
buf.push("<span" + (jade.cls(['org-list_title',options.key?'org-list_' + options.key + ' org-list_' + options.key + '_' + i:''], [null,true])) + ">" + (jade.escape((jade_interp = k) == null ? '' : jade_interp)) + "</span>");
if ( options.orgs.totals)
{
buf.push("<span class=\"vacancies-total\">" + (jade.escape((jade_interp = options.orgs.totals[k] + ' vacancies') == null ? '' : jade_interp)) + "</span>");
}
buf.push("<ul" + (jade.cls([options.key?'org-list_' + options.key + '_list' + i:''], [true])) + ">");
// iterate v
;(function(){
  var $$obj = v;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var org = $$obj[$index];

buf.push("<li><a" + (jade.attr("href", '/orgs/get/?id=' + org._id, true, false)) + " target=\"_blank\">" + (jade.escape((jade_interp = org.name) == null ? '' : jade_interp)) + "</a>");
if ( org.vacancies > 0 && options.key == 'vacancy')
{
buf.push("<span class=\"vacancies-link\"><a" + (jade.attr("href", org.vacanciesPage?org.vacanciesPage:'/orgs/get/?id=' + org._id, true, false)) + " target=\"_blank\">" + (jade.escape((jade_interp = org.vacancies + ' vacancies') == null ? '' : jade_interp)) + "</a></span>");
}
buf.push("</li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var org = $$obj[$index];

buf.push("<li><a" + (jade.attr("href", '/orgs/get/?id=' + org._id, true, false)) + " target=\"_blank\">" + (jade.escape((jade_interp = org.name) == null ? '' : jade_interp)) + "</a>");
if ( org.vacancies > 0 && options.key == 'vacancy')
{
buf.push("<span class=\"vacancies-link\"><a" + (jade.attr("href", org.vacanciesPage?org.vacanciesPage:'/orgs/get/?id=' + org._id, true, false)) + " target=\"_blank\">" + (jade.escape((jade_interp = org.vacancies + ' vacancies') == null ? '' : jade_interp)) + "</a></span>");
}
buf.push("</li>");
    }

  }
}).call(this);

buf.push("</ul>");
}
i++
    }

  }
}).call(this);

}
else
{
buf.push("<p class=\"message\">No results found!</p>");
}
};
jade_mixins["org_list"](options);}.call(this,"k" in locals_for_with?locals_for_with.k:typeof k!=="undefined"?k:undefined,"options" in locals_for_with?locals_for_with.options:typeof options!=="undefined"?options:undefined));;return buf.join("");
}
window.templates.org_vacancies_list = function(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (options, page) {
jade_mixins["org_vacancies_list"] = function(options){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var len = options.vacancies.length
if ( len > 0)
{
// iterate [0, 1, 2, 3]
;(function(){
  var $$obj = [0, 1, 2, 3];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var counter = $$obj[$index];

var vacancy = (!!options.vacancies)?options.vacancies[counter]:null
if ( vacancy)
{
jade_mixins["list_item"](vacancy, page.i18n?page.i18n:options.i18n);
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var counter = $$obj[$index];

var vacancy = (!!options.vacancies)?options.vacancies[counter]:null
if ( vacancy)
{
jade_mixins["list_item"](vacancy, page.i18n?page.i18n:options.i18n);
}
    }

  }
}).call(this);

if ( len > 4)
{
buf.push("<span class=\"more-event_container hidden\">");
// iterate options.vacancies
;(function(){
  var $$obj = options.vacancies;
  if ('number' == typeof $$obj.length) {

    for (var i = 0, $$l = $$obj.length; i < $$l; i++) {
      var vacancy = $$obj[i];

if ( i >= 4)
{
jade_mixins["list_item"](vacancy, page.i18n?page.i18n:options.i18n);
}
    }

  } else {
    var $$l = 0;
    for (var i in $$obj) {
      $$l++;      var vacancy = $$obj[i];

if ( i >= 4)
{
jade_mixins["list_item"](vacancy, page.i18n?page.i18n:options.i18n);
}
    }

  }
}).call(this);

buf.push("</span><a class=\"more-events_switch\">More vacancies</a>");
}
}
else
{
buf.push("<p class=\"message\">No results found!</p>");
}
};
jade_mixins["vacancy_controls"] = function(id){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<span class=\"event-controls\"><a" + (jade.attr("href", '/vacancies/edit/?id=' + id, true, false)) + " class=\"event-control edit-event\">" + (jade.escape((jade_interp = page.i18n?page.i18n.editEvent:options.i18n.editEvent) == null ? '' : jade_interp)) + "</a><a href=\"#\"" + (jade.attr("data-vacId", id, true, false)) + " class=\"event-control delete-vacancy\">" + (jade.escape((jade_interp = page.i18n?page.i18n.deleteEvent:options.i18n.deleteEvent) == null ? '' : jade_interp)) + "</a></span>");
};
jade_mixins["list_item"] = function(record, i18n){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<span class=\"event-wrapper\"><a" + (jade.attr("href", '/vacancies/edit?id=' + record._id, true, false)) + "><h2>" + (jade.escape((jade_interp = record.vacancyName) == null ? '' : jade_interp)) + "</h2></a>");
if ( record.fullTime)
{
buf.push("<span class=\"event-category\">" + (jade.escape((jade_interp = i18n.fullTime) == null ? '' : jade_interp)) + "</span>");
}
else if ( record.pastTime)
{
buf.push("<span class=\"event-category\">" + (jade.escape((jade_interp = i18n.pastTime) == null ? '' : jade_interp)) + "</span>");
}
buf.push("<span class=\"event-date\">" + (jade.escape((jade_interp = record.friendlyDate) == null ? '' : jade_interp)) + "</span>");
jade_mixins["vacancy_controls"](record._id);
buf.push("</span>");
};
jade_mixins["org_vacancies_list"](options);}.call(this,"options" in locals_for_with?locals_for_with.options:typeof options!=="undefined"?options:undefined,"page" in locals_for_with?locals_for_with.page:typeof page!=="undefined"?page:undefined));;return buf.join("");
}
window.templates.selected_co_host = function(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (options) {
jade_mixins["selected_co_host"] = function(options){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<span" + (jade.attr("id", 'co-host_' + options.id, true, false)) + " class=\"selected-host_item\"><input" + (jade.attr("value", options.name, true, false)) + " readonly=\"readonly\" class=\"input-gray\"/><button" + (jade.attr("id", 'remove-host_' + options.id, true, false)) + " class=\"filter-button remove-host_button\">delete</button><input type=\"hidden\"" + (jade.attr("name", "host_" + options.id, true, false)) + (jade.attr("value", options.name, true, false)) + "/></span>");
};
















jade_mixins["selected_co_host"](options);}.call(this,"options" in locals_for_with?locals_for_with.options:typeof options!=="undefined"?options:undefined));;return buf.join("");
}
window.templates.statistics = function(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (options) {
var stats = options.stats;
var lang = options.lang;
buf.push("<span class=\"stat-item stat-item_views\">Views </span><span class=\"stat-item stat-item_likes\">Likes</span><span class=\"stat-item stat-item_shares\">Shares</span><p>" + (jade.escape((jade_interp = options.stats.views) == null ? '' : jade_interp)) + "</p><p>" + (jade.escape((jade_interp = options.stats.likes) == null ? '' : jade_interp)) + "</p><p>" + (jade.escape((jade_interp = options.stats.shares) == null ? '' : jade_interp)) + "</p>");}.call(this,"options" in locals_for_with?locals_for_with.options:typeof options!=="undefined"?options:undefined));;return buf.join("");
}
window.templates.vacancies_list = function(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (options, page) {
jade_mixins["vacancies_list"] = function(options){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var len = options.vacancies.length
if ( len > 0)
{
// iterate [0, 1, 2, 3, 4, 5, 6, 7]
;(function(){
  var $$obj = [0, 1, 2, 3, 4, 5, 6, 7];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var counter = $$obj[$index];

var vacancy = (!!options.vacancies)?options.vacancies[counter]:null
if ( vacancy)
{
buf.push("<span class=\"vacancy-wrapper\"><a" + (jade.attr("href", '/vacancies/get?id=' + vacancy._id, true, false)) + "><h2>" + (jade.escape((jade_interp = vacancy.vacancyName) == null ? '' : jade_interp)) + "</h2></a>");
if ( vacancy.fullTime)
{
buf.push("<span class=\"event-category\">" + (jade.escape((jade_interp = page.i18n?page.i18n.fullTime:options.i18n.fullTime) == null ? '' : jade_interp)) + "</span>");
}
else if ( vacancy.pastTime)
{
buf.push("<span class=\"event-category\">" + (jade.escape((jade_interp = page.i18n?page.i18n.pastTime:options.i18n.pastTime) == null ? '' : jade_interp)) + "</span>");
}
buf.push("<span class=\"event-date\">" + (jade.escape((jade_interp = vacancy.friendlyDate) == null ? '' : jade_interp)) + "</span><a" + (jade.attr("href", '/orgs/get/?id=' + vacancy.owner, true, false)) + " class=\"vacancy-owner\">" + (jade.escape((jade_interp = vacancy.ownerName) == null ? '' : jade_interp)) + "</a></span>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var counter = $$obj[$index];

var vacancy = (!!options.vacancies)?options.vacancies[counter]:null
if ( vacancy)
{
buf.push("<span class=\"vacancy-wrapper\"><a" + (jade.attr("href", '/vacancies/get?id=' + vacancy._id, true, false)) + "><h2>" + (jade.escape((jade_interp = vacancy.vacancyName) == null ? '' : jade_interp)) + "</h2></a>");
if ( vacancy.fullTime)
{
buf.push("<span class=\"event-category\">" + (jade.escape((jade_interp = page.i18n?page.i18n.fullTime:options.i18n.fullTime) == null ? '' : jade_interp)) + "</span>");
}
else if ( vacancy.pastTime)
{
buf.push("<span class=\"event-category\">" + (jade.escape((jade_interp = page.i18n?page.i18n.pastTime:options.i18n.pastTime) == null ? '' : jade_interp)) + "</span>");
}
buf.push("<span class=\"event-date\">" + (jade.escape((jade_interp = vacancy.friendlyDate) == null ? '' : jade_interp)) + "</span><a" + (jade.attr("href", '/orgs/get/?id=' + vacancy.owner, true, false)) + " class=\"vacancy-owner\">" + (jade.escape((jade_interp = vacancy.ownerName) == null ? '' : jade_interp)) + "</a></span>");
}
    }

  }
}).call(this);

if ( len > 8)
{
buf.push("<span class=\"more-event_container hidden\">");
// iterate options.vacancies
;(function(){
  var $$obj = options.vacancies;
  if ('number' == typeof $$obj.length) {

    for (var i = 0, $$l = $$obj.length; i < $$l; i++) {
      var vacancy = $$obj[i];

if ( i >= 8)
{
buf.push("<span class=\"vacancy-wrapper\"><a" + (jade.attr("href", '/vacancies/get?id=' + vacancy._id, true, false)) + "><h2>" + (jade.escape((jade_interp = vacancy.vacancyName) == null ? '' : jade_interp)) + "</h2></a>");
if ( vacancy.fullTime)
{
buf.push("<span class=\"event-category\">" + (jade.escape((jade_interp = page.i18n?page.i18n.fullTime:options.i18n.fullTime) == null ? '' : jade_interp)) + "</span>");
}
else if ( vacancy.pastTime)
{
buf.push("<span class=\"event-category\">" + (jade.escape((jade_interp = page.i18n?page.i18n.pastTime:options.i18n.pastTime) == null ? '' : jade_interp)) + "</span>");
}
buf.push("<span class=\"event-date\">" + (jade.escape((jade_interp = vacancy.friendlyDate) == null ? '' : jade_interp)) + "</span><a" + (jade.attr("href", '/orgs/get/?id=' + vacancy.owner, true, false)) + " class=\"vacancy-owner\">" + (jade.escape((jade_interp = vacancy.ownerName) == null ? '' : jade_interp)) + "</a></span>");
}
    }

  } else {
    var $$l = 0;
    for (var i in $$obj) {
      $$l++;      var vacancy = $$obj[i];

if ( i >= 8)
{
buf.push("<span class=\"vacancy-wrapper\"><a" + (jade.attr("href", '/vacancies/get?id=' + vacancy._id, true, false)) + "><h2>" + (jade.escape((jade_interp = vacancy.vacancyName) == null ? '' : jade_interp)) + "</h2></a>");
if ( vacancy.fullTime)
{
buf.push("<span class=\"event-category\">" + (jade.escape((jade_interp = page.i18n?page.i18n.fullTime:options.i18n.fullTime) == null ? '' : jade_interp)) + "</span>");
}
else if ( vacancy.pastTime)
{
buf.push("<span class=\"event-category\">" + (jade.escape((jade_interp = page.i18n?page.i18n.pastTime:options.i18n.pastTime) == null ? '' : jade_interp)) + "</span>");
}
buf.push("<span class=\"event-date\">" + (jade.escape((jade_interp = vacancy.friendlyDate) == null ? '' : jade_interp)) + "</span><a" + (jade.attr("href", '/orgs/get/?id=' + vacancy.owner, true, false)) + " class=\"vacancy-owner\">" + (jade.escape((jade_interp = vacancy.ownerName) == null ? '' : jade_interp)) + "</a></span>");
}
    }

  }
}).call(this);

buf.push("</span><a class=\"more-events_switch\">More vacancies</a>");
}
}
else
{
buf.push("<p class=\"message\">No results found!</p>");
}
};
jade_mixins["vacancies_list"](options);}.call(this,"options" in locals_for_with?locals_for_with.options:typeof options!=="undefined"?options:undefined,"page" in locals_for_with?locals_for_with.page:typeof page!=="undefined"?page:undefined));;return buf.join("");
}
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

$(function () {
    if (window.page.name !== 'orgs') {
        return false;
    }

    var form = $('#org-search-filters');

    form.on('submit', function(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        $.ajax({
            url: form.attr('action'),
            data: form.serialize(),
            dataType: 'JSON',
            success: function(data) {
                $('#search-results').html(window.templates.org_list({options: data}));
            },
            error: function (err) {
                $('#search-results').html('<p class="message">Service not available.</p>');
            }
        })
    });

    $(document).on('click', '.filter-button:not(".filter-button_active")', function () {
        var pressedButton = $(this);

        $('.filter-button').removeClass('filter-button_active');
        pressedButton.addClass('filter-button_active');
        $('input[name="sort"]').val(pressedButton.attr('id').replace(/^filter-/, ''));
        form.submit();
        return false;
    });

    $('input[name="searchText"]').on('keyup', function () {
        if (!$(this).val()) {
            form.submit();
        }
    });

    $(document).on('click', '#org-search.active', function() {
        form.submit();
    });

});

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

$(function () {
    if (window.page.name !== 'vacancies') {
        return false;
    }

    var form = $('#vacancy-search-filters');

    form.on('submit', function(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        $.ajax({
            url: form.attr('action'),
            data: form.serialize(),
            dataType: 'JSON',
            success: function(data) {
                $('#search-results').html(window.templates.vacancies_list({options: data.page.searchResult}));
            },
            error: function (err) {
                $('#search-results').html('<p class="message">Service not available.</p>');
            }
        })
    });

    $(document).on('click', '.filter-button:not(".filter-button_active")', function () {
        var pressedButton = $(this);

        $('.filter-button').removeClass('filter-button_active');
        pressedButton.addClass('filter-button_active');
        $('input[name="sort"]').val(pressedButton.attr('id').replace(/^vac-sort-/, ''));
        form.submit();
        return false;
    });

    $('input[name="vacancySearchText"]').on('keyup', function () {
        if (!$(this).val()) {
            form.submit();
        }
    });
    $('#vac-search').on('click', function () {
        form.submit();
    });

    $(document).on('click', '#org-search.active', function() {
        form.submit();
    });
    $(document).on('customSelectChange', function(evt) {
        form.submit();
    });
    

});

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

$(function () {
    if (window.page.name !== 'events-search') {
        return false;
    }
    var form = $('#event-search-filters');
    
    form.on('submit', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();

        $.ajax({
            url: form.attr('action'),
            data: form.serialize(),
            dataType: 'JSON',
            success: function(data) {
                console.log(data)
                $('#search-results').html(window.templates.events_search_list({options: data.page.searchResult}));
            },
            error: function (err) {
                $('#search-results').html('<p class="message">Service not available.</p>');
            }
        });
    });
    $(document).on('emptyinput', function () {
        form.submit();
    });
    
    $('#evt-search').on('click', function () {
        if ($(this).hasClass('active')) {
            form.submit();
        }
    });

    $(document).on('click', '.filter-button:not(".filter-button_active")', function () {
        var pressedButton = $(this);

        $('.filter-button').removeClass('filter-button_active');
        pressedButton.addClass('filter-button_active');
        $('input[name="sort"]').val(pressedButton.attr('id').replace(/^evt-sort-/, ''));
        form.submit();
        return false;
    });


});

$(function () {
    if (window.page.name !== 'search') {
        return false;
    }
    var form = $('#search-filters');
    form.find('a#search').on('click', function (evt) {
        evt.preventDefault();
        form.submit();
    });
    
    form.on('submit', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();

        $.ajax({
            url: form.attr('action'),
            data: form.serialize(),
            dataType: 'JSON',
            success: function(data) {
                console.log(data.page.searchResult);
                $('#search-results').html(window.templates.common_search({options: data.page.searchResult}));
            },
            error: function (err) {
                $('#search-results').html('<p class="message">Service not available.</p>');
            }
        })
    });
});

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
