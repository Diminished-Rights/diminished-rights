console.time("Loading time");

import { app, port, portForward, paswrdPgLoadCount, getDateAndTime, express } from './appConfig.js';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

let PPLC = paswrdPgLoadCount;
let DatabaseLoadCount = 1;
let LoginLoadCount = 1;
let testingBoolean = false;
let login = false;

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
    new user("Connor Borrell", "password"),
    new user("Matthew Colvin", "AydenOurGreatLeader"),
];

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        userNum: PPLC,
        testing: testingBoolean,
        terminalDate: getDateAndTime(),
    });

    console.log(`Home page loaded. (${PPLC})`);
    console.log(chalk.italic(getDateAndTime()));
    console.log(``);
    PPLC++;
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
});

import './loginLogoutManager.js';
import './databaseManager.js';

export { app, users, getDateAndTime, login, LoginLoadCount, DatabaseLoadCount };