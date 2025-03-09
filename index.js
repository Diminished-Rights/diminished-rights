// import express from "express";
import { EventEmitterAsyncResource } from "events";
import express from "express";
import chalk from 'chalk';

// setup other variables and what not
const app = express();
const port = 1500;
const portForward = true;

app.use(express.urlencoded({ extended: true })); // Add this line to parse URL-encoded bodies

let paswrdPgLoadCount = 1;
let DatabaseLoadCount = 1;
let LoginLoadCount = 1;
let testingBoolean = false;

const usernames = ["admin", "Mao Is Great", "Ayden Lim", "Luca Korolev"];
const passwords = ["Prev Loves Me 2", "All Hail Mao", "Mao is Great", "MyPasswordIsNotWeakB3causeItIsSoLong!"];

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

const dateAndTime = `${date}-${month}-${year} ${hours}:${minutes}:${seconds} ${time}`;




// add rendering code

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        userNum: paswrdPgLoadCount,
        testing: testingBoolean,
        terminalDate: dateAndTime,
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

    console.log(`Home page loaded. (${paswrdPgLoadCount})`);
    console.log(chalk.italic(`${date}-${month}-${year} ${hours}:${minutes}:${seconds} ${time}`));
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
        honoured_members: [],
        members: ["Orion Huang", "Angus McDonnell", "Myeongjo Seo", "Vishesh Kudva"],
        caution: ["Marcus", "Aaron Liu"],
        neutral: [],
        protesters: ["Roland Liu"],
        enemies: ["Mr Bevan Galbraith", "Aaron Liu", "Mr Timothy Dent"],
        betrayers: [],
        targets: ["Alex Kim"],
        high_threat: ["Connor McCracken"],

        // member roles
        junior_branch_leader: [],
        head_of_act: ["Ayden Lim"],
        head_of_intelligence: [],
        head_of_defence: ["Luca Korolev"],
        head_of_secretery: [],
        award_manager: [],
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

    console.log(` Database page loaded. (${DatabaseLoadCount})`);
    console.log(chalk.italic(`${date}-${month}-${year} ${hours}:${minutes}:${seconds} ${time}`));
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
    console.log(chalk.italic(`${date}-${month}-${year} ${hours}:${minutes}:${seconds} ${time}`));
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

// 'for' loop to check if username and password match ones in database
for (let i = 0; i < usernames.length; i++) {
    console.log(`Checking username and password...` + chalk.dim(`(${i + 1}/${usernames.length})`));
    if (req.body.username == usernames[i] && req.body.password == passwords[i]) {
        res.redirect("database.ejs")
        console.log(`User ` + chalk.green(req.body.username) + ` logged in successfully.`);
        console.log(chalk.italic(`${date}-${month}-${year} ${hours}:${minutes}:${seconds} ${time}`));
        console.log(``);
        return;
    }
}

// check for easter egg
if (req.body.username == "rickroll me" && req.body.password == "please") {
    res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    console.log(`User  rickrolled successfully.`);
    console.log(chalk.italic(`${date}-${month}-${year} ${hours}:${minutes}:${seconds} ${time}`));
    console.log(``);
} else {
    // if username and password do not match, redirect to login page
    res.redirect("login.ejs");
    console.log(chalk.bgRed.yellowBright(`ALERT:`) + chalk.yellowBright(` Username ` + chalk.red(req.body.username) + ` and password ` + chalk.red(req.body.password) + ` not found in database.`));
    console.log(chalk.italic(`${date}-${month}-${year} ${hours}:${minutes}:${seconds} ${time}`));
    console.log(``);
}

});

// listen to port
app.listen(port, () => {

    // show date and time of program start
    console.log(`Program started running at`);
    console.log(dateAndTime);
    console.log(``);

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
    console.log(`Server running on port ` + chalk.green(port) + `.`);
    console.log(``);

    // log date and time
    console.log(`Date of start: ${date}-${month}-${year}`);
    console.log(`Time of start: ${hours}:${minutes}:${seconds} ${time}`);
    console.log(``);

    // log website info
    console.log(`Go to ` + chalk.dim(`http://localhost:${port}`) + ` to view the website.`);
    if (portForward) {
        console.log(`Go to ` + chalk.dim(`https://p9npwlmh-${port}.aue.devtunnels.ms/`) +` to view the website.`);
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
