const argon2 = require('argon2')

const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'admin',
    password: 'BigDaddy',
    connectionLimit: 5
});

async function createUser(email, name, password) {
  let conn;
  let result = false;
  try {
    conn = await pool.getConnection();
    const res = await conn.query("USE pantry")

    res = await conn.query("SELECT userid FROM usertable WHERE email='" + email + "'");

    if (res == "") {
      res = await conn.query("INSERT INTO usertable value (?, ?, ?, ?)", ["", email, name, argon2.hash(password)]);
      result = true;
    }
  } catch (err) {
    console.log(err)
  } finally {
    if (conn) conn.release();
    return result;
  }
}

async function checkPassword(email, password) {
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query("USE pantry")

    res = await conn.query("SELECT password FROM usertable WHERE email='" + email +"'")
    return argon2.verify(res, password)
  } catch (err) {
    console.log(err)
  } finally {
    if (conn) conn.release();
  }
}

async function getName(email) {
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query("USE pantry")

    res = await conn.query("SELECT name FROM usertable WHERE email='" + email +"'")
    return res;
  } catch (err) {
    console.log(err)
    return ""
  } finally {
    if (conn) conn.release();
  }
}

async function insertFDAInfo(upc, name, brand, expiration) {
    let conn;
    try {
      conn = await pool.getConnection();
      const res = await conn.query("USE pantry");
      
      res = await conn.query("INSERT INTO FDARecommendations value (?, ?, ?, ?)", [upc, name, brand, expiration]);
      
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
      
      res = await conn.query("DELETE FROM FDARecommendations WHERE upc='" + upc + "'");
      
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
      
      res = await conn.query("INSERT INTO Ingredients(upc,name,brand,amount,unitOfAmount,expirationDate,dateOfPurchase) value (?, ?, ?, ?, ?, ?, ?)", [upc, name, brand, amount, unitOfAmount, expiration, datePurchased]);
      
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
      
      res = await conn.query("DELETE FROM Ingredients WHERE upc='" + upc + "'");
      
    } catch (err) {
      console.log(err);
    } finally {
      if (conn) conn.release();
    }
  }
  
  async function insertMealInfo(name, portions, dateOfCreation) {
    let conn;
    try {
      conn = await pool.getConnection();
      const res = await conn.query("USE pantry");
      
      res = await conn.query("INSERT INTO Meals(name,portions,dateOfCreation) value (?, ?, ?)", [name, portions, dateOfCreation]);
      
    } catch (err) {
      console.log(err);
    } finally {
      if (conn) conn.release();
    }
  }
  
  async function deleteMealInfo(name) {
    let conn;
    try {
      conn = await pool.getConnection();
      const res = await conn.query("USE pantry");
      
      res = await conn.query("DELETE FROM Meals WHERE name='" + name + "'");
     
    } catch (err) {
      console.log(err);
    } finally {
      if (conn) conn.release();
    }
  }


  module.exports = {
    insertFDAInfo,
    deleteFDAInfo,
    insertIngredientInfo,
    deleteIngredientInfo,
    insertMealInfo,
    deleteMealInfo
  }