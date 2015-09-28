//urlshortener.js

var db = require('../models/simple.js');
var validUrl = require('valid-url');

module.exports = function(app){

    //get
    app.get('/*', function(req, res){
        var search = db.findByHash(req.originalUrl.substring(1));
        if (search.length > 0){
            res.redirect(search[0].url);
        } else{
            res.sendStatus(404);
        }
    }),
        
    //post
    app.post('/link', function(req, res){
        if (validUrl.isUri(req.body.url)){
            var resDummy = {"hash": db.add(req.body.url), "target": req.body.url}
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(resDummy));
        } else{
            res.sendStatus(400);
        }
    })
}

