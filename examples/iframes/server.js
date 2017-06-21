const express = require('express');
const serveStatic = require('serve-static');

const app = express();
const port = 3333;

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	next();
});
app.use(serveStatic(__dirname));

app.listen(port, () => console.log('Listen on port ' + port));
