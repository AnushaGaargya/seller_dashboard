// const http = require('http');
const path = require('path');
const express= require('express');
const sequelize = require('/Users/anusha/Desktop/Sharpener/nodejs_test_project/database.js');
const Item = require('./model.js');
const app = express();
const bodyParser = require('body-parser');
// const Routes = require('./route.js')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const Routes = require('/Users/anusha/Desktop/Sharpener/nodejs_test_project/route.js');
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }));

app.use(Routes);


sequelize.sync()
.then(() => {
    app.listen(3000); 
})