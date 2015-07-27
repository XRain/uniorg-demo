var contacts = {};
var i18n = require('../i18n');
var events = require('../events');
var commonData = require('../common_page_data');
var utils = require('../utils');

contacts.get = function (req, res) {
    var pageData = commonData.get(req, res);
    var pageLang = req.session.lang;
    pageData.page.i18n =  i18n.getLocale('contacts', pageLang);
    pageData.page.name = 'contacts';
    
    var callback = function(pageData) {
        res.render('contacts', pageData);
    };

    events.getPromo(pageData, req, callback);
};



for (var method in contacts) {
    if (!method.match(/^_(.*)/)) {
        exports[method] = contacts[method];
    }
}
