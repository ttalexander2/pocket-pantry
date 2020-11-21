const jwt = require('jsonwebtoken');
const db = require('./Database');
import 'Secret.js';


async function SignUp(name, email, password) {

    //store shit in database
    var result = db.createUser(email, name, password);
    return Login(email, password);
}
    
async function Login(email, password) {
    let res = db.Login();
    if (res === true) {
      return {
        "User": {
          "Email": email,
          "Name": db.getName(email),
        },
        "Token": this.generateJWT(userRecord),
      }
    }
    return false;  
}

async function AuthenticateToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

async function generateJWT(user) {

    const data =  {
      _id: user._id,
      name: user.name,
      email: user.email
    };
    const signature = JWT_SECRET;
    const expiration = '1h';

    return jwt.sign({ data, }, signature, { expiresIn: expiration });
}

module.exports = { Login, SignUp }