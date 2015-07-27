var events = {};
var moment = require('moment');
var i18n = require('./i18n');
var utils = require('./utils');
var config = require('../../../../config.js').get();
var FB = require('fb');
FB.setAccessToken(config.fbApiToken);

events.getPromo = function (pageData, req, callback) {
    var eventsCollection = req.db.get('events');
    pageData.page.slides = [];
    
    eventsCollection.find({eventDate: {$gt: new Date()}}, {
        limit: 30,
        sort : [['eventDate', 'asc']],
        fields: ['_id', 'eventName', 'eventDate', 'eventType', 'image', 'bannerText', 'bannerImage']
    }).on('success', function (evts) {

        if (!!evts) {
            pageData.page.promo = evts;
            for (var e in pageData.page.promo) {
                var evt = pageData.page.promo[e];
                evt.friendlyDate = moment(evt.eventDate).format("dddd, D MMMM", req.session.lang || 'en')
            }
        } else {
            pageData.page.promo = [];
        }
        
        var totalEvents = evts.length;
        if (totalEvents > 0) {
            for (var i = 0; i < 5 && i < totalEvents; i++) {
                pageData.page.slides.push({
                    pos: i + 1,
                    title: evts[i].eventName,
                    text: evts[i].bannerText,
                    img: evts[i].bannerImage || null,
                    href: '/events/get/?id=' + evts[i]._id
                });
            }
        } else {
            pageData.page.slides =  [
                {
                    pos: '1',
                    title: 'The Uniorg Project',
                    text: 'Knowledge is power!',
                    href: '/'
                }
            ]
        }
        
        
        callback(pageData);
    });
};

events.addNew = function (req, res) {
    var eventData = prepareEventData(req);
    var eventsCollection = req.db.get('events');

    eventData.views = 0;
    if (!!utils.validateFormData()) {
        var insert = eventsCollection.insert(eventData);

        insert.on('success', function(doc) {
            var message = '';
            message += doc.eventName + '\n';
            message += 'by ' +  doc.ownerName + '\n\n';
            message += doc.bannerText;
            
            FB.api(config.fbPageId + '/feed', 'post', {
                message: message,
                link: config.protocol + config.domain + '/events/get/?id=' + doc._id,
                picture: config.protocol + config.domain + '/' + doc.image
            }, function (result) {
                if(!result || result.error) {
                    console.log('FB error:' + result.error);
                } else {
                    eventsCollection.findAndModify({ _id: doc._id}, {$set: {fbPostId: result.id}}).on('error', function (err) {
                        console.log(err); 
                    });
                }
                res.redirect('/personal/#!events');
            });
            
            
        });
        insert.on('error', function (err) {
            res.status(500).end();
            console.log(err);
        });
    } else {

    }
};

events.update = function (req, res) {
    var id = req.body['eventId'];
    var eventData = prepareEventData(req);
    var eventsCollection = req.db.get('events');
    eventsCollection.findAndModify({ _id: id, owner: req.user._id }, {$set: eventData}).on('success', function (doc) {
        var message = 'Event ' + doc.eventName + ' updated!';
        FB.api(config.fbPageId + '/feed', 'post', {
            message: message,
            link: config.protocol + config.domain + '/events/get/?id=' + id
        }, function (result) {
            if(!result || result.error) {
                console.log('FB error:' + result.error);
            }
            res.redirect('/personal#!events');
        });
        
    }).on('error', function (err) {
        res.status(500).end();
        console.log(err);
    });
};

events.incrementViewsCount = function (id, db) {
    var eventsCollection = db.get('events');
    eventsCollection.update({ _id: id }, { $inc: { views: 1 } }).on('success', function () {
        return null;
    }).on('error', function (err) {
        console.log(err);
        return null;
    });
};

events.getFbPostStatistics = function (req, res) {
    var postId = req.query.postId;
    var responseData = {shares: '-', likes: '-', postId: postId}; //Default values, will be overwritten by real data or sent as is
    FB.api(postId + '/likes', 'get', {summary: 'true'}, function (result) {
        if(!result || result.error) {
            res.send(responseData);
        } else  {
            responseData.likes = result.summary?result.summary['total_count']:0;
            FB.api(postId, 'get', function (result) {
                if(!result || result.error) {
                    res.send({shares: '-', likes: '-'});
                } else {
                    responseData.shares = result.shares?result.shares.count:0;
                    res.send(responseData);
                }
            });
        }
    });
};

events.delete = function (req, res) {
    var id = req.body.eventToDelete.replace(/"/g, '');
    var eventsCollection = req.db.get('events');
    
    eventsCollection.find({ _id: id, owner: req.user._id }).on('success', function (doc) {
        var message = 'Event ' + doc[0].eventName + ' cancelled!';
            
        FB.api(config.fbPageId + '/feed', 'post', {
            message: message
        }, function (result) {
            if(!result || result.error) {
                console.log('FB error:' + result.error);
            }
            
            eventsCollection.remove({ _id: id, owner: req.user._id }, function (err) {
                if (err) {
                    res.status(500).end();
                    console.log(err);
                } else {
                    res.redirect('/personal/!#events');
                }
            });
        });
    }).on('error', function () {
        res.status(500).end();
        console.log(err);
    });
};

events.search = function (req, res, callback, pageData) {
    var db = req.db;
    var eventsCollection = db.get('events');
    var today = new Date;
    today.setDate(today.getDate() - 1);
    
    var filtersStructure = {
        filterOrg: {field: 'ownerName', prepare: function(queryText) {
            if(queryText == 'Any') {queryText = new RegExp('^.*$', 'gi')}
            return queryText;
        }},
        filterType: {field: 'eventType', prepare: function (queryText) {
            return queryText;
        }},
        filterTargetAud: {field: 'eventTargetAud', prepare: function (queryText) {
            if (queryText == 'Any') {queryText = ''}
            return new RegExp('^(.*)' + queryText.replace('aud_', '') + '(.*)$', 'gi');
        }},
        filterAudNumber: {field: 'eventTargetNum', prepare: function (queryText) {
            return queryText;
        }},
        filterDatePicker: {field: 'eventDate', prepare: function (queryText) {
            var requestedDate = queryText.split('-');
            return {$gt: new Date(requestedDate[2], requestedDate[1] - 1, Number(requestedDate[0]))};
        }}
    };
    
    var searchOptions = {
        eventDate: {$gt: today}
    };
    
    for (var f in filtersStructure) {
        var filter = filtersStructure[f];
        var requestParam = req.query[f]; 
        
        if (!!requestParam) {
            searchOptions[filter.field] = filter.prepare(requestParam);
        }
    }
    
    var searchText = req.query.calSearchText;
    if (!!searchText) {
        searchOptions.eventName = new RegExp('^(.*)' + searchText + '(.*)$', 'gi')
    }
    
    var sortKey = req.query.sort || 'eventDate';
    sortKey = (sortKey === 'alphabet')?'eventName':'eventDate';
    
    var order = (sortKey === 'eventDate')?'asc':'asc';
    
    var request = eventsCollection.find(searchOptions, {
        sort : [[sortKey, order]],
        fields: ['_id', 'eventName', 'eventDate', 'eventType', 'image']
    });
    
    request.on('success', function (docs) {
        var resData = (!!pageData)?pageData: {page: {}};

        for (var i = 0, len = docs.length; i < len; i++){
            docs[i].friendlyDate = moment(docs[i].eventDate).format("dddd, D MMMM", req.session.lang);
        }
        var sortedDocs = {
            key: sortKey,
            searchText: searchText,
            events: docs
        };
        resData.page.searchResult = sortedDocs;
        
        callback(resData);
    }).on('error', function (err) {
        console.log(err);
        res.status(500).end();
    });
    
};

events.getByOrg = function(req, res) {
    var db = req.db;
    var eventsCollection = db.get('events');
    var pageLang = req.session.lang;
    var locale = i18n.evtListActions(pageLang);

    var sortKey = req.query.sort;
    var searchText = req.query.searchText;

    var searchOptions = {
        owner: req.user._id
    };

    if (!!searchText) {
        searchOptions.eventName = new RegExp('^(.*)' + searchText + '(.*)$', 'gi')
    }
    
    var order = (sortKey === 'eventDate')?'desc':'asc';
    
    sortKey = (sortKey === 'alphabet')?'eventName':sortKey;
    var request = eventsCollection.find(searchOptions, {
        sort : [[sortKey, order]],
        fields: ['_id', 'eventName', 'eventDate', 'eventType', 'image', 'views', 'fbPostId']
    });    
    request.on('success', function(docs) {
        var sortedDocs = {};
        if(!!docs) {
            for (var i = 0, len = docs.length; i < len; i++){
                docs[i].friendlyDate = moment(docs[i].eventDate).format("dddd, D MMMM", req.session.lang);
            }
            sortedDocs = {
                hasResults: true,
                key: sortKey,
                events: docs,
                i18n: locale
            };
            res.send(sortedDocs);
        }
    });
};

for (var method in events) {
    if (!method.match(/^_(.*)/)) {
        exports[method] = events[method];
    }
}

function prepareEventData(req) {
    var params = req.body;

    var selectedDate = params.eventDate.split('-');
    var deadlineDate = params.regDeadline.split('-');

    var eventTime = '';
    var hours = Number(params.hours);
    var minutes = Number(params.minutes);
    if (hours && hours > 0 && hours < 25) {
        eventTime += hours + ':' + (minutes || '00');
    }

    var targetAudience = '';
    var coHosts = [];
    for (var p in params) {
        if(p.match(/^aud_.*/)) {
            targetAudience += (p.replace('aud_', '')) + ', '
        } else if (p.match(/^host_.*/)) {
            coHosts.push({
                id: p.replace('host_', ''),
                name: params[p]
            });
        }

    }
    if (!!targetAudience) {
        targetAudience = targetAudience.replace(/,\s$/, '')
    } else {
        targetAudience = 'Everyone'
    }
    
    var eventData = {
        owner: req.user._id,
        ownerName: req.user.name,
        eventName: utils.sanitizeText(params.eventName),
        eventDate: new Date(selectedDate[2], selectedDate[1] - 1, Number(selectedDate[0])),
        eventTime: eventTime,
        eventLang: params.eventLang || req.session.lang,
        coHosts: coHosts,
        email: utils.sanitizeText(params.email, 'email'),
        phone: utils.sanitizeText(params.phone, 'phone'),
        location: utils.sanitizeText(params.location),
        eventType: utils.sanitizeText(params.eventType),
        eventTargetAud: utils.sanitizeText(targetAudience),
        eventTargetNum: utils.sanitizeText(params.eventTargetNum, 'targetNum') || '-',
        sponsorshipInterest: !! params.sponsorshipInterest || false,
        resumePossible: !! params.resumePossible || false,
        sponsorshipCost: Number(params.sponsorshipCost),
        partCost: Number(params.partCost),
        comPartCost: Number(params.comPartCost),
        about: params.about,
        bannerText: params.bannerText,
        image: params.image
    };
    if (!!params.bannerImage) {
        eventData.bannerImage = params.bannerImage;
    }

    if(deadlineDate.length > 2) {
        eventData.regDeadline = new Date(deadlineDate[2], deadlineDate[1] - 1, Number(deadlineDate[0]));
    }
    
    return eventData;
}
