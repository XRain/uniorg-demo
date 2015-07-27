var getConfig = function() {
    return {
        protocol: 'http://',
        domain: 'uniorg.nl',
        databaseAccess: '',
        mailService: 'Yandex',
        mailUsername: 'no-reply@uniorg.nl',
        mailPassword: '',
        fbApiToken: '',
        fbPageId: ''
    }
};

exports.get = getConfig;
