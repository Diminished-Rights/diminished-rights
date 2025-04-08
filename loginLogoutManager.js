// Imports required data
import { app, user, users, getDateAndTime, login, LoginLoadCount, prankUserName, SHA1 } from './appConfig.js';
import chalk from 'chalk';
import fs from 'fs';

// Replaces constants with variables
let LLC = LoginLoadCount;
let logon = login;
let prankUser_username = prankUserName;

// Add persistence to the users array
const USERS_FILE = './users.json';

// Load users from file if it exists
if (fs.existsSync(USERS_FILE)) {
    const data = fs.readFileSync(USERS_FILE);
    users.push(...JSON.parse(data));
    console.log('Users loaded from file.');
}

// Save users to file whenever the array is updated
function saveUsersToFile() {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    console.log('Users saved to file.');
}

// Renders "/login.js"
app.get("/login.ejs", (req, res) => {
    res.render("login.ejs");
    console.log(`Login page loaded. (${LLC})`);
    LLC++;
});

// Handles the "/login" request
app.post("/login", (req, res) => {
    console.time("Login Loading time");
    const hashedUsername = SHA1(req.body.username);
    const hashedPassword = SHA1(req.body.password);
    console.log(`Login - Hashed Username: ${hashedUsername}`);
    console.log(`Login - Hashed Password: ${hashedPassword}`);

    logon = false;
    users.forEach((_user, index) => {
        if (!logon) {
            console.log(`Checking username and password... ` + chalk.dim(`(${_user.user})`));
            if (hashedUsername == _user.user && hashedPassword == _user.pass) {
                if (_user.level > 5) {
                    console.log(`User: ${chalk.green(_user.user)} successfully logged in!`);
                    res.cookie(`username`, hashedUsername);
                    console.log(`Cookie set!`);
                    console.timeEnd("Login Loading time");
                    console.log(``);
                    res.redirect("/database");
                    logon = true;
                } else if (_user.level <= 5) {
                    console.log(chalk.bgRed.yellowBright("ALERT:") + chalk.yellow(` User ${_user.user} attempted to login with insufficient privileges.`));
                    console.log(chalk.italic(getDateAndTime()));
                    console.timeEnd("Login Loading time");
                    console.log(``);
                    res.render("Forbidden.ejs", { 
                        AccessLevel: _user.level,
                        generic: `yes`,
                    });
                    logon = true;
                };
            };
        };
    });
    if ((req.body.username == "Mao is Great" && req.body.password == "All Hail Mao") && !logon) {
        // check for generic login
        console.log(`Generic login detected!`);
        console.log(chalk.yellowBright(`User attempted to login using generic login, and will be redirected to the "403: Forbidden" page.`));
        res.cookie(`username`, `generic`);
        console.log(chalk.italic(getDateAndTime()));
        console.timeEnd("Login Loading time");
        console.log(``);
        res.redirect("database.ejs");
        return;
    } else if ((req.body.username == "rickroll me" && req.body.password == "please") && !logon) {
        // check for easter egg
        res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        console.log(`User rickrolled successfully.`);
        console.log(chalk.italic(getDateAndTime()));
        console.timeEnd("Login Loading time");
        console.log(``);
        return;
    } else if ((req.body.username == prankUser_username /* Any password works here */) && !logon) {
        res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        console.log(`Jackson was rickrolled successfully.`);
        console.log(chalk.italic(getDateAndTime()));
        console.timeEnd("Login Loading time");
        console.log(``);
        return;
    } else if (!logon){
        res.redirect("/");
        console.log(chalk.bgRed.yellowBright("ALERT:") + chalk.yellow(` Attempted login with username "${req.body.username}" and password "${req.body.password}".`));
        console.timeEnd("Login Loading time");
    }
    console.log(`Encryped Username: ${SHA1(req.body.username)}`)
    console.log(`Encrypted Password: ${SHA1(req.body.password)}`)
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

// Handles "Create Account" request
app.get("/signup", (req, res) => {
    res.render("signup.ejs");
    console.log(`Create account page loaded.`);
    console.log(chalk.italic(getDateAndTime()));
    console.log(``);
});

// Handles "Create Account" submission
app.post("/signup", (req, res) => {
    console.time("Signup Loading time");
    const hashedUsername = SHA1(req.body.username);
    const hashedPassword = SHA1(req.body.password);
    console.log(`Signup - Hashed Username: ${hashedUsername}`);
    console.log(`Signup - Hashed Password: ${hashedPassword}`);

    const newUser = new user(hashedUsername, hashedPassword);
    users.push(newUser); // Add the new user to the users array
    saveUsersToFile();
    console.log(`User added: ${chalk.green(newUser.user)}`);
    console.log(chalk.italic(getDateAndTime()));
    console.log(``);
    res.redirect("/login.ejs");
    console.timeEnd("Signup Loading time");
});

// Handles "Delete Account" request
app.get("/delete", (req, res) => {
    res.render("delete.ejs");
    console.log(`Delete account page loaded.`);
    console.log(chalk.italic(getDateAndTime()));
    console.log(``);
});

// Handles "Delete Account" submission
app.post("/delete", (req, res) => {
    console.time("Loading time");
    const userIndex = users.findIndex(user => user.user === SHA1(req.body.username) && user.pass === SHA1(req.body.password));
    if (userIndex !== -1) {
        users.splice(userIndex, 1); // Remove the user from the array
        saveUsersToFile();
        console.log(`User deleted: ${chalk.red(SHA1(req.body.username))}`);
        console.log(chalk.italic(getDateAndTime()));
        console.log(``);
        res.redirect("/login.ejs");
    } else {
        console.log(`User not found: ${chalk.red(SHA1(req.body.username))}`);
        console.log(chalk.italic(getDateAndTime()));
        console.log(``);
        res.redirect("/delete.ejs");
    }
    console.timeEnd("Loading time");
});