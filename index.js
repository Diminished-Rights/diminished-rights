// import express from "express";
import { EventEmitterAsyncResource } from "events";
import express from "express";

const app = express();
const port = 1500;
const portForward = true;

let paswrdPgLoadCount = 1;
let DatabaseLoadCount = 1;










// add rendering code

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        userNum: paswrdPgLoadCount,
        testing: true,
    });

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
        }

    console.log(`Password page loaded. (${paswrdPgLoadCount})`);
    console.log(`${date}-${month}-${year} ${hours}:${minutes}:${seconds} ${time}`);
    console.log(``);
    paswrdPgLoadCount++;
});

app.get("/index.ejs", (req, res) => {
    res.redirect("/");
})

app.get("/database.ejs", (req, res) => {
    res.redirect("/database");
});

app.get("/database", (req, res) => {
    res.render("database.ejs", {

        // number of each type of member
        chairman_num: 1,
        high_council_num: 2,
        honoured_member_num: 1,
        member_num: 2,
        caution_num: 1,
        neutral_num: 1,
        protester_num: 1,
        enemy_num: 1,
        betrayer_num: 1,
        target_num: 1,
        high_threat_num: 1,


        //member info
        chairman: {
            name: "Ayden Lim",
            age: 14,
        },

        high_council1: {
            name: "Luca Korolev",
            age: 14,
        },

        high_council2: {
            name: "Kaidi Hsu",
            age: null,
        },

        honoured_member1: {
            name: null,
            age: null,
        },

        member1: {
            name: "Orion Huang",
            age: null,
        },

        member2: {
            name: null,
            age: null,
        },

        caution1: {
            name: null,
            age: null,
        },

        neutral1: {
            name: null,
            age: null,
        },

        protester1: {
            name: null,
            age: null,
        },

        enemy1: {
            name: null,
            age: null,
        },

        betrayer1: {
            name: null,
            age: null,
        },

        targer1: {
            name: null,
            age: null,
        },

        high_threat1: {
            name: null,
            age: null,
        },
    });

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
        }

    console.log(`ALERT: Database page loaded. (${DatabaseLoadCount})`);
    console.log(`${date}-${month}-${year} ${hours}:${minutes}:${seconds} ${time}`);
    console.log(``);
    DatabaseLoadCount++;
});

// listen to port
app.listen(port, () => {

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
    }

    
    // log server start
    console.log(`Server running on port ${port}.`);
    console.log(``);

    // log date and time
    console.log(`Date of start: ${date}-${month}-${year}`);
    console.log(`Time of start: ${hours}:${minutes}:${seconds} ${time}`);
    console.log(``);

    // log website info
    console.log(`Go to http://localhost:${port} to view the website.`);
    if (portForward) {
        console.log(`Go to https://p9npwlmh-${port}.aue.devtunnels.ms/ to view the website.`);
    };
    console.log(``);

    // log server commands
    console.log(`Type "rs" to restart the server.`);
    console.log(`Press CTRL + C to kill the server.`);
    console.log(``);

    // log info usage log details
    console.log(`The page loadings will be logged underneath.`)
    console.log(``);
    console.log(``);
})