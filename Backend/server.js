const express = require('express')
const path = require('path');
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, '../client/web-build')));

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