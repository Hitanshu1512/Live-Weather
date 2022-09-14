const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const query = req.body.location;
    const apiKey = "782c078cb5859project",
  // "version": "1.0.071e165a09f92c650f6c";
    const unit = "metric";
    const url =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        query +
        "&appid=" +
        apiKey +
        "&units=" +
        unit;

    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

        // console.log(weatherData);
        console.log("Description: " + weatherDescription);
        console.log("Temperature: " + temp);
        res.write(
            "<h1 style= 'text-align: center; font-size: 3rem; color: darkblue;'>The weather in " + query + " is currently <em>" +
            temp +
            " </em>degree celcius!</h1>"
        );
        res.write("<h3 style= 'text-align: center; font-size: 3.5rem; color: gray;'><em>Condition: " + weatherDescription + "</em></h3>");
        res.write("<img src =" + imageUrl + "  style= 'margin: auto 50% auto 30%; border: solid 1px; background-color: lightblue; width: 40%; height: 60%'>");
        res.send();
        });
    });
});

app.listen(3000, function () {
  console.log("Port 3000 Started!");
});
