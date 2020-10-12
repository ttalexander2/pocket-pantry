// Recipe Puppy http://www.recipepuppy.com/about/api/

const express = require('express')
const path = require('path');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors')
const jsonParser = bodyParser.json();
const app = express()
const port = 42069

app.use(express.static(path.join(__dirname, '../client/web-build')));

// Remove in production
var corsOptions = {
  origin: 'http://localhost:19006',
  optionsSuccessStatus: 200, // For legacy browser support
  methods: "GET, PUT, POST"
}
app.use(cors(corsOptions));



// Once client is built in production
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '../client/web-build/index.html'), function (err) {
      if (err) {
        res.status(500).send(err)
      }
    });
  })



app.post('/api/recipes', jsonParser, function (req, res) {
  console.log(req.headers)

  const ingredients = req.body.ingredients;
  console.log(req.body)
  if (ingredients.length < 1){
    res.sendStatus(400);
    return;
  }

  let url = 'http://www.recipepuppy.com/api/?i=' + ingredients[0];
  for (var i = 1; i < ingredients.length; i++){
    url += "," + ingredients[i];
  }
  console.log(url);
  

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