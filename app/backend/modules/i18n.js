var i18n = {};

i18n.getLocale = function (page, lang) {
    var pageLocale = i18n['_' + page][lang];
    var commonLocale = i18n['_common'][lang];

    for (var pair in pageLocale) {
        commonLocale[pair] = pageLocale[pair]
    }

    return commonLocale;
};

i18n.evtListActions = function(lang) {
    var locale = {
        en: {
            editEvent: 'Edit',
            eventStat: 'Statistics',
            deleteEvent: 'Delete'
        },
        nl: {
            editEvent: 'Verander',
            eventStat: 'Statistics',
            deleteEvent: 'Verwijderen'}
    };
    return locale[lang]
};
i18n.vacListActions = function(lang) {
    var locale = {
        en: {
            fullTime: 'Full-time',
            pastTime: 'Part-time',
            editEvent: 'Edit',
            deleteEvent: 'Delete'
        },
        nl: {
            fullTime: 'Full-time',
            pastTime: 'Part-time',
            editEvent: 'Verander',
            deleteEvent: 'Verwijderen'}
    };
    return locale[lang]
};

i18n._index = {
    en: {
        moreEvents: 'MORE EVENTS',
        moreEventsButton: 'more events',
        eventsDbButton: 'VIEW ALL EVENTS',
        eventsCalButton: 'SWITCH TO CALENDAR VIEW',
        backToList: 'Back to list view'
    },
    nl: {
        moreEvents: 'MEER EVENEMENTEN',
        moreEventsButton: 'meer evenementen',
        eventsDbButton: 'BEKIJK ALLE EVENEMENTEN',
        eventsCalButton: 'SWITCH TO CALENDAR VIEW',
        backToList: 'Back to list view'
    }
};
i18n._common = {
    en: {
        home: 'Home',
        orgs: 'Student organizations',
        events: 'Events',
        mContacts: 'Contact',
        mVacancies: 'Vacancies',
        menuEvents: 'My events',
        menuVacancies: 'My vacancies',
        learnMore: 'Learn more',
        datePicker: 'Select a date',
        forOrgs: 'FOR STUDENT ORGANIZATIONS',
        forComs: 'FOR COMPANIES',
        signin: 'SIGN IN',
        signup: 'SIGN UP',
        forgotPassword: 'Forgot your password?',
        noAccount: 'Don\'t have an account?',
        createOne: 'Create one',
        login: 'Sign in ',
        enterEmail: 'Enter the E-mail',
        enterPassword: 'Enter your password',
        enterTitle: 'Enter your organization name',
        enterComTitle: 'Enter your company name',
        loginInExist: 'Already registered?',
        passRecovery: 'PASSWORD RECOVERY',
        sendPasswd: 'SEND A NEW PASSWORD',
        sponsorshipCost: 'Sponsorship cost',
        passRecovered: 'A new password has been sent to your E-mail',
        mySettings: 'Profile',
        logout: 'Logout',
        accCreated: 'ACCOUNT CREATED',
        regSuccess1: 'You can now',
        regSuccess2: 'with your E-mail and password',
        '>100': 'More than 100',
        '<50': 'Less than 50',
        '50-100': '50-100',
        moreEvents: 'more events',
        show: 'SHOW: ',
        selectTypes: 'Select types...',
        cultural: 'CULTUREEL',
        sport: 'SPORT',
        env: 'MILIEUVRIENDELIJK',
        uploadEvent: 'Upload new event',
        proff: 'PROFESSIONEEL',
        partCost: 'Participating cost',
        deadline: 'Registration deadline',
        types: 'TYPES',
        alphabet: 'ALPHABET',
        findEvt: 'Find event',
        vacancies: 'Vacancies',
        date: 'Date',
        groupLabel: 'Categorize by: ',
        sortLabel: 'Sort by: ',
        filterLabel: 'Filter by: ',
        datesort: 'DATE',
        organization: 'Organization',
        filterType: 'Type',
        filterAud: 'Target Audience',
        filterNum: 'Number of people',
        addSponsor: '+', //////
        sponsorSearch: 'Type to begin search', //////
        MoreSponsors: 'Add event co-host', //////
        backToCal: 'Back to calendar view'
    },
        
    nl: {
        home: 'Home',
        orgs: 'Studenten organisaties',
        events: 'Evenmenten',
        mContacts: 'Contacten',
        mVacancies: 'Vacatures',
        menuEvents: 'My events',
        menuVacancies: 'My vacancies',
        learnMore: 'Meer informatie',
        datePicker: 'Selecteer een datum',
        forOrgs: 'VOOR STUDENTEN ORGANISATIES',
        forComs: 'VOOR BEDRIJVEN',
        signin: 'Inloggen' ,
        signup: 'Registeren',
        forgotPassword: 'Wachtwoord vergeten?',
        noAccount: 'Heeft uw geen account?',
        createOne: 'Account aanmaken',
        login: 'Inloggen ',
        enterEmail: 'E-mailadres invoeren',
        enterPassword: 'Wachtwoord invoeren',
        enterTitle: 'Uw organisatie invoeren',
        enterComTitle: 'Uw bedrijf invoeren',
        uploadEvent: 'Nieuwe evenement uploaden',
        loginInExist: 'Al geregistereerd?',
        passRecovery: 'Wachtwoord vergeten?',
        sendPasswd: 'Nieuw wachtwoord versturen',
        passRecovered: 'Een nieuwe wachtwoord is naar uw email adres gestuurd',
        mySettings: 'Profiel',
        logout: 'Uitloggen',
        accCreated: 'ACCOUNT AANGEMAAKT',
        regSuccess1: 'U kunt nu',
        regSuccess2: 'met jou E-mailadres en wachtwoord',
        '>100': 'Meer dan 100',
        '<50': 'Minder dan 50',
        '50-100': '50-100',
        moreEvents: 'meer evenmenten',
        show: 'TONEN: ',
        selectTypes: 'Selecteer soorten...',
        cultural: 'CULTUREEL',
        sport: 'SPORT',
        env: 'MILIEUVRIENDELIJK',
        proff: 'PROFESSIONEEL',
        partCost: 'Deelnemende kosted',
        deadline: 'Aanmelding deadline',
        types: 'SOORTED',
        alphabet: 'ALFABET',
        findEvt: 'Vind evenement',
        vacancies: 'Vacatures',
        sortLabel: 'Soorter op: ',
        filterLabel: 'Filter door: ',
        datesort: 'DATUM',
        organization: 'Organization',
        filterType: 'Type',
        filterAud: 'Target Audience',
        filterNum: 'Number of people',
        addSponsor: 'Add event co-host', /////
        sponsorSearch: 'Type to begin search', //////
        backToCal: 'Terug naar Kalender'
    }
};

i18n._personal = {
    en: {
        save: 'Save',
        image: 'IMAGE',
        contactInfo: 'CONTACT INFORMATION',
        information: 'Information',
        settings: 'Settings',
        allEvents: 'Events',
        enterEventName: 'Enter event name',
        uploadImg: 'Upload image',
        imgTypes: 'We support JPG, GIF or PNG files.',
        imgProblemsWarn: 'If you have any problems with your upload, try using a smaller picture.',
        enterEmail: 'Enter E-mail',
        enterPhone: 'Enter telephone',
        enterLocation: 'Enter location',
        moreEventDetail: 'MORE DETAILS',
        chooseEvtType: 'Choose type of event',
        chooseTargetAud: 'Choose target audience',
        chooseTargetNum: 'Choose target number of people',
        comPartCost: 'Participating cost for the company ',
        resumePossibility: 'Possibility to get resume from students',
        about: 'ABOUT',
        enterEvtInfo: 'Enter the information about the event',
        enterOrgInfo: 'Enter the information about your organization',
        chooseOrgDept: 'Choose department',
        chooseOrgType: 'Choose type',
        social: 'SOCIAL',
        oldPassword: 'Nieuw wachtwoord',
        newPassword: 'Nie password',
        repeatPassword: 'Repeat new password',
        newEmail: 'New E-mail',
        changePasswd: 'CHANGE PASSWORD',
        changeEmail: 'CHANGE E-MAIL',
        startTime: 'Start time:',
        sortLabel: 'Sort by:',
        date: 'DATE',
        editEvent: 'Edit',
        eventStat: 'Statistics',
        deleteEvent: 'Delete',
        deleteQuestion: 'Delete event permanently?',
        yes: 'Yes',
        no: 'No',
        vacancies: 'Vacancies',
        numVacancies: 'Vacancies available: ',
        addVacancy: 'Add new vacancy',
        findVacancy: 'FIND VACANCY',
        vacPage: 'Vacancies page url: ',
        vacBack: 'Go back to vacancies list',
        vacName: 'Enter vacancy title',
        vacDescription: 'Enter vacancy description',
        employment: 'EMPLOYMENT',
        contacts: 'CONTACT',
        salary: 'SALARY',
        fullTime: 'Full-time',
        pastTime: 'Part-time',
        from: 'from',
        to: 'to',
        website: 'Website',
        email: 'E-mail',
        enterLink: 'Enter link',
        bannerImgTitle: 'PROMO IMAGE', //!
        bannerImgLabel: 'Image for top banner promo.',
        bannerImgHint: 'Recommended image size: 330x245px.',
        bannerAbout: 'PROMO DESCRIPTION',
        bannerPlaceholder: 'Enter brief description for top banner and facebook promo',
        chooseLang: 'Choose event language'

    },
    nl: {
        save: 'Opslaan',
        image: 'AFBEELDING',
        contactInfo: 'CONTACT INFORMATIE ',
        information: 'Informatie',
        settings: 'Instellingen ',
        allEvents: 'Evenmenten',
        enterEventName: ' Invoeren eventnaam',
        uploadImg: 'Afbeelding uploaden',
        imgTypes: 'Wij ondersteunen JPG, GIF of PNG files',
        imgProblemsWarn: 'Als u problemen heeft met uploaden, kies dan een kleinere afbeelding',
        enterEmail: 'E-mail adres invoeren',
        enterPhone: 'Telefoonummer invoeren',
        enterLocation: 'Locatie invoeren',
        moreEventDetail: 'MEER DETAILS',
        chooseEvtType: 'Kies uw evenement',
        chooseTargetAud: 'Kies uw doelgroep',
        chooseTargetNum: 'Kies het streefgetal ',
        sponsorshipCost: 'Sponsorbedrag',
        partCost: 'Deelnamekosten voor bedrijven',
        comPartCost: 'Deelnamekosten voor bedrijven',
        resumePossibility: 'Mogelijkheid om CV van studenten te ontvangen ',
        about: 'ABOUT',
        enterEvtInfo: ' Informative invoeren over het evenement ',
        enterOrgInfo: 'Enter the information about your organization',
        chooseOrgDept: 'Kies afdeling',
        chooseOrgType: 'Kies type organisatie',
        social: 'SOCIAL',
        oldPassword: 'Huidige wachtwoord',
        newPassword: 'Nieuwe wachtwoord',
        repeatPassword: 'Herhaal nieuw wachtwoord',
        newEmail: 'Nieuw e-mailadres',
        changePasswd: 'Wachtwoord wijzigen',
        changeEmail: 'Verandeer E-MAILADRES',
        startTime: 'Begin Tijd:',
        sortLabel: 'Soorteer door:',
        date: 'DATUM',
        editEvent: 'Verander',
        eventStat: 'Statistics',
        deleteEvent: 'Verwijderen',
        deleteQuestion: 'Delete event Evenement permanent verwijderen?',
        yes: 'Ja',
        no: 'Nee',
        vacancies: 'Vacatures',
        numVacancies: 'Vacatures: ',
        addVacancy: 'Voeg een nieuwe vacatures',
        findVacancy: 'VACATURES OPZOEKEN',
        vacPage: 'Website voor vacatures: ',
        vacBack: 'Terug naar overzicht voor alle vacatures',
        vacName: 'Voer vacatures titel',
        vacDescription: 'Voer beschrijving over vacatures',
        employment: 'DIENST',
        contacts: 'CONTACTEN',
        salary: 'SALARIS',
        fullTime: 'Voltijd',
        pastTime: 'Deeltijd',
        from: 'Van',
        to: 'Naar',
        website: 'Website',
        email: 'E-mail',
        enterLink: 'Link Invoeren',
        bannerImgTitle: 'BEELD VAN PROMO',
        bannerImgLabel: 'Beeld voor promotie on de top banier .',
        bannerImgHint: 'Aanbevolen beeldgrotte: 330x245px.',
        bannerAbout: 'PROMOTIE BESCHRIJVING ',
        bannerPlaceholder: 'Voor in een korte beschrijving voor de top banier en voor de facebook post',
        chooseLang: 'Choose event language'
    }
};

i18n._contacts = {
    en: {
        contacts: 'Contact',
        enterName: 'Enter your name',
        enterEmail: 'Enter your E-mail',
        enterMessage: 'Enter your message',
        sendMessage: 'Send message',
        messageSuccess: 'Thank you for your feedback! We will reply you as soon as we can.',
        postalAddress: 'Postal address'
    },
    nl: {
        contacts: 'Contacten',
        enterName: 'Vul uw naam in',
        enterEmail: 'Vul in uw email adres',
        enterMessage: 'Vul uw bericht in',
        sendMessage: 'Stuur uw bericht',
        messageSuccess: 'Dank uw wel voor uw feedback! We zullen aantwoorden zo spoedig mogelijk.',
        postalAddress: 'Postcode'
    }
};i18n._vacancy = {
    en: {
        employment: 'Employment',
        salary: 'Salary',
        fullTime: 'Full-time',
        pastTime: 'Part-time',
        from: 'From',
        website: 'Website'
    },
    nl:

    {
        employment: 'Werk',
        salary: 'Salaris',
        fullTime: 'Voltijd',
        pastTime: 'Deeltijd',
        from: 'Van',
        website: 'Website'
    }
};

i18n._event = {
    en: {
        similarEvents: 'SIMILAR EVENTS',
        contact: 'Contact',
        audience: 'Audience',
        participants: 'Participants',
        partCost: 'Participating cost',
        lang: 'Language',
        en: 'English',
        nl: 'Dutch'
    },
    nl: {
        similarEvents: 'VERGELIJKBARE EVENEMENTED',
        contact: 'Contact',
        audience: 'Doelgroep',
        participants: 'Deelneemers',
        partCost: 'Kosten voor deelname',
        lang: 'Language',
        en: 'English',
        nl: 'Dutch'
    }
};

i18n._vacancy = {
    en: {
        employment: 'Employment',
        salary: 'Salary',
        fullTime: 'Full-time',
        pastTime: 'Part-time',
        from: 'From',
        website: 'Website'
    },
    nl:

    {
        employment: 'Werk',
        salary: 'Salaris',
        fullTime: 'Voltijd',
        pastTime: 'Deeltijd',
        from: 'Van',
        website: 'Website'
    }
};
i18n._eventSearch = {
    en: {
        groupLabel: 'Categorize by: ',
        sortLabel: 'Sort by: ',
        filterLabel: 'Filter by: ',
        datesort: 'DATE',
        organization: 'Organization',
        events: 'Events',
        orgs: 'Organizations',
        vacs: 'Vacancies',
        more: 'Show more',
        noResults: 'No results found!',
        fullTime: 'Full-time',
        pastTime: 'Part-time'
    },
    nl: {
        groupLabel: 'Gecategoriseerd Op: ',
        sortLabel: 'Soorter op: ',
        filterLabel: 'Filter door: ',
        datesort: 'DATUUM',
        organization: 'Organisatie',
        events: 'Evenmenten',
        orgs: 'Organisaties',
        vacs: 'Vacatures',
        more: 'Toon meer',
        noResults: 'No results found!',
        fullTime: 'Full-time',
        pastTime: 'Part-time'
    }
};

i18n._orgsList = {
    en: {
        groupLabel: 'Categorize by: ',
        datesort: 'DATE',
        organization: 'Organization',
        employment: 'Employment',
        studentOrgs: 'STUDENT ORGANIZATIONS',
        departments: 'DEPARTMENTS',
        vacancies: 'VACANCIES',
        fullTime: 'Full-time',
        pastTime: 'Part-time',
        findOrg: 'FIND ORGANIZATION',
        findVacancy: 'FIND VACANCY'

    },
    nl: {
        groupLabel: 'Gecategoriseerd Op: ',
        datesort: 'DATE',
        organization: 'Organization',
        employment: 'Employment',
        studentOrgs: 'STUDENTENVERENIGINGEN',
        departments: 'Faculteiten',
        vacancies: 'VACATURES',
        fullTime: 'Full-time',
        pastTime: 'Part-time',
        findOrg: 'ORGANISATIES VINDEN',
        findVacancy: 'FIND VACANCY'
    }
};

i18n._org = {
    en: {
        contact: 'Contact:',
        dep: 'Department',
        type: 'Type',
        email: 'e-mail:',
        tel: 'Tel.:',
        loc: 'Location:',
        events: 'EVENTS'
    },
    nl: {
        contact: 'Contact:',
        dep: 'Faculteit',
        type: 'Type',
        email: 'e-mail:',
        tel: 'Tel.:',
        loc: 'Locatie:',
        events: 'EVENEMENTED'
    }
};

i18n._email = {
    en: {
        confirmationSubject: 'Welcome to UniOrg project!'
    },
    nl: {
        confirmationSubject: 'Welcome to UniOrg project!'
    }
};

for (var method in i18n) {
    if (!method.match(/^_(.*)/)) {
        exports[method] = i18n[method];
    }
}
