var index = {};
var events = require('../events');
var i18n = require('../i18n');
var moment = require('moment');
var commonData = require('../common_page_data');
var utils = require('../utils');

index.get = function (req, res) {
    var that = this;
    var db = req.db;
    var pageData = commonData.get(req, res);
    var pageLang = req.session.lang;
    pageData.page.i18n =  i18n.getLocale('index', pageLang);
    pageData.page.name = 'index';
    
    pageData.page.user = req.user;
    var eventsCollection = db.get('events');
    var request = eventsCollection.find({});
    request.on('success', function(docs) {
        var orgsWithEvents = {};
        var orgNames = [{
            name: 'Any',
            title: 'Any'
        }];
        for (var d in docs) {
            var event = docs[d];
            orgsWithEvents[event.ownerName] = event.ownerName;

        }
        for (var name in orgsWithEvents) {
            orgNames.push({
                name: name,
                title: name
            })
        }
        pageData.page.orgNames = orgNames;
        that.getCalendarData(req, res, pageData);
    }).on('error', function(err) {
        console.log('err');
        res.status(500).end();
    });
};

index.getCalendarData = function(req, res, pageData) {
    var pageLang = req.session.lang || en;
    var resData = pageData || {page: {}};
    var requestedDate = null;
    var filters = [];
    
    //filters
    for (var key in req.query) {
        if (req.query[key] === 'on') {
            filters.push(key);
        }
    }
    if(!!req.query.date) {
        requestedDate = req.query.date.split('-');
    }
    var targetDate = (!!requestedDate)?new Date(requestedDate[2], requestedDate[1] - 1, requestedDate[0]): new Date();

    resData.page.calendar = getCalendarGrid(targetDate, pageLang);
    resData.page.calendar.filters = {};
    var selectedDays = resData.page.calendar.selectedMonth.days;

    var queryParams = {
        eventDate: {
            $gte: new Date(resData.page.calendar.year, resData.page.calendar.selectedMonth.month, selectedDays[0].day),
            $lte: new Date(resData.page.calendar.year, resData.page.calendar.selectedMonth.month, selectedDays[Object.keys(selectedDays)[Object.keys(selectedDays).length - 1]].day)
        }

    };
    if (!pageData && filters.length > 0) {
        resData = utils.getDataStructure(resData);
        queryParams.eventType = {$in: filters};
        for (var i = 0, len = filters.length; i < len; i++) {
            resData.page.calendar.filters[filters[i]] = true;
        }
    } else {
        resData.page.calendar.filters = {};
        for (t in pageData.page.structure.evtTypes) {
            var type = pageData.page.structure.evtTypes[t];
            resData.page.calendar.filters[type.name] = true
        }
    }
    var eventsCollection= req.db.get('events');

    var callback = function(evts) {
        for (var day in selectedDays) {
            if(!!selectedDays[day].date) {
                for (var event in evts) {
                    evts[event].friendlyDate = moment(evts[event].eventDate).format("D MMMM", pageLang);
                    evts[event].dayOfWeek = moment(evts[event].eventDate).format("dddd", pageLang);
                    if(evts[event].eventDate.toString() == selectedDays[day].date.toString()) {
                        selectedDays[day].events.push(evts[event]);
                    }
                }
            }
        }

        if (!!pageData) {
            var callback = function(pageData) {
                res.render('index', pageData);
            };
            
            events.getPromo(resData, req, callback);
            
        } else {
            resData.page.i18n = i18n.getLocale('index', pageLang);
            res.send(resData);
        }
    };
    
    
    eventsCollection.find(queryParams).on('success', callback);
};

for (var method in index) {
    if (!method.match(/^_(.*)/)) {
        exports[method] = index[method];
    }
}

function getCalendarGrid(startDate, lang) {
    moment.locale(lang);
    var month = startDate.getMonth();
    var year = startDate.getFullYear();
    var daysInMonth = getDaysInMonth(year, month);


    var grid = {
        selectedDate: '1-' + (month + 1) + '-' + year ,
        weekdays: (lang == 'en')?['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']:['ZON', 'MAA', 'DIN', 'WOE', 'DON', 'VRI', 'ZAT'],
        year: year.toString(),
        selectedMonth: {
            month: month,
            monthName: moment(startDate).format('MMMM', lang).replace(/^(.)/, function(res) { return res.toUpperCase()}),
            'days': []
        },
        prevMonth: {
            month: month - 1,
            monthName: moment(new Date(year, month - 1, 1)).format('MMMM', lang).replace(/^(.)/, function(res) { return res.toUpperCase()}),
            days: []
        },
        nextMonth: {
            month: month + 1,
            monthName: moment(new Date(year, month + 1, 1)).format('MMMM', lang).replace(/^(.)/, function(res) { return res.toUpperCase()}),
            days: []
        }
    };

    var firstDayPosition = new Date(year, month, 1).getDay();
    var daysInPrevMonth = getDaysInMonth(year, month -1);
    var diff = (daysInPrevMonth - firstDayPosition) + 1;
    var nextDiff = 42 - (daysInMonth + (daysInPrevMonth - diff));

    for (var i = diff; i <= daysInPrevMonth; i++) {
        var currentDate = new Date(year, month -1, i);
        grid.prevMonth.days.push({
            date: currentDate,
            day: (currentDate.getDate()).toString(),
            dayOfWeek: currentDate.getDay() + 1,
            events: []

        });
    }

    for (var i = 1; i <= daysInMonth; i++) {
        var currentDate = new Date(year, month, i);
        grid.selectedMonth.days.push({
            date: currentDate,
            day: (currentDate.getDate()).toString(),
            dayOfWeek: currentDate.getDay(),
            events: []
        });
        
    }
    for (var i = 1; i < nextDiff; i++) {
        var currentDate = new Date(year, month + 1, i);
        grid.nextMonth.days.push({
            date: currentDate,
            day: (currentDate.getDate()).toString(),
            dayOfWeek: currentDate.getDay(),
            events: []
        });
    }
    return grid;

}

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}
