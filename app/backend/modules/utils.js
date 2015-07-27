var utils = {};
var fs = require('fs');
var lwip = require('lwip');

utils.sha1hash = function (msg) {
    {

        //
// function 'f' [§4.1.1]
//
        function f(s, x, y, z)
        {
            switch (s) {
                case 0: return (x & y) ^ (~x & z);           // Ch()
                case 1: return x ^ y ^ z;                    // Parity()
                case 2: return (x & y) ^ (x & z) ^ (y & z);  // Maj()
                case 3: return x ^ y ^ z;                    // Parity()
            }
        }

//
// rotate left (circular left shift) value x
// by n positions [§3.2.5]
//
        function ROTL(x, n)
        {
            return (x<<n) | (x>>>(32-n));
        }

//
// extend Number class with a tailored hex-string method
//   (note toString(16) is implementation-dependant, and
//   in IE returns signed numbers when used on full words)
//
        Number.prototype.toHexStr = function()
        {
            var s="", v;
            for (var i=7; i>=0; i--) {
                v = (this>>>(i*4)) & 0xf; s += v.toString(16); }
            return s;
        };




        // constants [§4.2.1]
        var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];


        // PREPROCESSING

        // add trailing '1' bit to string [§5.1.1]
        msg += String.fromCharCode(0x80);

        // convert string msg into 512-bit/16-integer
        // blocks arrays of ints [§5.2.1]

        // long enough to contain msg plus 2-word length
        var l = Math.ceil(msg.length/4) + 2;
        // in N 16-int blocks
        var N = Math.ceil(l/16);
        var M = new Array(N);
        for (var i=0; i<N; i++) {
            M[i] = new Array(16);
            // encode 4 chars per integer, big-endian encoding
            for (var j=0; j<16; j++) {
                M[i][j] = (msg.charCodeAt(i*64+j*4)<<24) |
                (msg.charCodeAt(i*64+j*4+1)<<16) |
                (msg.charCodeAt(i*64+j*4+2)<<8) |
                (msg.charCodeAt(i*64+j*4+3));
            }
        }
        // add length (in bits) into final pair of 32-bit integers
        // (big-endian) [5.1.1]
        // note: most significant word would be
        // ((len-1)*8 >>> 32, but since JS converts
        // bitwise-op args to 32 bits, we need to simulate
        // this by arithmetic operators
        M[N-1][14] = ((msg.length-1)*8) / Math.pow(2, 32);
        M[N-1][14] = Math.floor(M[N-1][14]);
        M[N-1][15] = ((msg.length-1)*8) & 0xffffffff;

        // set initial hash value [§5.3.1]
        var H0 = 0x67452301;
        var H1 = 0xefcdab89;
        var H2 = 0x98badcfe;
        var H3 = 0x10325476;
        var H4 = 0xc3d2e1f0;

        // HASH COMPUTATION [§6.1.2]

        var W = new Array(80); var a, b, c, d, e;
        for (var i=0; i<N; i++) {

            // 1 - prepare message schedule 'W'
            for (var t=0;  t<16; t++)
                W[t] = M[i][t];
            for (var t=16; t<80; t++)
                W[t] = ROTL(W[t-3] ^ W[t-8] ^ W[t-14] ^ W[t-16], 1);

            // 2 - initialise five working variables
            // a, b, c, d, e with previous hash value
            a = H0; b = H1; c = H2; d = H3; e = H4;

            // 3 - main loop
            for (var t=0; t<80; t++) {
                // seq for blocks of 'f' functions and 'K' constants
                var s = Math.floor(t/20);
                var T = (ROTL(a,5) + f(s,b,c,d) + e + K[s] + W[t])
                    & 0xffffffff;
                e = d;
                d = c;
                c = ROTL(b, 30);
                b = a;
                a = T;
            }

            // 4 - compute the new intermediate hash value

            // note 'addition modulo 2^32'
            H0 = (H0+a) & 0xffffffff;
            H1 = (H1+b) & 0xffffffff;
            H2 = (H2+c) & 0xffffffff;
            H3 = (H3+d) & 0xffffffff;
            H4 = (H4+e) & 0xffffffff;
        }

        return H0.toHexStr() + H1.toHexStr() + H2.toHexStr() +
            H3.toHexStr() + H4.toHexStr();
    }


};

utils.processUploadedImage = function(req, res) {
    var ext = req.file.extension.replace('jpeg', 'jpg');
    lwip.open(req.file.path, ext,  function(err, image) {
        if (err) {
            res.status(500).end();
        }
        if(image.height() > image.width()) {
            image.batch()
                .crop(image.width(), image.width())
                .resize(250, 250)
                .writeFile(req.file.path, ext, function (err) {
                    if (err) {
                        res.status(500).end();
                    }
                    res.send({'status': 'success', 'path': '/' + req.file.path});
                });
        } else {
            image.batch()
                .crop(image.height(), image.height())
                .resize(200, 200)
                .writeFile(req.file.path, ext, function (err) {
                    if (err) {
                        res.status(500).end();
                    }
                    res.send({'status': 'success', 'path': '/' + req.file.path});
                });
        }
    });
};

utils.processBannerImage = function(req, res) {
    var ext = req.file.extension.replace('jpeg', 'jpg');
    
    lwip.open(req.file.path, ext,  function(err, image) {
        if (err) {
            res.status(500).end();
        }
        
        
        var newWidth = (image.width() > 330)?330:image.width();
        var newHeight = newWidth / 1.346;
        image.batch()
            .crop(newWidth, newHeight)
            .resize(330, 245)
            .writeFile(req.file.path, ext, function (err) {
                if (err) {
                    res.status(500).end();
                }
                res.send({'status': 'success', 'path': '/' + req.file.path});
            });
    });
};

utils.getDataStructure = function (pageData) {
    pageData.page.structure = {};


    pageData.page.structure.orgDepartments = [
        {name: 'Erasmus School of Economics', title: 'Erasmus School of Economics'},
        {name: 'Rotterdam School of Management', title: 'Rotterdam School of Management'},
        {name: 'Erasmus Medical Center', title: 'Erasmus Medical Center'},
        {name: 'Faculty of Social Sciences', title: 'Faculty of Social Sciences'},
        {name: 'Erasmus School of Law', title: 'Erasmus School of Law'},
        {name: 'Faculty of Philosophy', title: 'Faculty of Philosophy'},
        {name: 'Erasmus School of History, Culture and Communication', title: 'Erasmus School of History, Culture and Communication'}
    ];

    pageData.page.structure.orgTypes = [
        {name: 'Finance', title: 'Finance'},
        {name: 'Marketing', title: 'Marketing'},
        {name: 'Consultancy', title: 'Consultancy'},
        {name: 'Entrepreneurship', title: 'Entrepreneurship'},
        {name: 'International', title: 'International'},
        {name: 'Culture', title: 'Culture'},
        {name: 'Fun', title: 'Fun'},
        {name: 'Sport', title: 'Sport'},
        {name: 'University related', title: 'University related'}
    ];

    pageData.page.structure.employmentTypes = [
        {name: 'Any', title: 'Any'},
        {name: 'fullTime', title: 'Full-time'},
        {name: 'pastTime', title: 'Part-time'}
    ];
    pageData.page.structure.evtLangs = [
        {name: 'nl', title: 'Dutch'},
        {name: 'en', title: 'English'},
        {name: 'other', title: 'Other'}
    ];

    pageData.page.structure.evtTypes = [
        {name: 'Study', title: 'Study'},
        {name: 'Sport', title: 'Sport'},
        {name: 'Student/Fraternity', title: 'Student/Fraternity'},
        {name: 'Erasmus University', title: 'Erasmus University'},
        {name: 'International', title: 'International'},
        {name: 'Cultural', title: 'Cultural'},
        {name: 'Social/leisure', title: 'Social/leisure'}
    ];
    pageData.page.structure.evtTypesFilter = [
        {name: 'Study', title: 'Study'},
        {name: 'Sport', title: 'Sport'},
        {name: 'Student/Fraternity', title: 'Student/Fraternity'},
        {name: 'Erasmus University', title: 'Erasmus University'},
        {name: 'International', title: 'International'},
        {name: 'Cultural', title: 'Cultural'},
        {name: 'Social/leisure', title: 'Social/leisure'}
    ];
    pageData.page.structure.evtTargetAud = [
        {name: 'aud_Everyone', title: 'Everyone'},
        {name: 'aud_Bachelor 1', title: 'Bachelor 1'},
        {name: 'aud_Bachelor 2', title: 'Bachelor 2'},
        {name: 'aud_Bachelor 3', title: 'Bachelor 3'},
        {name: 'aud_Pre-masters', title: 'Pre-master'},
        {name: 'aud_Masters', title: 'Master'},
        {name: 'aud_PhD', title: 'PhD'}
    ];
    pageData.page.structure.evtTargetAudFilter = [
        {name: 'Any', title: 'Any'},
        {name: 'aud_Everyone', title: 'Everyone'},
        {name: 'aud_Bachelor 1', title: 'Bachelor 1'},
        {name: 'aud_Bachelor 2', title: 'Bachelor 2'},
        {name: 'aud_Bachelor 3', title: 'Bachelor 3'},
        {name: 'aud_Pre-masters', title: 'Pre-master'},
        {name: 'aud_Masters', title: 'Master'},
        {name: 'aud_PhD', title: 'PhD'}
    ];
    pageData.page.structure.evtTargetNum = [
        {name: '<50', title: 'Less than 50'},
        {name: '50-100', title: '50-100'},
        {name: '>100', title: 'More than 100'}
    ];
    pageData.page.structure.evtTargetNumFilter = [
        {name: '', title: 'Any'},
        {name: '<50', title: 'Less than 50'},
        {name: '50-100', title: '50-100'},
        {name: '>100', title: 'More than 100'}
    ];
    
    return pageData;
};


for (var method in utils) {
    if (!method.match(/^_(.*)/)) {
        exports[method] = utils[method];
    }
}
