const jwt = require('jsonwebtoken');
const db = require('./Database');
const argon2 = require('argon2');
const secret = require('./Secret');
const exceptions = require('./Exceptions');


async function SignUp(name, email, password) {

    //store shit in database
    var hash = await argon2.hash(password);
    var result = await db.createUser(email, name, hash);
    if (result === true){
      return  await Login(email, password); 
    }
    else {
      throw new exceptions.AuthenticationError('User already exists. Please log in.')
    }

}
    
async function Login(email, password) {
    let res = await db.checkPassword(email, password);
    if (res === false) {
      throw new exceptions.AuthenticationError('Invalid Email or Password.');
    }      
    var userRecord = {
        "email": email,
        "name":  await db.getName(email),
    }
    return await generateJWT(userRecord);
}

async function AuthenticateToken(token) {
  return jwt.verify(token, secret.JWT_SECRET);
}

async function generateJWT(user) {


    const signature = secret.JWT_SECRET;
    const expiration = '1h';

    return jwt.sign({ user, }, signature, { expiresIn: expiration });
}

module.exports = { Login, SignUp, AuthenticateToken }