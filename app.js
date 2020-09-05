// importing dependencies
const express = require('express');

// initiating the node app instance
const app = express();

// setting app parameters
app.set('view engine', 'ejs');
app.use(express.static('assets'));

// Routes
app.get('/', function (req, res) {
    res.render('main');
})

// Server Configuration
let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

