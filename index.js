// import express from "express";
import express from "express";

const app = express();
const port = 1500;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
    console.log(`Page loaded.`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});