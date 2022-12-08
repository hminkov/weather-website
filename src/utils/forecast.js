const request = require('request');

// const url = 'http://api.weatherstack.com/current?access_key=49d6ca9c6ec16de991dd7fffdd1c4e29&query=42.892099,24.703420&units=m';
//                <<URL>><<current?>><<query>>

// request({url: url, json:true}, (error, response) =>{
//   if(error) {
//     console.log('Unable to connect to weather service: error')
//   } else if (response.body.error){ //we check if a response exists in the response body
//     const err = response.body.error.info;
//     console.log(err);
//   } else {
//     const weatherDescription = response.body.current.weather_descriptions[0];
//     const temperature = response.body.current.temperature;
//     const feelsLike = response.body.current.feelslike;
//     console.log(weatherDescription + '. It is currently ' + temperature + ' degrees out. It feels like ' + feelsLike + ' degrees out.');
//   }
// })

// const forecast = (lat, long, callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=49d6ca9c6ec16de991dd7fffdd1c4e29&query='+ lat + ',' + long + '&units=m';

//     request({url: url, json: true},(error, response) => {
//         if(error) {
        //   const err = `Unable to connect to weather service: ${error}`
        //   callback(err, undefined);
        // } else if (response.body.error){ //we check if a response exists in the response body
        //   const err = response.body.error.info;
        //   callback(err, undefined);
        // } else {
        //   const countryOrigin = response.body.location.country;
        //   const weatherDescription = response.body.current.weather_descriptions[0];
        //   const temperature = response.body.current.temperature;
        //   const feelsLike = response.body.current.feelslike;
        //   callback(undefined, {countryOrigin: countryOrigin, weatherDescription: weatherDescription, temperature: temperature, feelsLike: feelsLike})
        // }
//     })
// }

//Destructuring
const forecast = (lat, long, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=49d6ca9c6ec16de991dd7fffdd1c4e29&query='+ lat + ',' + long + '&units=m';

  request({url, json: true},(error, {body}) => {
      if(error) {
          const err = `Unable to connect to weather service: ${error}`
          callback(err, undefined);
      } else if (body.error){ //we check if a response exists in the response body
        const err = body.error.info;
        callback(err, undefined);
      } else {
        const weatherDescription = body.current.weather_descriptions[0];
        const temperature = body.current.temperature;
        const feelsLike = body.current.feelslike;
        callback(undefined, weatherDescription + '. It is currently ' + temperature + ' degrees out. It feels like ' + feelsLike + ' degrees.')
      }
  })
}

module.exports = forecast;