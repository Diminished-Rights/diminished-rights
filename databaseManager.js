// Imports required data as well as Chalk
import { app, users, getDateAndTime, DatabaseLoadCount, encrypt, decrypt, memberData } from './appConfig.js';
import chalk from 'chalk';

// Replaces constants with variables
let DBLC = DatabaseLoadCount;
let loadAuth = null;

// Redirect to "/database"
app.get("/database.ejs", (req, res) => {
    res.status(301).redirect("/database");
});

// Renders "/database"
app.get("/database", (req, res) => {
    loadAuth = null;
    console.time("Time loading");
    users.forEach((_user, index) => {
        if (req.cookies.username == _user.user) {
            res.status(200).render("database.ejs", {
                memberData: {
                    hierarchy: Object.fromEntries(
                        Object.entries(memberData.hierarchy).map(([k, arr]) => [
                            k,
                            arr.map(v => decrypt(v, 12))
                        ])
                    ),
                    roles: Object.fromEntries(
                        Object.entries(memberData.roles).map(([k, arr]) => [
                            k,
                            arr.map(v => decrypt(v, 12))
                        ])
                    )
                }
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

// POST route to remove a member
app.post("/remove-member", (req, res) => {
    const { category, name } = req.body;

    if (!category || !name) {
        console.log("Remove-member: Missing category or name");
        return res.redirect("/database");
    }

    // Check if category exists in hierarchy or roles
    if (memberData.hierarchy[category]) {
        memberData.hierarchy[category] = memberData.hierarchy[category].filter(
            encName => decrypt(encName, 12) !== name
        );
        console.log(`Removed ${name} from hierarchy.${category}`);
    } else if (memberData.roles[category]) {
        memberData.roles[category] = memberData.roles[category].filter(
            encName => decrypt(encName, 12) !== name
        );
        console.log(`Removed ${name} from roles.${category}`);
    } else {
        console.log(`Category ${category} not found`);
    }

    // Redirect back to the database page
    res.redirect("/database");
});

app.post("/add-or-assign-person", (req, res) => {
    const { actionType, newMemberName, hierarchyCategory, memberName, role } = req.body;

    if (actionType === "add") {
        if (!newMemberName || !hierarchyCategory) return res.redirect("/database");

        const encryptedName = encrypt(newMemberName, 12);

        if (!memberData.hierarchy[hierarchyCategory].includes(encryptedName)) {
            memberData.hierarchy[hierarchyCategory].push(encryptedName);
            console.log(`Added ${newMemberName} to hierarchy.${hierarchyCategory}`);
        }

    } else if (actionType === "assign") {
        if (!memberName || !role) return res.redirect("/database");

        // Encrypt memberName if your roles array expects encrypted names
        const encryptedMember = encrypt(memberName, 12);

        if (!memberData.roles[role].includes(encryptedMember)) {
            memberData.roles[role].push(encryptedMember);
            console.log(`Assigned ${memberName} to role ${role}`);
        }
    }

    res.redirect("/database");
});