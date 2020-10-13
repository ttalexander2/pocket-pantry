const express = require('express');
const db = require('./Database')
// Recipe Puppy http://www.recipepuppy.com/about/api/
const path = require('path');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
const jsonParser = bodyParser.json();
const app = express();
const port = 42069;



app.use(express.static(path.join(__dirname, '../client/web-build')));
db.insertFDAInfo(1234, "test", "ur mom", new Date());
db.insertIngredientInfo(1234, "test", "ur mom", 6.9, "tbsp", new Date(), new Date());
db.insertMealInfo("mush", 2, new Date());

//deleteIngredientInfo(1234);
//deleteFDAInfo(1234);
//deleteMealInfo("mush");

// Remove in production
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // For legacy browser support
  methods: "GET, PUT, POST"
}
app.use(cors(corsOptions));



// Once client is built in production
app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname + '../client/web-build/index.html'), function (err) {
      if (err) {
        res.status(500).send(err)
      }
    });
  })



app.post('/api/recipes', jsonParser, function (req, res) {


  const ingredients = req.body.ingredients;

  if (ingredients.length < 1){
    res.sendStatus(400);
    return;
  }

  let url = 'http://www.recipepuppy.com/api/?i=' + ingredients[0];
  for (var i = 1; i < ingredients.length; i++){
    url += "," + ingredients[i];
  }

  

  (async () => {
      const body = {a: 1};
    
      const response = await fetch(url, {
        method: 'GET'
      });
      const json = await response.json();
    
      res.send(JSON.stringify(json));
    })();

})

app.post('/api/recipes/scrape', jsonParser, function (req, res) {
  

  let pyargs = 'python Recipe-Parser.py '

  pyargs = pyargs + "\"" + req.body.url + "\"";

  console.log(pyargs)

  exec(pyargs, (error, stdout, _stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(stdout)
    res.send(stdout);
  });


})



app.listen(port, () => {
    console.log(`Pocket pantry running at http://localhost:${port}`)
})

