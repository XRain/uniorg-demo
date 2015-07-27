var org = {};
var i18n = require('../i18n');
var moment = require('moment');
var commonData = require('../common_page_data');
var events = require('../events');


org.get = function (req, res) {
    var users = req.db.get('users');
    var eventsCollection = req.db.get('events');
    var id = req.query.id;

    if(id.length == 24) {
        users.findById(id).on('success', function(doc) {
            var pageData = commonData.get(req, res);
            var pageLang = req.session.lang;
            pageData.page.i18n =  i18n.getLocale('org', pageLang);
            pageData.page.name = 'org';
            if(!!doc) {
                pageData.page.org = doc;
                eventsCollection.find({owner: pageData.page.org._id}, ['_id', 'eventName', 'eventDate', 'eventType', 'image']).on('success', function(evts) {
                    pageData.page.userEvents = evts;

                    for (var e in pageData.page.userEvents) {
                        var evt = pageData.page.userEvents[e];
                        evt.friendlyDate = moment(evt.date).format('dddd, D MMMM', pageLang)
                    }

                    var callback = function(pageData) {
                        res.render('org', pageData);
                    };

                    events.getPromo(pageData, req, callback);
                });

            } else {
                res.status(404).end();
            }

        });
    } else {
        res.status(400).end();
    }
};

org._internalMethod = function () {

};


for (var method in org) {
    if (!method.match(/^_(.*)/)) {
        exports[method] = org[method];
    }
}
