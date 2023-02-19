const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function (req, res) {
    const query = req.body.CityName;
    const apikey = "e66a2e1b900b4dfaeecdc765af4835a7"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const discription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>Temperature in " + query + " is " + temp + " degrees celcius.</h1>")
            res.write("<h2>The weather is currently " + discription + "</h2>")
            res.write("<img src=" + imgURL + ">");
            res.send();
        })

    });
})








app.listen(3000, function () {
    console.log("SERVER IS CONNECTED ON PORT 3000");
})