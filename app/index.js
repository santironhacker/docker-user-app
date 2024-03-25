// 'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
const port = 3000

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use('/public/images/', express.static('./public/images'));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/get-profile', (req, res) => {
	const response = res;

	MongoClient.connect('mongodb://admin:password@localhost:27017', (err, client) => {
		if(err) throw err;

		const db = client.db('user-account');
		const query = { userid: 1 };
		db.collection('users').findOne(query, (err, result) => {
			if (err) throw err;
			client.close();
			response.send(result);
		})
	});
});

app.get('/profile-picture', (req, res) => {
	let img = fs.readFileSync('profile-1.jpg');
	res.writeHead(200, {'Content-Type': 'image/jpg'});
	res.end(img, 'binary');
})

app.post('/update-profile', (req, res) => {
	const userObj = req.body;
	const response = res;

	console.log('connecting to the db...');

	MongoClient.connect('mongodb://admin:password@localhost:27017', (err, client) => {
		if (err) throw err;

		const db = client.db('user-account');
		userObj['userid'] = 1;
		const query = { userid: 1 };
		const newValues = { $set: userObj };

		console.log('successfully connected to the user-account db');

		db.collection('users').updateOne(query, newValues, {upsert: true}, (err, res) => {
			if (err) throw err;
			console.log('successfully updated or inserted');
			client.close();
			response.send(userObj);
		});
	});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
