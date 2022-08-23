const express = require("express");
const axios = require("axios");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get(`/temperature*`, (req: { query: { lat: any; lon: any } }, res: { json: (arg0: any) => void }) => {
    axios({
        method: "get",
        url: `http://api.weatherapi.com/v1/forecast.json`,
        params: {
            key: process.env.API_KEY,
            q: `${req.query.lat},${req.query.lon}`
        }
    })
        .then((response: { data: any }) => {
            res.json(response.data);
        })
        .catch((err: any) => {
            console.error(err);
        });
});

app.get("*", (req: any, res: { sendFile: (arg0: any) => void }) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
});
