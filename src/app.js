const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname);
console.log(__filename);
console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000; //either provide PORT from heroku env or default 3000

// define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname, '../templates/views');
const partialsDirectory = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs'); //.set(<key>,<value>) --> this is required to setup handlebars
app.set('views', viewsDirectory);
hbs.registerPartials(partialsDirectory);

// setup static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Hristo Minkov'
    });
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Hristo Minkov'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Hristo Minkov'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if(!address) {
        return res.send({ 
            error: "You must provide an address"
        })
    }

    geocode(address, (err, {lat, long, location} = {}) => {
        if(err) return errorHandler(err, res);
        forecast(lat, long, (err, forecastData) => {
            if(err) return errorHandler(err, res);
            res.send({
                location,
                forecast: forecastData
            });
        })
    })
})

function errorHandler (err, res) {
    return res.send({
        error: err
    });
}

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query);
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'The help article was not found',
        name: 'Hristo Minkov'
    })
})

//route handler
app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'Page not found',
        name: 'Hristo Minkov'
    })
})

//to start the server up we need to use the method .listen()
app.listen(port, () => {
    console.log('Server is running on port', port)
});