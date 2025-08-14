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
    res.status(200).render("index.ejs", {
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
    res.status(301).redirect("/");
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

// 404 Error
app.use((req, res, next) => {
    console.log(chalk.blue(`Request received: `) + chalk.green(req.method) + ` ` + chalk.yellow(req.url));
    console.log(chalk.blue(`Request date: `) + chalk.green(getDateAndTime()));
    console.log(``);

    res.status(404).send(`
        <center>
            <pre>
                ERR_404_NOT_FOUND
            </pre>
            <img src="https://http.cat/404.jpg" alt="404 Not Found Cat" style="display: block; margin: 0 auto;">
        </center>
    `);
    next();
});

// 500 Error
app.use((err, req, res, next) => {
    console.error(chalk.red(`Error occurred: `) + chalk.green(err.message));
    console.error(chalk.red(`Error date: `) + chalk.green(getDateAndTime()));
    console.log(``);

    res.status(500 || err.status).send(`
        <center>
            <pre>
                ERR_500_INTERNAL_SERVER_ERROR
            </pre>
            <img src="https://http.cat/${500 || err.status}.jpg" alt="${500 || err.status} Internal Server Error Cat" style="display: block; margin: 0 auto;">
        </center>
    `);
});

// Imports files for export
import './loginLogoutManager.js';
import './databaseManager.js';


// 5fddc34bdfa4089f0926475abf82d08e