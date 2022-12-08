const request = require('request');

//Destructuring
const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?types=country&access_token=pk.eyJ1IjoiaG1pbmtvdiIsImEiOiJjbGJhbzdpN28wNjhpM3RwNjVvZDVtbWU4In0.uhODy_Db674grPOFuh05zQ&limit=1';

    request({url, json:true}, (error, {body}) => {
        if(error) {
            callback(`Unable to connect to location services: ${error}`, undefined)
        }else if(body.message){
            callback(`Location services error: ${error}`, undefined)
        }else if(body.features.length === 0) {
            callback(`Location not found error: ${error}`, undefined)
        }else {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;
