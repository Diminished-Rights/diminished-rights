console.time("Loading time");

// import express from "express";
import { EventEmitterAsyncResource } from "events";
import express from "express";
import chalk from 'chalk';
import { error } from "console";

// setup other variables and what not
const app = express();
const port = 1500;
const portForward = true;

app.use(express.urlencoded({ extended: true })); // Add this line to parse URL-encoded bodies

let paswrdPgLoadCount = 1;
let DatabaseLoadCount = 1;
let LoginLoadCount = 1;
let testingBoolean = false;

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
    }

    const dateAndTime = `${date}-${month}-${year} ${hours}:${minutes}:${seconds} ${time}`;

    return dateAndTime;
}

function multipleUserHandling() {
    //add multiple user handling here
    return 0;
}

class user {
    constructor(name, pass) {
        if (!(new Set(users)).has(name)) {
            if (multipleUserHandling(name) == 0) { throw new error(`${name} is already an existing user.`) }
        }
        else {
            this.user = name;
            this.pass = pass;
        }
    }
}

const users = [
    new user("admin", "Prev Loves Me 2"),
    new user("Ayden Lim", "Mao is Great"),
    new user("Luca Korolev", "MyPasswordIsNotWeakB3causeItIsSoLong!"),
    new user("Kaidi Hsu", "KaidiIsTheBest"),
    new user("Angus McDonnell", "WhyNotHaveThisPassword"),
    new user("Arthur Tan", "AllHailTheMightyArthur"),
    new user("Caleb Brown", "HerebyIDeclareMaoAsGreat"),
    new user("Connor Borrell", "AllHailGithubCauseWhyNot"),
    new user("Matthew Colvin", "AydenOurGreatLeader"),
    
];

 
// add rendering code

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        userNum: paswrdPgLoadCount,
        testing: testingBoolean,
        terminalDate: getDateAndTime(),
    });

    console.log(`Home page loaded. (${paswrdPgLoadCount})`);
    console.log(chalk.italic(getDateAndTime()));
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
    console.time("Loading time");
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
        protesters: ["Roland Liu", "Leni Reid"],
        enemies: ["Mr Bevan Galbraith", "Aaron Liu", "Mr Timothy Dent"],
        betrayers: ["Alan Lee"],
        targets: ["Alex Kim", "Jackson Bo"],
        high_threat: ["Connor McCracken"],

        // member roles
        junior_branch_leader: [],
        head_of_act: ["Luca Korolev"],
        head_of_intelligence: [],
        head_of_defence: ["Ayden Lim"],
        head_of_secretery: ["Kaidi Hsu"],
        award_manager: [],
        web_developer: ["Vishesh Kudva", "Luca Korolev"],
    });

    console.timeEnd("Loading time");
    log(`Database page loaded. (${DatabaseLoadCount})`);
    DatabaseLoadCount++;
});

app.get("/login.ejs", (req, res) => {
    res.render("login.ejs");
    log(`Login page loaded. (${LoginLoadCount})`);
    LoginLoadCount++;
});

app.post("/login", (req, res) => {
    console.time("Loading time");
    if (req.body.username == "Mao is Great" && req.body.password == "All Hail Mao") {
        // check for generic login
        res.redirect("database.ejs")
        console.log(`Generic login detected!`);
        console.log(chalk.yellowBright(`User logged in successfully using generic login.`));
        console.log(chalk.italic(getDateAndTime()));
        console.timeEnd("Loading time");
        console.log(``);
        return;
    } else if (req.body.username == "rickroll me" && req.body.password == "please") {
        // check for easter egg
        res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        console.log(`User  rickrolled successfully.`);
        console.log(chalk.italic(getDateAndTime()));
        console.timeEnd("Loading time");
        console.log(``);
        return;
    }
    users.forEach((_user, index) => {
        console.log(`Checking username and password... ` + chalk.dim(`(${index}/${_user.user}/)`));
        if (req.body.username == _user.user && req.body.password == _user.pass) {
            res.redirect("database.ejs")
            
            console.timeEnd("Loading time");
            console.log(getDateAndTime());
            console.log(`User: ${chalk.green(_user.user)} successfully logged in!`);
            console.log(``);
            return;
        }
    });
});

// listen to port
app.listen(port, () => {
    // log server start
    console.log(`Server running on port ` + chalk.green(port) + `.`);
    console.log(``);

    // log date and time
    console.log(`Time of start: ${getDateAndTime()}`);
    console.log(``);

    // log website info
    console.log(`Go to ` + chalk.dim(`http://localhost:${port}`) + ` to view the website.`);
    if (portForward) {
        console.log(`Go to ${chalk.dim(`https://p9npwlmh-${port}.aue.devtunnels.ms/`)} to view the website.`);
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