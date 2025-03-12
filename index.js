console.time("Loading time");

// import express from "express";
import express from "express";
import chalk from 'chalk';
import cookieParser from 'cookie-parser';
import { error } from "console";
import './loginLogoutManager.js';
import './databaseManager.js';

// setup other variables and what not
const app = express();
const port = 1500;
const portForward = true;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

let paswrdPgLoadCount = 1;
let DatabaseLoadCount = 1;
let LoginLoadCount = 1;
let testingBoolean = false;
let login = false;

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

class user {
    constructor(name, pass) {
        this.user = name;
        this.pass = pass;
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