const express = require('express');
const path = require('path');
const db = require('./Database')
const app = express()
const port = 42069



app.use(express.static(path.join(__dirname, '../client/web-build')));
db.insertFDAInfo(1234, "test", "ur mom", new Date());
db.insertIngredientInfo(1234, "test", "ur mom", 6.9, "tbsp", new Date(), new Date());
db.insertMealInfo("mush", 2, new Date());

//deleteIngredientInfo(1234);
//deleteFDAInfo(1234);
//deleteMealInfo("mush");

// Once client is built in production
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '../client/web-build/index.html'), function (err) {
      if (err) {
        res.status(500).send(err)
      }
    });
  })

app.listen(port, () => {
    console.log(`Pocket pantry running at http://localhost:${port}`)
})

