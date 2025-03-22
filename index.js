// Starts a timer to see how long the initialisation takes
console.time("Loading time");

// Imports all the neccecary data
import { app, port, portForward, paswrdPgLoadCount, getDateAndTime, express } from './appConfig.js';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';

// Quickly sets up cookies and static files
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Sets up miscellaneous variables
let PPLC = paswrdPgLoadCount;
let DatabaseLoadCount = 1;
let LoginLoadCount = 1;
let testingBoolean = false;
let login = false;

// Renders the home page at "/"
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

// Redirect to "/"
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

console.time("Ping Interval");

setInterval(() => {
    fetch("https://diminished-rights.onrender.com")
        .then(() => {
            console.log("SELF PING");
            console.timeEnd("Ping Interval");
            console.time("Ping Interval");
        })
        .catch(err => {
            console.error("Ping failed:", err);
        });
}, 600000); // 600,000 milliseconds = 10 minutes

// Imports files for export
import './loginLogoutManager.js';
import './databaseManager.js';