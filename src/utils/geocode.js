const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidmluYXlkdiIsImEiOiJja3BjbTV4Y3MxN3FmMndsYTJkbnVhN2hwIn0._ciryp9KmbZ4qtziIEjB5Q&limit=1'

    request({ url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to conect to loacation services!')
        } else if(body.features.length === 0) {
            callback('Unable to find location')
        }else {
            callback(undefined, {
                lat : body.features[0].center[1],
                long : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }

    })
}

module.exports = geocode