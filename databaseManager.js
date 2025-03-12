import './index.js'

app.get("/database.ejs", (req, res) => {
    res.redirect("/database");
});

app.get("/database", (req, res) => {
    console.time("Time loading");
    users.forEach((_user, index) => {
        if (req.cookies.username == _user.user) {
        res.render("database.ejs", {

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
        web_developer: ["Vishesh Kudva", "Luca Korolev", "Connor Borrell"],
        });

        console.log(`Database page loaded by the user: ${chalk.green(_user.user)}. (${DatabaseLoadCount})`);
        console.timeEnd("Time loading");
        DatabaseLoadCount++;
        return;

        };
    });
});