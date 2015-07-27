var module = {};
var i18n = require('./i18n');
var utils = require('./utils');

module.get = function (req, res) {
    var auth = {};

    var cookies = req.cookies;

    if (cookies.selectedLang) {
        req.session.lang = cookies.selectedLang;
        res.clearCookie('selectedLang');
    }

    if (!!req.user) {
        auth = {
            loggedIn:  '1',
            username: req.user.name
        }
    }
    var pageLang = req.session.lang || 'en';

    var pageData = {
        page: {
            lang: pageLang,
            auth: auth
        }
    };
    pageData = utils.getDataStructure(pageData);

    req.session.lang = pageLang;

    return pageData;
};


for (var method in module) {
    if (!method.match(/^_(.*)/)) {
        exports[method] = module[method];
    }
}
