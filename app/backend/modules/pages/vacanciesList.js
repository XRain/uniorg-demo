var vacanciesList = {};
var i18n = require('../i18n');
var moment = require('moment');
var commonData = require('../common_page_data');
var events = require('../events');

vacanciesList.get = function (req, res) {
    var pageData = commonData.get(req, res);
    var pageLang = pageData.page.lang;
    
    console.log(pageLang)
    pageData.page.name = 'vacancies';
    pageData.page.i18n = i18n.getLocale('orgsList', pageLang);
    pageData.page.searchResult = {};

    var db = req.db;
    var vacanciesCollection = db.get('vacancies');
    var request = vacanciesCollection.find({});
    request.on('success', function(docs) {
        var orgsWithVacancies = {};
        var orgNames = [{
            name: 'Any',
            title: 'Any'
        }];
        for (var d in docs) {
            var vacancy = docs[d];
            orgsWithVacancies[vacancy.ownerName] = vacancy.ownerName;
            
        }
        for (var name in orgsWithVacancies) {
            orgNames.push({
                name: name,
                title: name
            })
        }
        pageData.page.orgNames = orgNames;
        vacanciesList._getVacancies(req, pageData, getFullPage);
    }).on('error', function(err) {
        console.log('err');
        res.status(500).end();
    });

    var promoCallback = function(pageData) {
        res.render('vac_list', pageData);
    };

    var getFullPage = function (pageData) {
        events.getPromo(pageData, req, promoCallback);
    };
    
    
};

vacanciesList.search = function(req, res) {
    var pageLang = req.session.lang;
    var pageData = {
        page: {
            searchResult: {}
        }
    };
    
    var getSearchResult = function (pageData) {
        pageData.page.searchResult.i18n = i18n.vacListActions(pageLang);
        res.send(pageData);
    };

    vacanciesList._getVacancies(req, pageData, getSearchResult)
};

vacanciesList._getVacancies = function (req, pageData, callback) {
    var db = req.db;
    var vacanciesCollection = db.get('vacancies');

    var params = req.query;
    var searchRequest = {};
    var searchOptions = {};
    
    searchOptions.sort = (params.sort == 'alphabet')?[['vacancyName', 'asc']]:[['vacancyDate', 'desc']];
    
    if (!!params.filterEmployment && params.filterEmployment != 'Any') {
        searchRequest[params.filterEmployment] = true;
    }
    
    if (params.filterOrg && params.filterOrg != 'Any') {
        searchRequest.ownerName = params.filterOrg;
    }
    if (!!params.vacancySearchText) {
        searchRequest.vacancyName = new RegExp('^(.*)' + params.vacancySearchText + '(.*)$', 'gi')
    }

    var request = vacanciesCollection.find(searchRequest, searchOptions);

    request.on('success', function(docs) {
        
        if(!!docs) {
            for (var i = 0, len = docs.length; i < len; i++){
                docs[i].friendlyDate = moment(docs[i].vacancyDate).format("DD.MM.YYYY");
            }
            pageData.page.searchResult.vacancies = docs;
        } else {
            
        }
        callback(pageData);
    }).on('error', function (err) {
        console.log(err);
        res.status(500).end();
    });
};


for (var method in vacanciesList) {
    if (!method.match(/^_(.*)/)) {
        exports[method] = vacanciesList[method];
    }
}
