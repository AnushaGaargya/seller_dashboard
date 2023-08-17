// const http = require('http');
const path = require('path');
const express= require('express');
const sequelize = require('/Users/anusha/Desktop/Sharpener/nodejs_test_project/database.js');
const Item = require('./model.js');
const app = express();
const bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// const Routes = require('/Users/anusha/Desktop/Sharpener/nodejs_test_project/route.js');
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(Routes);

app.get('/', (req,res) => { 
    Item.findAll().then(items => {
        res.render('index', {
            itms: items
        })
    })
    .catch(err => {console.log(err)});    
})


app.post('/', async (req,res) => {
    console.log(req.body.price)
    console.log(req.body.prodname)
    console.log(req.body.stock)
    checkItem = req.body.prodname
    const all_itms = await Item.findAll()
    console.log(all_itms)
    let flag = "NO"
    for (let i = 0; i< all_itms.length; i++){
        if (all_itms[i].dataValues.prod_name === req.body.prodname)
        {
            flag = "YES"
            updateStockID = all_itms[i].dataValues.id
        }
    }

    if (flag =="YES"){
            
            Item.findByPk(updateStockID)
    .then(item => {
       (item.stock) += Number(req.body.stock);
        return item.save();
    })
    .then(result => {
        console.log('UPDATED PRODUCT')
        res.redirect('/')
    })
    .catch(err => {console.log(err)})
    }
    else{
    
   
    Item.create({
        prod_name: req.body.prodname,
        price: req.body.price,
        stock: req.body.stock
    }).then(result => {
        console.log('item created')
        res.redirect('/')    
    })
    .catch(err => {
        console.log(err);
    })
    
}})

app.post('/del', (req,res) => {
    console.log("IN THE DELETE ROUTE")
    console.log(req.body.id)
    
    delID = req.body.id
    Item.findByPk(delID)
    .then(item => {
        return item.destroy();
    })
    .then(result => {
        console.log('DELETED ITEM')
        res.redirect('/')
    })
    .catch(err => console.log(err))
});

sequelize.sync()
.then(() => {
    app.listen(3000); 
})







