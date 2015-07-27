var event = {};

var i18n = require('../i18n');
var moment = require('moment');
var commonData = require('../common_page_data');
var events = require('../events');

event.get = function (req, res) {
    var db = req.db;
    var eventsCollection = db.get('events');
    var id = req.query.id;

    if(id.length == 24) {
        eventsCollection.findById(id).on('success', function(doc) {
            var pageData = commonData.get(req, res);
            var pageLang = req.session.lang;
            pageData.page.i18n =  i18n.getLocale('event', pageLang);
            pageData.page.name = 'event';
            if(!!doc) {
                events.incrementViewsCount(id, db);
                pageData.page.event = doc;
                pageData.page.event.eventDate = moment(doc.eventDate).format("dddd, D MMMM", pageLang);
                pageData.page.event.regDeadline = doc.regDeadline?moment(doc.regDeadline).format("dddd, D MMMM", pageLang):'-';
                pageData.page.event.contact = [doc.location, doc.phone, doc.email].join(' ');

                eventsCollection.find({
                    eventType: pageData.page.event.eventType
                }, {
                    limit: 30,
                    fields: ['_id', 'eventName', 'eventDate', 'eventType', 'image']
                }).on('success', function(docs) {
                    if (!!docs) {
                        pageData.page.similar = docs;
                        for(var i = 0, len = pageData.page.similar.length; i< len; i++) {
                            var evt = pageData.page.similar[i];
                            if (evt._id.toString() === pageData.page.event._id.toString()) {
                                pageData.page.similar[i] = null;
                            } else {
                                evt.friendlyDate = moment(evt.eventDate).format("dddd, D MMMM", pageLang);
                            }
                        }

                        for(var i = 0, len = pageData.page.similar.length; i< len; i++) {
                            if(pageData.page.similar[i] === null) {
                                pageData.page.similar.splice(i, 1);
                            }
                        }

                    } else {
                        pageData.page.similar = {};
                    }

                    var callback = function(pageData) {
                        res.render('event', pageData);
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


for (var method in event) {
    if (!method.match(/^_(.*)/)) {
        exports[method] = event[method];
    }
}
