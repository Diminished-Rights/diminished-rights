// Import express and cookie-parser 
import express from "express";
import cookieParser from 'cookie-parser';

// Setup constants
const app = express();
const port =process.env.PORT || 1500;
const portForward = false;

// Quick use of express functions
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Set up variables
let paswrdPgLoadCount = 1;
let DatabaseLoadCount = 1;
let LoginLoadCount = 1;
let testingBoolean = false;
let login = false;
let prankUserName = `Jackson Bo`;

// Define the function "getDateAndTime()"
function getDateAndTime() {
    // get current date
    let date_time = new Date();

    // adjust 0 before single digit date
    let date = ("0" + date_time.getDate()).slice(-2);

    // get current month
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

    // get current year
    let year = date_time.getFullYear();

    // get current hours
    let hoursRaw = date_time.getHours();
    if (hoursRaw > 12) {
        var hours24 = hoursRaw - 12;
    } else {
        var hours24 = hoursRaw;
    };
    
    if (hours24 < 10) {
        var hours = "0" + hours24;
    } else {
        var hours = hours24;
    };

    // get current minutes
    let minutesRaw = date_time.getMinutes();
    if (minutesRaw < 10) {
        var minutes = "0" + minutesRaw;
    } else {
        var minutes = minutesRaw;
    };

    // get current seconds
    let secondsRaw = date_time.getSeconds();
    if (secondsRaw < 10) {
        var seconds = "0" + secondsRaw;
    } else {
        var seconds = secondsRaw;
    };

    // get AM or PM
    if (hoursRaw > 12) {
        var time = "PM";
    } else if (hoursRaw == 12) {
        var time = "PM";
    } else {
        var time = "AM";
    };

    const dateAndTime = `${date}-${month}-${year} ${hours}:${minutes}:${seconds} ${time}`;

    return dateAndTime;
};

// Setup users
class user {
    constructor(name, pass) {
        this.user = name;
        this.pass = pass;
    };
};

// Add users
const users = [
    new user("d033e22ae348aeb5660fc2140aec35850c4da997", "6ebfe5e505b06fbd6bef17c2d5ed959c3b1f2346"),
    new user("6c2caa0f1ceecdfe6e9ee3b84956479a6ab5b03e", "74af6dc19911fc71bcb2a647898efdc4509e7ab9"),
    new user("114443ec5ec52ae27ba5d46bbc77cb9716ce065b", "984c72ab13811c951f25b54954b73d62299113e0"),
    new user("36dac6773b8e68cd58fd259d8c0d1aa991a06d67", "a61b5987f2c6383d17681ff3a0f10cfb686e919a"),
    new user("6436a608b8b4f94d33466b9d5fa50e4ec915f5a0", "63722771253010888b3259dae57519750a483925"),
    new user("8d3d6178c886e554ba284a58ff92d76a2fdc54bf", "2ba62822328d39d0bc9aa7f03e5afc36aa6d20a3"),
    new user("a9ec5fa16a6e3592d31970976807f4e1713a9ae3", "dececb8c5dde321d746ff6800c49d72f24ebb783"),
    new user("0207591131f036a8cb519e852e779cfa5028c444", "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8"),
    new user("267a9a7c7e94dec97d8368bfa8c6fb9db7afa6e2", "ef8aa28752f09023f55508901ae9b6a77a6b2f6a"),
];

/**
*  Secure Hash Algorithm (SHA1)
*  http://www.webtoolkit.info/
**/
 
function SHA1 (msg) {
    function rotate_left(n,s) {
        var t4 = ( n<<s ) | (n>>>(32-s));
        return t4;
    };

    function lsb_hex(val) {
        var str="";
        var i;
        var vh;
        var vl;

        for( i=0; i<=6; i+=2 ) {
            vh = (val>>>(i*4+4))&0x0f;
            vl = (val>>>(i*4))&0x0f;
            str += vh.toString(16) + vl.toString(16);
        }
        return str;
    };

     function cvt_hex(val) {
        var str="";
        var i;
        var v;

        for( i=7; i>=0; i-- ) {
            v = (val>>>(i*4))&0x0f;
            str += v.toString(16);
        }
        return str;
    };

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }

            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }

            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };

    var blockstart;
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var A, B, C, D, E;
    var temp;
    msg = Utf8Encode(msg);
    var msg_len = msg.length;
    var word_array = new Array();

    for( i=0; i<msg_len-3; i+=4 ) {
        j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
        msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
        word_array.push( j );
    }

    switch( msg_len % 4 ) {
        case 0:
            i = 0x080000000;
        break;

        case 1:
            i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
        break;
        case 2:
            i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
        break;
        case 3:
            i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8    | 0x80;
        break;
    }

    word_array.push( i );

    while( (word_array.length % 16) != 14 ) word_array.push( 0 );

    word_array.push( msg_len>>>29 );
    word_array.push( (msg_len<<3)&0x0ffffffff );

    for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {

        for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];

        for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;

        for( i= 0; i<=19; i++ ) {
            temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }

        for( i=20; i<=39; i++ ) {
            temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }
        for( i=40; i<=59; i++ ) {
            temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }
        for( i=60; i<=79; i++ ) {
            temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }
        H0 = (H0 + A) & 0x0ffffffff;
        H1 = (H1 + B) & 0x0ffffffff;
        H2 = (H2 + C) & 0x0ffffffff;
        H3 = (H3 + D) & 0x0ffffffff;
        H4 = (H4 + E) & 0x0ffffffff;
    }
    var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
    return temp.toLowerCase();
}

// Export neccecary data
export { app, port, portForward, paswrdPgLoadCount, DatabaseLoadCount, LoginLoadCount, testingBoolean, login, getDateAndTime, users, express, prankUserName, SHA1 };
