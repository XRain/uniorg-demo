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