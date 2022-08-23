const express = require("express");
const axios = require("axios");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get(`/temperature*`, (req, res) => {
    axios({
        method: "get",
        url: `http://api.weatherapi.com/v1/forecast.json`,
        params: {
            key: process.env.API_KEY,
            q: `${req.query.lat},${req.query.lon}`
        }
    })
        .then((response) => {
            res.json(response.data);
        })
        .catch((err) => {
            console.error(err);
        });
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
});
