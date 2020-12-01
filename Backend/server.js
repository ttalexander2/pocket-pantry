const express = require('express');
const db = require('./Database');
const path = require('path');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors');
const { exec } = require('child_process');
const sanitizer = require('sanitize');
const auth = require('./Authentication');
const exceptions = require('./Exceptions')

const jsonParser = bodyParser.json();
const app = express();
const port = 42069;

// Recipe Puppy http://www.recipepuppy.com/about/api/


app.use(express.static(path.join(__dirname, '../Client/web-build')));
//db.insertFDAInfo(1234, "test", "ur mom", new Date());
//db.insertIngredientInfo(1234, "test", "ur mom", 6.9, "tbsp", new Date(), new Date());
//db.insertMealInfo("mush", 2, new Date());

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
    res.sendFile(path.join(__dirname + '../Client/web-build/index.html'), function (err) {
      if (err) {
        res.status(500).send(err)
      }
    });
})

app.post('/signup', jsonParser, function (req, res) {

  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    auth.SignUp(name, email, password).then(token => {
      console.log(token);
      res.status('200').send(token);
    })    
    .catch(err => {
      console.log(err);
      if (err instanceof exceptions.AuthenticationError){
        res.status('401').send(err.message);
      }
      else
      {
        res.status('500').send("The server had an unknown error. Please try again later.");
      }
    });
  } catch (err) {
    if (err instanceof exceptions.AuthenticationError){
      res.status('401').send(err.message);
    }
    else
    {
      res.status('500').send("The server had an unknown error. Please try again later.");
    }
  }
  
});

app.post('/login', jsonParser, function (req, res){
  try{
    const email = req.body.email;
    const password = req.body.password;
    auth.Login(email, password).then(token => {
      console.log(token);
      res.status('200').send(token);
    })
    .catch(err => {
      if (err instanceof exceptions.AuthenticationError){
        res.status('401').send(err.message);
      }
      else
      {
        res.status('500').send("The server had an unknown error. Please try again later.");
      }
    });
  } catch (err){
    if (err instanceof exceptions.AuthenticationError){
      res.status('401').send(err.message);
    }
    else
    {
      res.status('500').send("The server had an unknown error. Please try again later.");
    }
  }

});

app.post('/api/userdata', jsonParser, function (req, res) {
  try{
    const token = req.body.token;
    let toSend = {}
    auth.AuthenticateToken(token).then(result => {
      db.getCurrentIngredients(result.user.email).then((dbResult) => {
          toSend = {
            ...toSend,
            ingredients: dbResult,
          }
          db.getCurrentMeals(result.user.email).then((dbResult2) => {
            toSend = {
              ...toSend,
              meals: dbResult2,
            }
              db.getGroceryList(result.user.email).then((dbResult3) => {
                toSend = {
                  ...toSend,
                  grocery: dbResult3,
                }
                res.status('200').json(toSend);
              });
          });
        });
    })
    .catch(err => {
      console.log(err);
      if (err instanceof exceptions.AuthenticationError){
        res.status('401').send(err.message);
      }
      else
      {
        res.status('500').send("The server had an unknown error. Please try again later.");
      }
    });
  } catch (err) {
    if (err instanceof exceptions.AuthenticationError){
      res.status('401').send(err.message);
    }
    else
    {
      res.status('500').send("The server had an unknown error. Please try again later.");
    }
  }

});

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
  
  let pyargs = 'python3 Recipe-Parser.py '

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

function twoDigits(d) {
  if(0 <= d && d < 10) return "0" + d.toString();
  if(-10 < d && d < 0) return "-0" + (-1*d).toString();
  return d.toString();
}

Date.prototype.toMysqlFormat = function() {
  return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

app.post('/api/add/pantry', jsonParser, function (req, res) {
  try{
    const token = req.body.token;
    auth.AuthenticateToken(token).then(result => {
      db.insertIngredientInfo(result.user.email, req.body.name, req.body.brand, req.body.amount, req.body.unitOfAmount, new Date(req.body.expirationDate).toMysqlFormat(), new Date(req.body.dateOfPurchase).toMysqlFormat(0)).then(() => {
        res.status('200').send();
    }); 

    })
    .catch(err => {
      console.log(err);
      if (err instanceof exceptions.AuthenticationError){
        res.status('401').send(err.message);
      }
      else
      {
        res.status('500').send("The server had an unknown error. Please try again later.");
      }
    });
  } catch (err) {
    if (err instanceof exceptions.AuthenticationError){
      res.status('401').send(err.message);
    }
    else
    {
      res.status('500').send("The server had an unknown error. Please try again later.");
    }
  }

});

app.post('/api/add/grocery', jsonParser, function (req, res) {
  try{
    const token = req.body.token;
    auth.AuthenticateToken(token).then(result => {
      db.insertGroceryListInfo(result.user.email, req.body.name, req.body.amount, req.body.unitOfAmount).then(() => {
        res.status('200').send();
    }); 

    })
    .catch(err => {
      console.log(err);
      if (err instanceof exceptions.AuthenticationError){
        res.status('401').send(err.message);
      }
      else
      {
        res.status('500').send("The server had an unknown error. Please try again later.");
      }
    });
  } catch (err) {
    if (err instanceof exceptions.AuthenticationError){
      res.status('401').send(err.message);
    }
    else
    {
      res.status('500').send("The server had an unknown error. Please try again later.");
    }
  }

});

app.post('/api/add/meal', jsonParser, function (req, res) {
  try{
    const token = req.body.token;
    auth.AuthenticateToken(token).then(result => {
      db.insertMealInfo(result.user.email, req.body.name, req.body.portions, req.body.dateOfCreation).then(() => {
        res.status('200').send();
    }); 

    })
    .catch(err => {
      console.log(err);
      if (err instanceof exceptions.AuthenticationError){
        res.status('401').send(err.message);
      }
      else
      {
        res.status('500').send("The server had an unknown error. Please try again later.");
      }
    });
  } catch (err) {
    if (err instanceof exceptions.AuthenticationError){
      res.status('401').send(err.message);
    }
    else
    {
      res.status('500').send("The server had an unknown error. Please try again later.");
    }
  }

});

app.post('/api/update/pantry', jsonParser, function (req, res) {
  try{
    const token = req.body.token;
    auth.AuthenticateToken(token).then(result => {
      db.updateIngredientInfo(req.body.id, result.user.email, req.body.name, req.body.brand, req.body.amount, req.body.unitOfAmount, new Date(req.body.expirationDate), new Date(req.body.dateOfPurchase)).then(() => {
        res.status('200').send();
    }); 

    })
    .catch(err => {
      console.log(err);
      if (err instanceof exceptions.AuthenticationError){
        res.status('401').send(err.message);
      }
      else
      {
        res.status('500').send("The server had an unknown error. Please try again later.");
      }
    });
  } catch (err) {
    if (err instanceof exceptions.AuthenticationError){
      res.status('401').send(err.message);
    }
    else
    {
      res.status('500').send("The server had an unknown error. Please try again later.");
    }
  }

});

app.post('/api/update/grocery', jsonParser, function (req, res) {
  try{
    const token = req.body.token;
    auth.AuthenticateToken(token).then(result => {
      db.updateGroceryListInfo(req.body.id, result.user.email, req.body.name, req.body.amount, req.body.unitOfAmount).then(() => {
        res.status('200').send();
    }); 

    })
    .catch(err => {
      console.log(err);
      if (err instanceof exceptions.AuthenticationError){
        res.status('401').send(err.message);
      }
      else
      {
        res.status('500').send("The server had an unknown error. Please try again later.");
      }
    });
  } catch (err) {
    if (err instanceof exceptions.AuthenticationError){
      res.status('401').send(err.message);
    }
    else
    {
      res.status('500').send("The server had an unknown error. Please try again later.");
    }
  }

});

app.post('/api/update/meal', jsonParser, function (req, res) {
  try{
    const token = req.body.token;
    auth.AuthenticateToken(token).then(result => {
      db.updateMealInfo(req.body.id, result.user.email, req.body.name, req.body.portions, req.body.dateOfCreation).then(() => {
        res.status('200').send();
    }); 

    })
    .catch(err => {
      console.log(err);
      if (err instanceof exceptions.AuthenticationError){
        res.status('401').send(err.message);
      }
      else
      {
        res.status('500').send("The server had an unknown error. Please try again later.");
      }
    });
  } catch (err) {
    if (err instanceof exceptions.AuthenticationError){
      res.status('401').send(err.message);
    }
    else
    {
      res.status('500').send("The server had an unknown error. Please try again later.");
    }
  }

});

app.post('/api/delete/pantry', jsonParser, function (req, res) {
  try{
    const token = req.body.token;
    auth.AuthenticateToken(token).then(result => {
      db.deleteIngredientInfo(req.body.id, result.user.email).then((dbResult) => {
        res.status('200').send(JSON.stringify(dbResult));
    }); 

    })
    .catch(err => {
      console.log(err);
      if (err instanceof exceptions.AuthenticationError){
        res.status('401').send(err.message);
      }
      else
      {
        res.status('500').send("The server had an unknown error. Please try again later.");
      }
    });
  } catch (err) {
    if (err instanceof exceptions.AuthenticationError){
      res.status('401').send(err.message);
    }
    else
    {
      res.status('500').send("The server had an unknown error. Please try again later.");
    }
  }

});

app.post('/api/delete/grocery', jsonParser, function (req, res) {
  try{
    const token = req.body.token;
    auth.AuthenticateToken(token).then(result => {
      db.deleteGroceryListInfo(req.body.id, result.user.email).then((dbResult) => {
        res.status('200').send(JSON.stringify(dbResult));
    }); 

    })
    .catch(err => {
      console.log(err);
      if (err instanceof exceptions.AuthenticationError){
        res.status('401').send(err.message);
      }
      else
      {
        res.status('500').send("The server had an unknown error. Please try again later.");
      }
    });
  } catch (err) {
    if (err instanceof exceptions.AuthenticationError){
      res.status('401').send(err.message);
    }
    else
    {
      res.status('500').send("The server had an unknown error. Please try again later.");
    }
  }

});

app.post('/api/delete/meal', jsonParser, function (req, res) {
  try{
    const token = req.body.token;
    auth.AuthenticateToken(token).then(result => {
      db.deleteMealInfo(req.body.id, result.user.email).then((dbResult) => {
        res.status('200').send(JSON.stringify(dbResult));
    }); 

    })
    .catch(err => {
      console.log(err);
      if (err instanceof exceptions.AuthenticationError){
        res.status('401').send(err.message);
      }
      else
      {
        res.status('500').send("The server had an unknown error. Please try again later.");
      }
    });
  } catch (err) {
    if (err instanceof exceptions.AuthenticationError){
      res.status('401').send(err.message);
    }
    else
    {
      res.status('500').send("The server had an unknown error. Please try again later.");
    }
  }

});

app.listen(port, () => {
    console.log(`Pocket pantry running at http://localhost:${port}`)
})

