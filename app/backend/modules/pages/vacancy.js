var vacancy = {};

var i18n = require('../i18n');
var moment = require('moment');
var commonData = require('../common_page_data');
var events = require('../events');

vacancy.get = function (req, res) {
    var vacanciesCollection = req.db.get('vacancies');
    var id = req.query.id;

    if(id.length == 24) {
        vacanciesCollection.findById(id).on('success', function(doc) {
            var pageData = commonData.get(req, res);
            var pageLang = req.session.lang;
            pageData.page.i18n =  i18n.getLocale('vacancy', pageLang);
            pageData.page.name = 'vacancy';
            if(!!doc) {
                pageData.page.vacancy = doc;
                pageData.page.vacancy.vacancyDate = moment(doc.vacancyDate).format("DD.MM.YYYY", pageLang);

                var callback = function(pageData) {
                    res.render('vacancy', pageData);
                };
                events.getPromo(pageData, req, callback);
                
            } else {
                res.status(404).end();
            }
        });
    } else {
        res.status(400).end();
    }
};


for (var method in vacancy) {
    if (!method.match(/^_(.*)/)) {
        exports[method] = vacancy[method];
    }
}
