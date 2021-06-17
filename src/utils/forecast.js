const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=acacfd7fee15812b14952f92aea9d2c9&query=' + encodeURIComponent(longitude) +',' + encodeURIComponent(latitude) +'&units=m'

    request({ url, json: true}, (error, { body}) => {
        if(error){    
            callback('Unable to connect to weather service')
        } else if(body.error) {
            callback('Unable to find location')
        }else {
            callback(undefined, body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+'C and feels like '+body.current.feelslike+'C with '+body.current.humidity+'% humidity and UV index = '+body.current.uv_index+ '.'
            )
        }
    })
}

module.exports = forecast