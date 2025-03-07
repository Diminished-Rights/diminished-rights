// import express from "express";
import { EventEmitterAsyncResource } from "events";
import express from "express";

const app = express();
const port = 1500;
const portForward = true;

app.use(express.urlencoded({ extended: true })); // Add this line to parse URL-encoded bodies

let paswrdPgLoadCount = 1;
let DatabaseLoadCount = 1;
let LoginLoadCount = 1;
let testingBoolean = false;




// add rendering code

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        userNum: paswrdPgLoadCount,
        testing: testingBoolean,
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

    console.log(`Signed out page loaded. (${paswrdPgLoadCount})`);
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
        chairman_: true,
        high_council_: true,
        honoured_member_: false,
        member_: true,
        caution_: true,
        neutral_: false,
        protester_: false,
        enemy_: true,
        betrayer_: false,
        target_: false,
        high_threat_: true,

        // member hierarchy
        chairman: ["Ayden Lim"],
        high_council: ["Luca Korolev", "Kaidi Hsu"],
        honoured_members: ["None yet"],
        members: ["Orion Huang", "Angus McDonnell", "Myeongjo Seo", "Vishesh Kudva"],
        caution: ["Marcus", "Aaron Liu"],
        neutral: ["None yet"],
        protesters: ["Roland Liu"],
        enemies: ["Mr Bevan Galbraith", "Aaron Liu", "Mr Timothy Dent"],
        betrayers: ["None yet"],
        targets: ["Alex Kim"],
        high_threat: ["Connor McCracken"],

        // member roles
        junior_branch_leader: ["None yet"],
        head_of_act: ["Ayden Lim"],
        head_of_intelligence: ["None yet"],
        head_of_defence: ["Luca Korolev"],
        head_of_secretery: ["None yet"],
        award_manager: ["None yet"],
        web_developer: ["Vishesh Kudva"],
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

app.get("/login.ejs", (req, res) => {
    res.render("login.ejs");
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

    console.log(`Login page loaded. (${LoginLoadCount})`);
    console.log(`${date}-${month}-${year} ${hours}:${minutes}:${seconds} ${time}`);
    console.log(``);
    LoginLoadCount++;
});

app.post("/login", (req, res) => {
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

    if ((req.body.username === "Vishesh Kudva" && req.body.password === "Prev Loves Me 2") || (req.body.username === "Mao Is Great" && req.body.password === "All Hail Mao")) {
        res.redirect("/database");
        console.log(`Successful login with username: "${req.body.username}" and password: "${req.body.password}"`);
        console.log(`${date}-${month}-${year} ${hours}:${minutes}:${seconds} ${time}`);
        console.log(``);
    } else {
        res.redirect("/login.ejs");
        console.log(`URGENT: attempted login with username: "${req.body.username}" and password: "${req.body.password}"`);
        console.log(`${date}-${month}-${year} ${hours}:${minutes}:${seconds} ${time}`);
        console.log(``);

    }
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