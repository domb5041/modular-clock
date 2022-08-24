import axios from "axios";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 3001;

const app: Express = express();

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get(`/temperature*`, (req: Request, res: Response) => {
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

app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
});
