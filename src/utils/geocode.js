const request = require("request");

const geocode = (address, callback) => {
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidGluYW1pcnllZ2FuZWgiLCJhIjoiY2tzYWtpdGNzMGpsZTJ0cDU1OWZzZ2Q3ciJ9.Uv1u0iND3zYoseFgexRJWA&limit=1';
    request({
        url: geocodeUrl,
        //parsing the body as json
        json: true
    }, (error, response) => {
        if (error) {
            callback("unable to connect to location services!", undefined);
        } else if (response.body.features.length == 0) {
            callback("unable to find the location! Try another location.", undefined);
        }
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0]
            });
        }
    });
}

module.exports = geocode;
