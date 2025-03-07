// import express from "express";
import express from "express";

const app = express();
const port = 1500;
const portForward = true;

let pagesLoaded = 1;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
    console.log(`Page loaded. (${pagesLoaded})`);
    pagesLoaded++;
});

// listen to port
app.listen(port, () => {

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
    console.log(`Server running on port ${port}.`);
    console.log(``);

    // log date and time
    console.log(`Date of start: ${date}-${month}-${year}`);
    console.log(`Time of start: ${hours}:${minutes}:${seconds} ${time}`);
    console.log(``);

    // log website info
    console.log(`Go to http://localhost:${port} to view the website.`);
    if (portForward) {
        console.log(`Go to https://p9npwlmh-${port}.aue.devtunnels.ms/ to view the website.`);
    };
    console.log(``);

    // log server commands
    console.log(`Type "rs" to restart the server.`);
    console.log(`Press CTRL + C to kill the server.`);
    console.log(``);

    // log info usage log details
    console.log(`The page loadings will be logged underneath.`)
    console.log(``);
})