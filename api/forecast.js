var axios = require("axios");

module.exports = (req, res) => {
    axios({
        method: "get",
        url: `http://api.weatherapi.com/v1/forecast.json`,
        params: {
            key: process.env.API_KEY,
            q: `${req.query.lat},${req.query.lon}`,
        },
    })
        .then(response => {
            res.json(response.data);
        })
        .catch(err => {
            console.error(err);
        });
};
