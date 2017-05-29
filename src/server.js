'use strict';

const express = require('express');
const app = express();
let bodyParser = require('body-parser');
let ejs = require('ejs');
let pg = require('pg');

let client = new pg.Client('postgres://postgres:blah@172.17.0.1:9000/postgres');

//the votes database structure
let votes = {
  india: 0,
  pakistan: 0,
  srilanka: 0,
  rsa: 0,
  england: 0,
  nzw: 0,
  australia: 0,
  bangladesh: 0
};


client.connect(function (err) {
  if (err) throw err;
  client.query('SELECT number_of_votes FROM votes', function (err, result) {
    if (err) throw err;

    votes.india = result.rows[0].number_of_votes;
    votes.pakistan = result.rows[1].number_of_votes;
    votes.srilanka = result.rows[2].number_of_votes;
    votes.rsa = result.rows[3].number_of_votes;
    votes.england = result.rows[4].number_of_votes;
    votes.nzw = result.rows[5].number_of_votes;
    votes.australia = result.rows[6].number_of_votes;
    votes.bangladesh = result.rows[7].number_of_votes;

  });
});


//for parsing the data of frontend
let urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')

app.get('/', function (req, res) {
  res.render('pages/index', {
    votes: votes
  });
});

app.post('/vote', urlencodedParser, function(req, res) {
  let vote = req.body.yourVote;
  if(vote === 'india') {
    votes.india = votes.india + 1;
      client.query('UPDATE votes SET number_of_votes=\'' + votes.sandwiches + '\' WHERE option_name=\'india\'', function (err, result) {
        if (err) throw err;
      });
} else if (vote === 'pakistan') {
  votes.pakistan = votes.pakistan + 1;
  client.query('UPDATE votes SET number_of_votes=\'' + votes.sandwiches + '\' WHERE option_name=\'pakistan\'', function (err, result) {
    if (err) throw err;
  });
}else if (vote === 'rsa') {
  votes.rsa = votes.rsa + 1;
  client.query('UPDATE votes SET number_of_votes=\'' + votes.sandwiches + '\' WHERE option_name=\'rsa\'', function (err, result) {
    if (err) throw err;
  });
}else if (vote === 'srilanka') {
  votes.srilanka = votes.srilanka + 1;
  client.query('UPDATE votes SET number_of_votes=\'' + votes.sandwiches + '\' WHERE option_name=\'srilanka\'', function (err, result) {
    if (err) throw err;
  });
}else if (vote === 'england') {
  votes.england = votes.england + 1;
  client.query('UPDATE votes SET number_of_votes=\'' + votes.sandwiches + '\' WHERE option_name=\'england\'', function (err, result) {
    if (err) throw err;
  });
}else if (vote === 'nzw') {
  votes.nzw = votes.nzw + 1;
  client.query('UPDATE votes SET number_of_votes=\'' + votes.sandwiches + '\' WHERE option_name=\'nzw\'', function (err, result) {
    if (err) throw err;
  });
}else if (vote === 'australia') {
  votes.australia = votes.australia + 1;
  client.query('UPDATE votes SET number_of_votes=\'' + votes.sandwiches + '\' WHERE option_name=\'australia\'', function (err, result) {
    if (err) throw err;
  });
}else if (vote === 'bangladesh') {
  votes.bangladesh = votes.bangladesh + 1;
  client.query('UPDATE votes SET number_of_votes=\'' + votes.sandwiches + '\' WHERE option_name=\'bangladesh\'', function (err, result) {
    if (err) throw err;
  });
}else {
  console.log('Something went wrong: vote contains ' + vote);
}
  res.redirect('/');
});

const PORT = 8888;
app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
