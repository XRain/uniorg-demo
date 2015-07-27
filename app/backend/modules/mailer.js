var mailer = {};
var nodemailer = require("nodemailer");
var config = require('../../../../config.js').get();
var i18n = require('./i18n');
var jade = require('jade');
var fs = require('fs');


var smtpTransport = nodemailer.createTransport({
    service: config.mailService,
    auth: {
        user: config.mailUsername,
        pass: config.mailPassword
    }
});

var emailTemplateText = fs.readFileSync(process.cwd() + '/app/backend/templates/emails/main/html.jade', {encoding: 'UTF8'});
var emailTemplate = jade.compile(emailTemplateText);

mailer.sendMessageFromPage = function (req, res) {
    var params = req.query;

    var messageText = 'From: ' + params.contactName + '\r\n'
        + 'email: ' + params.contactEmail + '\r\n'
        + params.about;
    var mailOptions = {
        to: "admin@uniorg.nl", 
        subject: "Message from " + params.contactName, 
        text: messageText
    };
    
    var callback = function (err, data) {
        if(err){
            console.log(err);
            res.send({status: 'error'});
        }else{
            res.send({status: 'ok'});
        }
    };
    
    this._sendMessage(mailOptions, callback)
};

mailer.sendConfirmationEmail = function(email, lang) {
    var locale = i18n.getLocale('email', lang);
    var messageText = emailTemplate({});
    var mailOptions = {
        to: email,
        subject: locale.confirmationSubject,
        html: messageText,
        generateTextFromHTML: true
    };
    mailer._sendMessage(mailOptions)
};

mailer._sendMessage = function (mailOptions, callback) {
    
    mailOptions.from = "no-reply@uniorg.nl";
    smtpTransport.sendMail(mailOptions, function(err, data){
        if (typeof callback === 'function') {
            callback(err, data)
        }
    });
};

for (var method in mailer) {
    if (!method.match(/^_(.*)/)) {
        exports[method] = mailer[method];
    }
}
