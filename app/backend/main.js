/**
 * App entry point
 */
var config = require('../../../config.js').get();
    
    
var databaseAccess = config.databaseAccess;
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var app = express();
var monk = require('monk');
var db = monk(databaseAccess);
var favicon = require('serve-favicon');
var users = db.get('users');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var router = require('./modules/router');


passport.serializeUser(function(user, done) {
    done(null, user._id);
});
passport.deserializeUser(function(id, done) {
    users.findById(id, function(err, user) {
        done(err, user);
    });
});
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(username, password, done) {
        users.findOne({ email: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (user.password !== password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

app.set('views', 'app/backend/templates/pages');
app.set('view engine', 'jade');

app.use(session({
    secret: 'uni',
    maxAge: new Date(Date.now() + 360000),
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({url: 'mongodb://' + databaseAccess})
}));

app.use(favicon('./static/favicon.ico'));


app.use(cookieParser('uniorg'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer({ dest: './static/img/uploads/',
    rename: function (fieldname, filename) {
        return 'upload'+Date.now();
    },
    onFileUploadStart: function (file, req, res) {
        //console.log(file.originalname + ' is starting ...')
    },
    onFileUploadComplete: function (file, req, res) {
        req.file = file;
        req.uploadedImagePath = '/' + file.path
    }
}));
app.use(passport.initialize());
app.use(passport.session());



app.use(function(req,res,next){
    req.db = db;
    next();
});


app.post('/login', passport.authenticate('local',  { 
        successRedirect: '/personal/#!info',
        failureRedirect: '/#loginFailed' 
    }),
    function(req, res) {
        req.session.id = req.user._id;
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});


router.route(app);

var server = app.listen(3000, '127.0.0.1', function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Uniorg app started at http://%s:%s', host, port)

});
