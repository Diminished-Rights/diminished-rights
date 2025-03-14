// Import express and cookie-parser 
import express from "express";
import cookieParser from 'cookie-parser';

// Setup constants
const app = express();
const port = 1500;
const portForward = true;

// Quick use of express functions
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Set up variables
let paswrdPgLoadCount = 1;
let DatabaseLoadCount = 1;
let LoginLoadCount = 1;
let testingBoolean = false;
let login = false;
let prankUserName = `Jackson Bo`;

// Define the function "getDateAndTime()"
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

// Setup users
class user {
    constructor(name, pass) {
        this.user = name;
        this.pass = pass;
    }
}

// Add users
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

// Export neccecary data
export { app, port, portForward, paswrdPgLoadCount, DatabaseLoadCount, LoginLoadCount, testingBoolean, login, getDateAndTime, users, express, prankUserName };