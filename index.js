var express = require('express');
var bodyParser = require('body-parser');
var Schema = require('./db/schema.js');

var app = express();

var port = process.env.PORT || 1337;

app.get('/api/artists', (req, res) => {
  Schema.Artist.findAll()
    .then((result) => {
      res.json(result);
    });
});

app.post('/api/artists', (req, res) => {
  Schema.Artist.findOrCreate({ where: { artistName: req.body.username }})
    .spread((user, created) => {
      res.sendStatus(created ? 201 : 200);
    });
});

app.get('/api/battles', (req, res) => {
  Schema.Battles.findAll()
    .then((result) => {
      res.json(result);
    });
});

app.post('/api/battles', (req, res) => {
  Schema.Battles.findOrCreate({ where : { battleName: req.body.battleName }})
    .spread((user, created) => {
      Schema.Battles.create({
        battleName: req.body.battleName,
        redRapper: req.body.redRapper,
        blueRapper: req.body.blueRapper
      })
      .then((result) => {
        res.sendStatus(201);
      });
    });
})



app.listen(port, () => {
  console.log(`I am listening to port ${port}`);
});
