const Item = require('./model.js');

exports.getItem = (req, res, next) => {
    Item.findAll().then(items => {
        res.render('index', {
            itms: items
        })
    })
    .catch(err => {console.log(err)});   
};


exports.postItem = async (req, res, next) => {
    // console.log(req.body.price)
    // console.log(req.body.prodname)
    // console.log(req.body.stock)
    // checkItem = req.body.prodname
    const all_itms = await Item.findAll()
    // console.log(all_itms)
    let flag = "NO"
    for (let i = 0; i< all_itms.length; i++){
        if (all_itms[i].dataValues.prod_name === req.body.prodname)
        {
          
            updateStockID = all_itms[i].dataValues.id
            checkprice = await Item.findByPk(updateStockID)
            console.log(`checkprice is ${checkprice.price}`)
            if (checkprice.price === Number(req.body.price)){
                console.log("inside checkprice if")
                flag = "YES"
                
            }
            console.log("outside checkprice if")

        }
    }

    if (flag === "YES"){
            
            Item.findByPk(updateStockID)
    .then(item => {
       (item.stock) += Number(req.body.stock);
       item.save();
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
    
}
};

exports.delItem = (req,res) => {
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

}

