const express = require('express');
let app = express();
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.port || 3000;

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method}:${req.path}`;
    console.log();
    fs.appendFile("server.log", log + "\n", (err) => {
        if (err) {
            console.log("unable to append the server.log .")
        }
    })
    next();
})

// app.use((req, res, next) => {
//     res.render('maintanence.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to Express',
        currentYear: new Date().getFullYear()
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
        currentYear: new Date().getFullYear()
    })
})

app.get('/bad', (req, res) => {
    res.send({
        error: "Bad Request 404"
    })
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});