var router = {};
var fs = require('fs');
var authManager = require('./authManager');
var events = require('./events');
var vacancies = require('./vacancies');
var mailer = require('./mailer');
var utils = require('./utils');


var pages = {};
var pageNames = fs.readdirSync('app/backend/modules/pages/');



for (var i = 0, len = pageNames.length; i < len; i++) {
    var name = pageNames[i].replace('.js', '');
    pages[name] = require('./pages/' + name);
}

router.route = function(app) {
    // Auth and registration
    app.post('/users/register', function (req, res) {
        authManager.registerUser(req, res);
    });
    app.post('/users/update', function (req, res) {
        authManager.updateUser(req, res);
    });
    app.post('/users/update-settings', function (req, res) {
        authManager.updateSettings(req, res);
    });
    //contacts form
    app.get('/contacts', function (req, res) {
        pages.contacts.get(req, res);
    });
    app.get('/message', function (req, res) {
        mailer.sendMessageFromPage(req, res);
    });
    
    //main page
    app.get('/', function (req, res) {
        pages.index.get(req, res);
    });
    app.get('/update/calendar', function (req, res) {
        pages.index.getCalendarData(req, res);
    });

    //personal page
    app.get('/personal', function(req, res) {
        pages.personal.get(req, res);
    });
    app.get('/events/get-own', function(req, res) {
        events.getByOrg(req, res);
    });
    app.get('/vacancies/get-own', function(req, res) {
        vacancies.getByOrg(req, res);
    });
    
    //vacancies list page
    app.get('/vacancies', function(req, res) {
        pages.vacanciesList.get(req, res);
    });
    app.get('/vacancies/search', function(req, res) {
        pages.vacanciesList.search(req, res);
    });
    
    //vacancies management
    app.post('/vacancies/add',function(req,res){
        if (!req.user || req.user.confirmed == false) {
            res.status(403).end();
        } else {
            vacancies.addNew(req, res);
        }
    });
    app.get('/vacancies/get', function(req, res) {
        pages.vacancy.get(req, res);
    });
    app.get('/vacancies/edit', function (req, res) {
        pages.editVacancy.get(req, res);
    });
    app.post('/vacancies/update', function (req, res) {
        vacancies.update(req, res);
    });
    app.post('/vacancies/delete', function (req, res) {
        vacancies.delete(req, res);
    });
    
    //Events search page
    app.get('/search', function (req, res) {
        pages.search.getData(req, res);
    });
    app.post('/search', function (req, res) {
        pages.search.get(req, res);
    });

    //Events management
    app.post('/events/add',function(req,res){
        if (!req.user || req.user.confirmed == false) {
            res.status(403).end();
        } else {
            events.addNew(req, res);
        }
    });
    app.get('/events/get', function(req, res) {
        pages.event.get(req, res);
    });
    app.get('/events/edit', function (req, res) {
        pages.editEvent.get(req, res);
    });
    app.post('/events/update', function (req, res) {
        events.update(req, res);
    });
    app.post('/events/delete', function (req, res) {
        events.delete(req, res);
    });
    app.get('/events/search', function (req, res) {
        var callback = function (pageData) {
            res.send(pageData)
        };
        events.search(req, res, callback);
    });

    app.get('/events/stats', function (req, res) {
        events.getFbPostStatistics(req, res);
    });

    //Organization search page
    app.get('/orgs', function(req, res) {
        pages.orgsList.get(req, res);
    });
    app.get('/orgs/search', function(req, res) {
        pages.orgsList.search(req, res);
    });
    app.get('/orgs/get', function(req, res) {
        pages.org.get(req, res);
    });
    
    //Organizations search autocompletion
    app.get('/orgs/short-search', function(req, res) {
        pages.orgsList.shortSearch(req, res);
    });


    //services
    app.post('/upload/photo',function(req, res){
        utils.processUploadedImage(req, res);
    });
    app.post('/upload/banner',function(req, res){
        utils.processBannerImage(req, res);
    });


};


exports.route = router.route;
