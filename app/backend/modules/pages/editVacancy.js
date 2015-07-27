var editVacancy = {};
var i18n = require('../i18n');
var moment = require('moment');
var commonData = require('../common_page_data');
var events = require('../events');

editVacancy.get = function (req, res) {
    var vacanciesCollection = req.db.get('vacancies');
    var id = req.query.id;

    if(id.length == 24) {
        vacanciesCollection.findById(id).on('success', function (doc) {
            if (!req.user || doc.owner.toString() !== req.user._id.toString()) {
                res.redirect('/');
                return false;
            }
            
            if (!!doc) {
                var pageData = commonData.get(req, res);
                var pageLang = req.session.lang;
                pageData.page.i18n = i18n.getLocale('personal', pageLang);
                pageData.page.name = 'editVacancy';
                pageData.page.vacancy = doc;
                
                var friendlyDateArray = [ pageData.page.vacancy.vacancyDate.getDate(), pageData.page.vacancy.vacancyDate.getMonth() + 1, pageData.page.vacancy.vacancyDate.getFullYear() ];
                for (var i = 0, len = friendlyDateArray.length; i < len; i++) {
                    if (friendlyDateArray[i] < 10) {
                        friendlyDateArray[i] = '0' + friendlyDateArray[i];
                    }
                }
                
                pageData.page.vacancy.vacancyDate = pageData.page.vacancy.vacancyDate.getDate().toString() + '-' +  (pageData.page.vacancy.vacancyDate.getMonth() + 1).toString() + '-' + pageData.page.vacancy.vacancyDate.getFullYear().toString();

                var callback = function(pageData) {
                    res.render('edit_vacancy', pageData);
                };

                events.getPromo(pageData, req, callback);
            } else {
                res.status(404).end();
            }
            
            
        });
    }
};

for (var method in editVacancy) {
    if (!method.match(/^_(.*)/)) {
        exports[method] = editVacancy[method];
    }
}
