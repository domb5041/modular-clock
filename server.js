const express = require("express");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("/api", (req, res) => {
    res.json({ message: `api key${process.env.API_KEY}` });
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
});
