const fetch = require('node-fetch');
fetch('localhost:42069/recipes', {method: 'POST', body: '{ingredients: [fish, chips]}', headers: { 'Content-Type': 'application/json' }})
	.then(res => res.json()).then(json => console.log(json)).catch(function () {console.log("you suck");});
