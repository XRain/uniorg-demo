var editEvent = {};
var i18n = require('../i18n');
var moment = require('moment');
var commonData = require('../common_page_data');
var events = require('../events');
var utils = require('../utils');

editEvent.get = function (req, res) {
    var eventsCollection = req.db.get('events');
    var id = req.query.id;

    if(id.length == 24) {
        eventsCollection.findById(id).on('success', function (doc) {
            if (!req.user || doc.owner.toString() !== req.user._id.toString()) {
                res.redirect('/');
                return false;
            }
            
            if (!!doc) {
                var pageData = commonData.get(req, res);
                var pageLang = req.session.lang;
                pageData.page.i18n = i18n.getLocale('personal', pageLang);
                pageData.page.name = 'editEvent';
                pageData.page.event = doc;
                
                var friendlyDateArray = [ pageData.page.event.eventDate.getDate(), pageData.page.event.eventDate.getMonth() + 1, pageData.page.event.eventDate.getFullYear() ];
                for (var i = 0, len = friendlyDateArray.length; i < len; i++) {
                    if (friendlyDateArray[i] < 10) {
                        friendlyDateArray[i] = '0' + friendlyDateArray[i];
                    }
                }
                var friendlyDeadlineArray = [];
                if (!!pageData.page.event.regDeadline) {
                    friendlyDeadlineArray = [ pageData.page.event.regDeadline.getDate(), pageData.page.event.regDeadline.getMonth() + 1, pageData.page.event.regDeadline.getFullYear() ];
                    for (var i = 0, len = friendlyDeadlineArray.length; i < len; i++) {
                        if (friendlyDeadlineArray[i] < 10) {
                            friendlyDeadlineArray[i] = '0' + friendlyDeadlineArray[i];
                        }
                    }
                }
                
                pageData.page.event.eventDate = pageData.page.event.eventDate.getDate().toString() + '-' +  (pageData.page.event.eventDate.getMonth() + 1).toString() + '-' + pageData.page.event.eventDate.getFullYear().toString();
                pageData.page.event.eventFriendlyDate = friendlyDateArray.join('.');
                if (friendlyDeadlineArray.length > 0) {
                    pageData.page.event.regDeadline = pageData.page.event.regDeadline.getDate().toString() + '-' +  (pageData.page.event.regDeadline.getMonth() + 1).toString() + '-' + pageData.page.event.regDeadline.getFullYear().toString();
                } else {
                    pageData.page.event.regDeadline = '';   
                }
                pageData.page.event.friendlyDeadline = (friendlyDeadlineArray.length > 0)?friendlyDeadlineArray.join('.'):pageData.page.i18n.datePicker;

                var callback = function(pageData) {
                    res.render('edit_event', pageData);
                };

                events.getPromo(pageData, req, callback);
            } else {
                res.status(404).end();
            }
            
            
        });
    }
};

editEvent._internalMethod = function () {

};


for (var method in editEvent) {
    if (!method.match(/^_(.*)/)) {
        exports[method] = editEvent[method];
    }
}
