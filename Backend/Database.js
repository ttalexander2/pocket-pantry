const argon2 = require('argon2');
const util = require('util');
const mariadb = require('mariadb');
const exceptions = require('./Exceptions');


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
    var res = await conn.query("USE pantry")

    res = await conn.query("SELECT userid FROM usertable WHERE email='" + email + "'");

    if (res.length === 0) {
      res = await conn.query("INSERT INTO usertable (email, name, password) VALUES (?, ?, ?)", [email, name, password]);
      result = true;
    }
  } catch (err) {
    throw new exceptions.DatabaseError("The server had an unknown error.");
  } finally {
    if (conn) conn.release();
    return result;
  }
}

async function checkPassword(email, password) {
  let conn;
  try {
    conn = await pool.getConnection();
    var res = await conn.query("USE pantry")

    res = await conn.query("SELECT password FROM usertable WHERE email='" + email +"'")

    if (res.length === 0) {
      console.log("No user in database with email: " + email);
      return false;
    }
    if (await argon2.verify(res[0].password, password)){
      return true;
    }
    return false;
  } catch (err) {
    throw new exceptions.DatabaseError("The server had an unknown error.");
  } finally {
    if (conn) conn.release();
  }
}

async function getName(email) {
  let conn;
  try {
    conn = await pool.getConnection();
    var res = await conn.query("USE pantry")

    res = await conn.query("SELECT name FROM usertable WHERE email='" + email +"'")
    if (res.length > 0) {
      return res[0].name;
    }
    else {
      return "";
    }
  } catch (err) {
    return ""
  } finally {
    if (conn) conn.release();
  }
}

async function insertFDAInfo(upc, name, brand, expiration) {
    let conn;
    try {
      conn = await pool.getConnection();
      var res = await conn.query("USE pantry");
      
      res = await conn.query("INSERT INTO FDARecommendations value (?, ?, ?, ?)", [upc, name, brand, expiration]);
      
    } catch (err) {
      throw new exceptions.DatabaseError("The server had an unknown error.");
    } finally {
      if (conn) conn.release();
    }
  }
  
  async function deleteFDAInfo(upc) {
    let conn;
    try {
      conn = await pool.getConnection();
      var res = await conn.query("USE pantry");
      
      res = await conn.query("DELETE FROM FDARecommendations WHERE upc='" + upc + "'");
      
    } catch (err) {
      throw new exceptions.DatabaseError("The server had an unknown error.");
    } finally {
      if (conn) conn.release();
    }
  }
  
  async function insertIngredientInfo(upc, name, brand, amount, unitOfAmount, expiration, datePurchased) {
    let conn;
    try {
      conn = await pool.getConnection();
      var res = await conn.query("USE pantry");
      
      res = await conn.query("INSERT INTO Ingredients(upc,name,brand,amount,unitOfAmount,expirationDate,dateOfPurchase) value (?, ?, ?, ?, ?, ?, ?)", [upc, name, brand, amount, unitOfAmount, expiration, datePurchased]);
      
    } catch (err) {
      throw new exceptions.DatabaseError("The server had an unknown error.");
    } finally {
      if (conn) conn.release();
    }
  }
  
  async function deleteIngredientInfo(upc) {
    let conn;
    try {
      conn = await pool.getConnection();
      var res = await conn.query("USE pantry");
      
      res = await conn.query("DELETE FROM Ingredients WHERE upc='" + upc + "'");
      
    } catch (err) {
      throw new exceptions.DatabaseError("The server had an unknown error.");
    } finally {
      if (conn) conn.release();
    }
  }
  
  async function insertMealInfo(name, portions, dateOfCreation) {
    let conn;
    try {
      conn = await pool.getConnection();
      var res = await conn.query("USE pantry");
      
      res = await conn.query("INSERT INTO Meals(name,portions,dateOfCreation) value (?, ?, ?)", [name, portions, dateOfCreation]);
      
    } catch (err) {
      throw new exceptions.DatabaseError("The server had an unknown error.");
    } finally {
      if (conn) conn.release();
    }
  }
  
  async function deleteMealInfo(name) {
    let conn;
    try {
      conn = await pool.getConnection();
      var res = await conn.query("USE pantry");
      
      res = await conn.query("DELETE FROM Meals WHERE name='" + name + "'");
     
    } catch (err) {
      throw new exceptions.DatabaseError("The server had an unknown error.");
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
    deleteMealInfo,
    createUser,
    checkPassword,
    getName
  }