var authManager = {};
var utils = require('./utils');
var mailer = require('./mailer');



authManager.registerUser = function (req, res) {
    var params = req.body,
        cookies = req.cookies,
        db = req.db;

    var users = db.get('users');

    var regCredentials = {
        type: params.type,
        email: params.email,
        password: utils.sha1hash(params.pass),
        name: params.title,
        about: params.about || ' ',
        confirmed: false
    };

    users.findOne({email: regCredentials.email}).on('success', function (doc) {
        if(!!doc) {
            res.json({
                    status: 'error',
                    reason: 'emailExists'
                }
            );
        } else {
            users.insert(regCredentials, function(err, doc) {
                mailer.sendConfirmationEmail(doc.email, req.session.lang);
                res.json({
                        status: 'success'
                    }
                );
            })
        }
    });
};

authManager.updateUser = function (req, res) {
    var params = req.body,
        db = req.db;

    var users = db.get('users');
    var tempUser = {};

    var updateOptions = {
        
        name: params.title,
        department: params.department,
        orgType: params.orgType,
        contactEmail: params.contactEmail,
        phone: params.phone,
        location: params.location,
        image: params.image,
        about: params.about,
        homepage: checkUrl(params.homepage),
        facebook: checkUrl(params.facebook),
        twitter: checkUrl(params.twitter),
        google: checkUrl(params.google),
        vacancies: params.vacancies,
        vacanciesPage: checkUrl(params.vacanciesPage)
    };

    for (var f in req.user) {
        tempUser[f] = req.user[f];
    }

    for (var f in updateOptions) {
        tempUser[f] = updateOptions[f];
    }

    users.updateById(req.user._id, tempUser, function () {
        res.redirect('/personal');
    });

};

authManager.updateSettings = function (req, res) {
    var params = req.body,
        db = req.db;

    var users = db.get('users');
    var tempUser = {};



    if(utils.sha1hash(params.oldPassword) == req.user.password && !!params.newPassword) {
        var updateOptions = {

            password: utils.sha1hash(params.newPassword),
            email: params.newEmail || req.user.email
        };

        for (var f in req.user) {
            tempUser[f] = req.user[f];
        }

        for (var f in updateOptions) {
            tempUser[f] = updateOptions[f];
        }

        users.updateById(req.user._id, tempUser, function () {
            res.redirect('/personal#settings');
        });
    } else if (!params.newPassword && params.newEmail) {

        var updateOptions = {

            email: params.newEmail
        };

        for (var f in req.user) {
            tempUser[f] = req.user[f];
        }

        for (var f in updateOptions) {
            tempUser[f] = updateOptions[f];
        }

        users.updateById(req.user._id, tempUser, function () {
            res.redirect('/personal#settings');
        });

    } else {
        res.send('ERROR');
    }

};

for (var method in authManager) {
    if (!method.match(/^_(.*)/)) {
        exports[method] = authManager[method];
    }
}


function sanitizeText(text, type) {
    return text;
}


function checkUrl (url) {
    url = sanitizeText(url, 'link');
    if(!!url && !url.match(/^http(s?):\/\//i)) {
        url = 'http://' + url;
    }
    return url;
}

