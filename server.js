const express = require("express");
const app = express();
const mysql = require("mysql");
const port = process.env.PORT || 3000;
const body_parser = require("body-parser");
app.use(body_parser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});
app.post('/login',(req,res)=>{
	const username = req.body.username;
	const pass = req.body.password;
	// mysql part start
	const conn = mysql.createConnection({
		host: "byu2kbzz1item0e9flzd-mysql.services.clever-cloud.com",
		user: "uv9wztuosci7ip51",
		password: "rrVplHn0gYp8dVgOPMYH",
		database: "byu2kbzz1item0e9flzd"
	});
	conn.connect((err) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Connection success');
		}
		const sql = "INSERT INTO `form_data`(`Name`, `Password`) VALUES ?";
		const value = [[username, pass]]
		conn.query(sql,[value], (err) => {
			if (err) {
				res.sendFile(__dirname + '/failed.html');
				console.log(err)
			} else {
				res.sendFile(__dirname + '/successful.html');
			}
		})
	});
// mysql part end
});
app.get('/back',(req,res)=>{
	res.redirect('/');
})
app.listen(port);