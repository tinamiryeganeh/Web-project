const request = require("request");


const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.tomorrow.io/v4/timelines?location=' + latitude + ',' + longitude + '&fields=temperature&timesteps=1h&units=metric&apikey=tJd6NOsdW6hSt3RhH8nmloi1tC79TA9t';

    request({
        url: url,
        //const forecastData = JSON.parse(response.body); instead of this line we can simply say:
        json: true
    }, (error, response) => {
        if (error) {
            callback("unable to connect to location services!", undefined);
        } else if (response.body.data.timelines.length == 0) {
            callback("unable to find the location! Try another location.", undefined);
        } else {
            callback(undefined, response.body.data.timelines[0].intervals[0].values.temperature);
        }
    });
}

module.exports = forecast;

