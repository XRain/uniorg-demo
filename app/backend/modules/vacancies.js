var vacancies = {};
var utils = require('./utils');
var moment = require('moment');
var i18n = require('./i18n');

vacancies.addNew = function (req, res) {
    var vacancyData = prepareVacancyData(req);
    var vacanciesCollection = req.db.get('vacancies');

    if (!!utils.validateFormData()) {
        var insert = vacanciesCollection.insert(vacancyData);

        insert.on('success', function(doc) {
            res.redirect('/personal/#vacancies');
        });
        insert.on('error', function (err) {
            res.status(500).end();
            console.log(err);
        });
    } else {

    }
};

vacancies.update = function (req, res) {
    var id = req.body['vacancyId'];
    var vacancyData = prepareVacancyData(req);
    var vacanciesCollection = req.db.get('vacancies');
    vacanciesCollection.findAndModify({ _id: id, owner: req.user._id }, vacancyData).on('success', function (doc) {
        res.redirect('/personal#!vacancies');
    }).on('error', function (err) {
        res.status(500).end();
        console.log(err);
    });
};

vacancies.delete = function (req, res) {
    var id = req.body.vacancyToDelete.replace(/"/g, '');
    var vacanciesCollection = req.db.get('vacancies');
    
    vacanciesCollection.remove({ _id: id, owner: req.user._id }, function (err) {
        if (err) {
            res.status(500).end();
            console.log(err);
        } else {
            res.redirect('/personal#vacancies');
        }
    });
};

vacancies.getByOrg = function(req, res) {
    var db = req.db;
    var vacanciesCollection = db.get('vacancies');
    var pageLang = req.session.lang;
    var locale = i18n.vacListActions(pageLang);

    var sortKey = req.query.sort;
    var searchText = req.query.searchText;

    var searchOptions = {
        owner: req.user._id
    };

    if (!!searchText) {
        searchOptions.vacancyName = new RegExp('^(.*)' + searchText + '(.*)$', 'gi')
    }

    var order = (sortKey === 'vacancyDate')?'desc':'asc';
    sortKey = (sortKey === 'alphabet')?'vacancyName':sortKey;
    
    var request = vacanciesCollection.find(searchOptions, {
        sort : [[sortKey, order]],
        fields: ['_id', 'vacancyName', 'vacancyDate', 'fullTime', 'pastTime']
    });
    request.on('success', function(docs) {
        var sortedDocs = {};
        if(!!docs) {
            for (var i = 0, len = docs.length; i < len; i++){
                docs[i].friendlyDate = moment(docs[i].vacancyDate).format("DD.MM.YYYY", req.session.lang);
            }
            sortedDocs = {
                hasResults: true,
                key: sortKey,
                vacancies: docs,
                i18n: locale
            };
            res.send(sortedDocs);
        }
    });
};


for (var method in vacancies) {
    if (!method.match(/^_(.*)/)) {
        exports[method] = vacancies[method];
    }
}


function prepareVacancyData(req) {
    var params = req.body;

    var formattedDate = params.vacancyDate.split('-');
    var selectedDate = null;
    if (!!formattedDate && formattedDate.length == 3) {
        selectedDate = new Date(formattedDate[2], formattedDate[1] - 1, Number(formattedDate[0]));
    } else {
        selectedDate = new Date;
    }
    
    var salaryFrom = Number(params.salaryFrom) || 0;
    var salaryTo = Number(params.salaryTo) || 0;
    
    if (salaryTo < salaryFrom) {
        salaryTo = salaryFrom
    }

    var eventData = {
        owner: req.user._id,
        ownerName: req.user.name,
        vacancyName: utils.sanitizeText(params.vacancyName),
        vacancyDate: selectedDate,
        vacanciesEmail: utils.sanitizeText(params.vacanciesEmail),
        vacanciesWebsite: utils.sanitizeText(params.vacanciesWebsite),
        fullTime: !! params.fullTime || false,
        pastTime: !! params.pastTime || false,
        salaryFrom: salaryFrom,
        salaryTo: salaryTo,
        about: params.about
    };

    return eventData;
}
