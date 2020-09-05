// importing dependencies
const express = require('express');
const WebSocket = require('ws');
const robot = require('robotjs');

// initiating the node app instance
const app = express();
const webSocketServer = new WebSocket.Server({ port: 8822 });
var bodyParser = require('body-parser')

let counter = 0;

// websockets
webSocketServer.on("connection", ws => {
    console.log('new connection');


    ws.on('message', data => {
        const obj = JSON.parse(data);
        // console.log(obj);
        if (obj.beta < -20) {
            if (counter == 40) {
                robot.keyTap('up');
            }
            counter++;
            if (counter == 41) {
                counter = 0
            }
        }
        if (obj.beta > 20) {
            if (counter == 40) {
                robot.keyTap('down');
            }
            counter++;
            if (counter == 41) {
                counter = 0
            }
        }
        if (obj.gamma > 25) {
            if (counter == 40) {
                robot.keyTap('right');
            }
            counter++;
            if (counter == 41) {
                counter = 0
            }
        }
        if (obj.gamma < -25) {
            if (counter == 40) {
                robot.keyTap('left');
            }
            counter++;
            if (counter == 41) {
                counter = 0
            }
        }
        if (obj.alpha > 125) {
            if (counter == 40) {
                robot.scrollMouse(0, -1);
            }
            counter++;
            if (counter == 41) {
                counter = 0
            }
        }
        if (obj.alpha < 65) {
            if (counter == 40) {
                robot.scrollMouse(0, +1);
            }
            counter++;
            if (counter == 41) {
                counter = 0
            }
        }
              
    })

    ws.on('close', () => {
        console.log('connection closed')
    })
})

// setting app parameters
app.set('view engine', 'ejs');
app.use(express.static('assets'));
app.use(bodyParser.urlencoded({ extended: false }))

// Routes
app.get('/', (req, res) => {
    res.render('settings');
});

app.post('/ip', (req, res) => {
    let ip = req.body.ip;
    res.render('main', {
        ip: ip
    })
})

app.get('/navigate', (req, res) => {
    res.render('main', {
        ip: 0
    });
})
// Server Configuration
let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})