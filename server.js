const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')

let port = process.env.PORT || 8080

// parse request data content type application/x-ww-form-rulencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse request data content type application/json
app.use(bodyParser.json());

// View engine
app.set('view engine', 'ejs')


// Render Home page
app.get('/', function(req, res) {
            res.render('pages/index')
})

// Import routes
const sectionRoutes = require('./src/routes/section.route');
const membreRoutes = require('./src/routes/membre.route');
const activiteRoutes = require('./src/routes/activite.route');
const cotisationRoutes = require('./src/routes/cotisation.route');
const groupeRoutes = require('./src/routes/groupe.route');
const presenceRoutes = require('./src/routes/presence.route');


// Create routes
app.use('/api/v1/section', sectionRoutes);
app.use('/api/v1/membre', membreRoutes);
app.use('/api/v1/activite', activiteRoutes);
app.use('/api/v1/cotisation', cotisationRoutes);
app.use('/api/v1/groupe', groupeRoutes);
app.use('/api/v1/presence', presenceRoutes);


app.listen(port)
console.log(`Server is listening on port ${port}`);
