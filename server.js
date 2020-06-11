// Importing Libraries
const math = require('mathjs');
const express = require('express');
// Setting Up Express App and Ports
const app = express();
const port = 3000;
// Tells Express to use the /static folder for static files
app.use(express.static('static'));

// Setting HTTP Code and Magnitude Formula as Constants
const bad = 400;
const magform = math.parse('(x-0)^2 + (y-0)^2');

// Radians to Degrees Function
const rd = (n) => {
    let num = math.unit(n, "radians");
    num = num.to("degrees");
    return num.toJSON().value;
}

// Sends the User the HTML page when they connect to the root
app.get('/', async (req, res) => {
    res.sendFile("static/index.html", { root: __dirname });
});
// Magnitude and Direction Calculator
app.get('/magdir', async (req, res) => {
    //Checks if the sender sent both x and y parameters, and returns a 400 status code if not
    if (!req.query.x || !req.query.y) {
        res.sendStatus(bad);
    } else {
        // setting x and y to variables
        let x = math.abs(req.query.x);
        let y = math.abs(req.query.y);
        // Finding the magnitude of the vector, without square roots
        let mag = magform.evaluate({x:x, y:y});

        // Inverse tangent of the triangle and converts the radian result to degrees
        let dir = math.atan(y/x);
        dir = rd(dir);
        // Sends back an object with the magnitude and direction
        res.json({mag:mag, dir:dir});
    }
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));