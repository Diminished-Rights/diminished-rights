// Imports required data
import { app, users, getDateAndTime, login, LoginLoadCount } from './appConfig.js';
import chalk from 'chalk';

// Replaces constants with variables
let LLC = LoginLoadCount;
let logon = login;

// Renders "/login.js"
app.get("/login.ejs", (req, res) => {
    res.render("login.ejs");
    console.log(`Login page loaded. (${LLC})`);
    LLC++;
});

// Handles the "/login" request
app.post("/login", (req, res) => {
    console.time("Loading time");
    logon = false;
    users.forEach((_user, index) => {
        if (!logon) {
            console.log(`Checking username and password... ` + chalk.dim(`(${_user.user})`));
            if (req.body.username == _user.user && req.body.password == _user.pass) {
                console.log(`User: ${chalk.green(_user.user)} successfully logged in!`);
                res.cookie(`username`, req.body.username);
                console.log(`Cookie set!`);
                console.timeEnd("Loading time");
                console.log(``);
                res.redirect("/database");
                logon = true;
            }
        }
    });
    if ((req.body.username == "Mao is Great" && req.body.password == "All Hail Mao") && !logon) {
        // check for generic login
        console.log(`Generic login detected!`);
        console.log(chalk.yellowBright(`User logged in successfully using generic login.`));
        res.cookie('username', req.body.username);
        console.log(`Cookie set!`);
        console.log(chalk.italic(getDateAndTime()));
        console.timeEnd("Loading time");
        console.log(``);
        res.redirect("database.ejs")
        return;
    } else if ((req.body.username == "rickroll me" && req.body.password == "please") && !logon) {
        // check for easter egg
        res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        console.log(`User rickrolled successfully.`);
        console.log(chalk.italic(getDateAndTime()));
        console.timeEnd("Loading time");
        console.log(``);
        return;
    } else if ((req.body.username == "Jackson Bo" /* Any password works here */) && !logon) {
        res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        console.log(`Jackson was rickrolled successfully.`);
        console.log(chalk.italic(getDateAndTime()));
        console.timeEnd("Loading time");
        console.log(``);
        return;
    } else if (!logon){
        res.redirect("/")
        console.log(chalk.bgRed.yellowBright("ALERT:") + chalk.yellow(` Attempted login with username "${req.body.username}" and password "${req.body.password}".`))
    }
});

// Handles the "/LogoutFunc" request
app.post("/LogoutFunc", (req, res) => {
    console.log(`User ${chalk.green(req.cookies.username)} logging out. Clearing cookies...`)
    res.clearCookie('username');
    console.log(`Cookies cleared.`)
    console.log(chalk.italic(getDateAndTime()));
    res.redirect("/")
    console.log(``)
});