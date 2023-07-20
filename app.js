const http = require('http');
const path = require('path');
const express= require('express');
const app = express();
const server = http.createServer(app);

app.use((req,res,next) => {

    res.sendFile(path.join(__dirname,'index.html'))
})
server.listen(3000);

