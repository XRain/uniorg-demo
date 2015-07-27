var orgList = {};
var i18n = require('../i18n');
var moment = require('moment');
var commonData = require('../common_page_data');
var events = require('../events');

var alphabet = {
    en: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    nl: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
};

orgList.get = function (req, res) {
    var pageData = commonData.get(req, res);
    pageData.page.name = 'orgs';
    var db = req.db;
    var users = db.get('users');

    var pageLang = req.session.lang;
    pageData.page.i18n = i18n.getLocale('orgsList', pageLang);

    var request = users.find({type: 'org', confirmed: true}, ['name', '_id', 'department', 'orgType']);

    request.on('success', function(docs) {
        var sortedDocs = {
            key: '',
            docs: []
        };
        pageData.page.searchResult = {
            hasResults: false
        };

        if(!!docs) {
            sortedDocs = orgList._getSorted(docs, 'alphabet', pageLang);
            pageData.page.searchResult.hasResults = true;
            pageData.page.searchResult.key = sortedDocs.key;
            pageData.page.searchResult.orgs = sortedDocs.docs
        }

        var callback = function(pageData) {
            res.render('org_list', pageData);
        };

        events.getPromo(pageData, req, callback);
    });
};

orgList.search = function(req, res) {
    var db = req.db;
    var users = db.get('users');
    var pageLang = req.session.lang;

    var sortKey = req.query.sort;
    var searchText = req.query.searchText;

    var searchOptions = {
        type: 'org',
        confirmed: true
    };

    if (!!searchText) {
        searchOptions.name = new RegExp('^(.*)' + searchText + '(.*)$', 'gi');
    }
    var request = users.find(searchOptions, ['name', '_id', 'department', 'orgType', 'vacancies', 'vacanciesPage']);
    
    request.on('success', function(docs) {
        var result = {
            hasResults: false
        };
        var sortedDocs = {
            key: '',
            docs: []
        };

        if(!!docs) {
            sortedDocs = orgList._getSorted(docs, sortKey, pageLang);
            result.hasResults = true;
            result.key = sortedDocs.key;
            result.orgs = sortedDocs.docs
        }
        res.send(result);
    });
    
    
};

orgList.shortSearch = function (req, res) {
    var db = req.db;
    var users = db.get('users');

    var searchText = req.query.text;

    var searchOptions = {
        type: 'org',
        confirmed: true
    };

    if (!!searchText) {
        searchOptions.name = new RegExp('^(.*)' + searchText + '(.*)$', 'gi');
    }
    var request = users.find(searchOptions, {
        limit: 5,
        fields: ['name', '_id']
    });

    request.on('success', function(docs) {
        var result = {
            status: (docs.length > 0) ? 'success' : 'empty',
            orgs: (docs.length > 0) ? docs : null
        };
        res.send(result);
    });
    
    request.on('error', function (err) {
        console.log(err);
        res.status(500).end();
    })
};

orgList._getSorted = function (docs, key, lang) {
    var selectedAlphabet = alphabet[lang];

    var sortedDocs = {};
    if (key === 'alphabet') {
        for (var i = 0, len = selectedAlphabet.length; i < len; i++) {
            var letter = selectedAlphabet[i];
            sortedDocs[letter] = [];
            for (var d in docs) {
                var firstNameLetter = docs[d].name.match(/^(.).*$/)[1];
                if (firstNameLetter === letter || firstNameLetter === letter.toUpperCase()) {
                    sortedDocs[letter].push(docs[d]);
                }
            }
            if(sortedDocs[letter].length <= 0) {
                delete sortedDocs[letter];
            }
        }
    //Vacancies, sorted by department
    } else if (key === 'vacancy') {
        sortedDocs.totals = {};
        for (var rec in docs) {
            if (!!docs[rec]['department']) {
                sortedDocs[docs[rec]['department']] = []
            }
        }

        for (var field in sortedDocs) {
            if (field != 'totals') {
                for (var d in docs) {
                    if(docs[d]['department'] == field && docs[d].vacancies > 0) {
                        sortedDocs[field].push(docs[d])
                    }
                }
            }
        }
        for (var field in sortedDocs) {
            if (field != 'totals') {
                if (sortedDocs[field].length > 0) {
                    sortedDocs.totals[field] = 0;
                    for (var d in sortedDocs[field]) {
                        sortedDocs.totals[field] += Number(sortedDocs[field][d].vacancies)
                    }
                } else {
                    delete sortedDocs[field];
                }
            }
        }
    // Types and departments search
    } else {
        for (var rec in docs) {
            if (!!docs[rec][key]) {
                sortedDocs[docs[rec][key]] = []
            }
        }

        for (var field in sortedDocs) {
            for (var d in docs) {
                if(docs[d][key] == field) {
                    sortedDocs[field].push(docs[d])
                }
            }
        }
    }

    var result = {
        key: key,
        docs: sortedDocs
    };
    return result;
};


for (var method in orgList) {
    if (!method.match(/^_(.*)/)) {
        exports[method] = orgList[method];
    }
}
