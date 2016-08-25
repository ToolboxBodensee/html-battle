/**
 * Created by maluramichael on 25/08/16.
 */

const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

// var Router = express.Router();
// Router.get('/', function(req, res){
//    res.html('public/client.html');
// });
//
// app.use(Router);

app.listen(8080);