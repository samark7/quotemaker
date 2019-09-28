var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var config = require('./config');
var fs = require('fs');

const themes = config.themes;

app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use(express.static('public'))

app.get('/', async (req, res) => {
    var quotes = await fs.readFileSync('./quotes.txt');
    var allQuotes = [];
    console.log();
    var quotesArray = quotes.toString().split('\n');
    quotesArray.forEach((item) => {
        allQuotes.push({
            quote: item.split('-')[0],
            author: item.split('-')[1]
        })
    })
    console.log(allQuotes);
    render(res, {
        quotes: allQuotes
    });
});

function render(res, data) {
    res.render('home', {
        data: data,
        theme: themes[2]
    });
}

app.listen(3000, () => {
    console.log("Server Started Listening at Port 3000");
});