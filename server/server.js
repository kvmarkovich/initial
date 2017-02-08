var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');


var ObjectID = require('mongodb').ObjectID;

var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

var db = new Db('tutor',
    new Server("localhost", 27017, {safe: true},
        {auto_reconnect: true}, {}));

db.open(function(){
    console.log("mongo db is opened!");
});

db.collection('notes', function(error, notes) {
    db.notes = notes;
});

db.collection('sections', function(error, sections) {
    db.sections = sections;
});


var notes = [
    {text: "First note"},
    {text: "Second note"},
    {text: "Third note"}
]
app.use(express.static(path.join(__dirname, '..')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
    secret: 'angular_tutorial',
    resave: true,
    saveUninitialized: true
}));

app.get("/sections", function(req,res) {
    db.sections.find(req.query).toArray(function(err, items) {
        res.send(items);
    });
});

app.get("/notes", function(req,res) {
    db.notes.find(req.query).toArray(function(err, items) {
        res.send(items);
    });
});

app.post("/notes", function(req,res) {
    db.notes.insert(req.body);
    res.end();
});

app.delete("/notes", function(req,res) {
    var id = new ObjectID(req.query.id);
    db.notes.remove({_id: id}, function(err){
        if (err) {
            console.log(err);
            res.send("Failed");
        } else {
            res.send("Success");
        }
    })
});


app.listen(8080);

/*

FOLDER STRUCTURE:

root
  app 
  server
     server.js
	 package.json
  index.html
  package.json
  
*/
  