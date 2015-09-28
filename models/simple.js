//simple.js
//
//This is a simple and temporal in-memory database only for the first states of
//development

var alasql = require('alasql');
var crypto = require('crypto');

var db = new alasql.Database();

db.exec("CREATE TABLE urlshortener (hash LONG, url STRING)");

module.exports = {
    add : function(url){
        //Create md5 hash from string
        var hash = crypto.createHash('md5').update(url).digest("hex");
        db.exec("INSERT INTO urlshortener VALUES (? , ?)", [hash, url]);
        return hash;
    },
    findByHash: function(hash){
        return db.exec("SELECT * FROM urlshortener WHERE hash=?", [hash]);
    }
}
