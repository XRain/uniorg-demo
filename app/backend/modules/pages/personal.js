var personal = {};

var moment = require('moment');
var commonData = require('../common_page_data');
var i18n = require('../i18n');
var events = require('../events');

personal.get = function (req, res) {
    var user = req.user;

    if(!user) {
        res.redirect('/');
        return false;
    }

    var pageData = commonData.get(req, res);
    pageData.page.user = user;
    pageData.page.name = 'personal';
    
    var pageLang = req.session.lang;
    pageData.page.i18n =  i18n.getLocale('personal', pageLang);
    personal._queryUserContent(req, res, pageData, callBack);

    function callBack(data) {
        var vacanciesCollection = req.db.get('vacancies');
        vacanciesCollection.find({owner: req.user._id}, {
            sort : [['vacancyDate', 'asc']],
            fields: ['_id', 'vacancyName', 'vacancyDate', 'fullTime', 'pastTime']
        }).on('success', function (vacancies) {
            if (!!vacancies) {
                for (var i = 0, len = vacancies.length; i < len; i++){
                    vacancies[i].friendlyDate = moment(vacancies[i].vacancyDate).format("DD.MM.YYYY", req.session.lang);
                }
                pageData.page.vacancies = vacancies
            } else {
                pageData.page.vacancies = []
            }
            res.render('personal.jade', data);
        }).on('error', function (err) {
            res.status(500).end();
            console.log(err);
        });
        
    }

};

personal._queryUserContent = function (req, res, pageData, callback) {
    
    var eventsCollection = req.db.get('events');

    eventsCollection.find({owner: req.user._id}, {
        sort : [['eventDate', 'desc']],
        fields: ['_id', 'eventName', 'eventDate', 'eventType', 'image', 'views', 'fbPostId']
    }).on('success', function (docs) {
        if (!!docs) {
            for (var i = 0, len = docs.length; i < len; i++){
                docs[i].friendlyDate = moment(docs[i].eventDate).format("dddd, D MMMM", req.session.lang);
            }
            pageData.page.events = docs
        } else {
            pageData.page.events = []
        }

        var fn = function(pageData) {
            callback(pageData);
        };

        events.getPromo(pageData, req, fn);
        
        
    });
    
    
};


for (var method in personal) {
    if (!method.match(/^_(.*)/)) {
        exports[method] = personal[method];
    }
}
