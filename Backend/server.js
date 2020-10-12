const mariadb = require('mariadb');
const express = require('express');
const path = require('path');
const app = express()
const port = 42069
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'BigDaddy',
  connectionLimit: 5
});


app.use(express.static(path.join(__dirname, '../client/web-build')));
insertFDAInfo(1234, "test", "ur mom", new Date());
//deleteFDAInfo(1234);
//insertIngredientInfo(1234, "test", "ur mom", 6.9, "tbsp", new Date(), new Date());
//deleteIngredientInfo(1234);

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

async function insertFDAInfo(upc, name, brand, expiration) {
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query("USE pantry");
    console.log(res);
    res = await conn.query("INSERT INTO FDARecommendations value (?, ?, ?, ?)", [upc, name, brand, expiration]);
    console.log(res);
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) conn.release();
  }
}

async function deleteFDAInfo(upc) {
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query("USE pantry");
    console.log(res);
    res = await conn.query("DELETE FROM FDARecommendations WHERE upc='" + upc + "'");
    console.log(res);
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) conn.release();
  }
}

async function insertIngredientInfo(upc, name, brand, amount, unitOfAmount, expiration, datePurchased) {
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query("USE pantry");
    console.log(res);
    res = await conn.query("INSERT INTO Ingredients value (?, ?, ?, ?)", [upc, name, brand, amount, unitOfAmount, expiration, datePurchased]);
    console.log(res);
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) conn.release();
  }
}

async function deleteIngredientInfo(upc) {
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query("USE pantry");
    console.log(res);
    res = await conn.query("DELETE FROM Ingredients WHERE upc='" + upc + "'");
    console.log(res);
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) conn.release();
  }
}