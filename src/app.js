const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

//Define paths for express config
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up hnadlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory 
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Vinay'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help file',
        name: 'Vinay'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Vinay'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address) {
        return res.send( {
            error: 'Please enter a valid address'
    })
    } else {
        geocode(address, (error, { long, lat, location} = {}) => {
            if(error) {
                return res.send({error})
            } 
        
            forecast(long, lat, (error, forecastData) => {
                if(error) {
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location: location,
                    address: address
                })              })
        })
    } 
})


app.get('/help/*', (re, res) => {
    res.render('errors', {
        title: '404',
        name: 'Vinay',
        message: 'Help article not found!'
    })
})

app.get('*', (re, res) => {
    res.render('errors', {
        title: '404',
        name: 'Vinay',
        message:'My 404 page!'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
