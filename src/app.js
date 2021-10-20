const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

// expose the address of public folder: app.use
//path.joint() : address maker
//../ up one level
// ./ current root
// console.log(__dirname);
// console.log(__filename); returns filename as well
// If we delete line 14 cannot see the anything in public folder so we need to have router in that case to see the htmls but we still can't access to css ect. files 
// use for static files
const publicDirectoryPath = path.join(__dirname, "../public");
// console.log(publicDirectoryPath);

// If we have any other name than views such as templates ect.
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set('view engine', 'hbs');
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);


app.use(express.static(publicDirectoryPath));

// router
app.get('', (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Tina Miryeganeh",
    });
});

app.get('/about', (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Tina Miryeganeh",
    });
});

app.get('/help', (req, res) => {
    res.render("help", {
        title: "Help",
        helpText: "This is a helpful text",
        name: "Tina Miryeganeh",
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address',
        });
    }
    //destructure { latitude, longitude }
    //default argument { latitude, longitude } = {}
    geocode(req.query.address, (error, { latitude, longitude } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                address: req.query.address
            });
        });
    });
});


// app.get('/products', (req,res)=>{
//     if(!req.query.search)
//         return res.send({
//             error: 'You must provide a search term!',
//         });
//     console.log(req.query);
//     console.log(req.query.search);
//     res.send({
//         products: [],
//     });
// });

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tina Miryeganeh',
        errorMessage: 'Help article not found'
    });
});

//wildcard
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tina Miryeganeh',
        errorMessage: 'page not found'
    });
});



app.listen(3000, () => {
    console.log("service is up on port 3000!");
});


