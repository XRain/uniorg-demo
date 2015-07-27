var search = {};
var i18n = require('../i18n');
var moment = require('moment');
var commonData = require('../common_page_data');


search.get = function (req, res) {
    var pageLang = req.session.lang;
    var pageData = commonData.get(req, res);
    
    pageData.page.name = 'search';
    pageData.page.i18n = i18n.getLocale('eventSearch', pageLang);
    pageData.page.searchResult = {};
    
    var callback = function(pageData) {
        res.render('search', pageData);
    };

    search.execute(req, res, callback, pageData);
};

search.getData = function (req, res) {
    var pageLang = req.session.lang;
    var pageData = {
        page: {
            searchResult: {
                i18n: i18n.getLocale('eventSearch', pageLang)
            }
        }
    };
    var callback = function (pageData) {
        res.send(pageData);
    };
    search.execute(req, res, callback, pageData);
};

search.execute = function (req, res, callback, pageData) {
    var db = req.db;
    var eventsCollection = db.get('events');
    var orgsCollection = db.get('users');
    var vacanciesCollection = db.get('vacancies');
    var searchText = req.query.searchText || req.body.searchText || '';

    pageData.page.searchResult.searchText = searchText;
    
    var queryRegexp = new RegExp('^(.*)' + searchText + '(.*)$', 'gi');
    
    var searchOptions = {$or: [
        {eventName: queryRegexp},
        {name: queryRegexp}, //Organization name
        {vacancyName: queryRegexp} //Organization name
        
    ]};
    var eventsRequest = eventsCollection.find(searchOptions);
    eventsRequest.on('success', function (docs) {
        if (!!docs) {
            for (var i = 0, len = docs.length; i < len; i++){
                docs[i].friendlyDate = moment(docs[i].eventDate).format("dddd, D MMMM", req.session.lang);
            }
        }
        pageData.page.searchResult.events = docs || [];
        // Organizations search
        var orgsRequest = orgsCollection.find(searchOptions);
        
        orgsRequest.on('success', function (docs) {
            pageData.page.searchResult.orgs = docs || [];
            // Vacancies search
            var vacRerquest = vacanciesCollection.find(searchOptions);
            vacRerquest.on('success', function (docs) {
                if(!!docs) {
                    for (var i = 0, len = docs.length; i < len; i++){
                        docs[i].friendlyDate = moment(docs[i].vacancyDate).format("DD.MM.YYYY");
                    }
                }
                pageData.page.searchResult.vacs = docs || [];
                if (typeof callback == 'function') {
                    callback(pageData);
                }
            })
        });
    });
    eventsRequest.on('error', function (err) {
        console.log(err);
        res.status(500).end()
    })    
};

for (var method in search) {
    if (!method.match(/^_(.*)/)) {
        exports[method] = search[method];
    }
}

