// Imports required data as well as Chalk
import { app, users, getDateAndTime, DatabaseLoadCount } from './appConfig.js';
import chalk from 'chalk';

// Replaces constants with variables
let DBLC = DatabaseLoadCount;
let loadAuth = null;

// Redirect to "/database"
app.get("/database.ejs", (req, res) => {
    res.redirect("/database");
});

// Renders "/database"
app.get("/database", (req, res) => {
    loadAuth = null;
    console.time("Time loading");
    users.forEach((_user, index) => {
        if (req.cookies.username == _user.user) {
            res.render("database.ejs", {
                // member hierarchy
                chairman: ["Ayden Lim"],
                high_council: ["Luca Korolev", "Vishesh Kudva", "Kaidi Hsu"],
                honoured_members: [],
                members: ["Orion Huang", "Angus McDonnell", "Myeongjo Seo", "Connor Borrell"],
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
                web_developer: ["Vishesh Kudva", "Luca Korolev", "Connor Borrell"],
            });

            console.log(`Database page loaded by the user: ${chalk.green(_user.user)}. (${DBLC})`);
            console.timeEnd("Time loading");
            loadAuth = true;
            DBLC++;
            return;
        } else if (req.cookies.username == `generic`) {
            res.render("Forbidden.ejs", {
                generic: `no`,
            });
            console.log(chalk.yellow(`User redirected to "403: Forbidden" page due to generic login.`));
            console.timeEnd("Time loading");
            console.log(``)
            loadAuth = true;
        };
    });

    // If the user is not authorised with cookies
    if (!loadAuth) {
        res.render("Forbidden.ejs");
        console.log(`${chalk.bgRed.yellowBright(`ALERT:`)}${chalk.yellowBright(`A user attempted to login, but neccesary cookies were not detected.`)}`);
        console.timeEnd("Time loading");
        console.log(``);
    };
});
