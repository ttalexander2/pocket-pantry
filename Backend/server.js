// Recipe Puppy http://www.recipepuppy.com/about/api/

const express = require('express')
const path = require('path');
const fetch = require('node-fetch');
const app = express()
const port = 42069

app.use(express.static(path.join(__dirname, '../client/web-build')));

// Once client is built in production
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '../client/web-build/index.html'), function (err) {
      if (err) {
        res.status(500).send(err)
      }
    });
  })

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.post('/api/recipes', jsonParser, function (req, res) {

  const ingredients = req.body.ingredients;

  let url = 'http://www.recipepuppy.com/api/?i=' + ingredients[0];
  for (var i = 1; i < ingredients.length; i++){
    url += "," + ingredients[i];
  }
  console.log(url);
  
  let jsonObj = {};

  (async () => {
      const body = {a: 1};
    
      const response = await fetch(url, {
        method: 'GET'
      });
      const json = await response.json();
    
      res.send(JSON.stringify(json));
    })();

})



app.listen(port, () => {
    console.log(`Pocket pantry running at http://localhost:${port}`)
})