const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname);
console.log(__filename);
console.log(path.join(__dirname, '../public'));

const app = express();

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
        return res.send({ //by using return we are stopping the func execution
            error: "You must provide an address"
        })
    }

    //geocode(address,(err, {{destructured data}} = {default object if no info is provided}) => )
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
// localhost:3000/products?search=games&rating=5
app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({ //by using return we are stopping the func execution
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
//app.com
//app.com/help
//app.com/about

//to start the server up we need to use the method .listen()
app.listen(3003, () => {
    console.log('Server is running on port 3003')
});