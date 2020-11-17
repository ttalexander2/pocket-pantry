import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import 'Secret.js';


async function SignUp(name, email, password) {

    try {
        const hashedAss = argon2.hash(password);
    }
    catch (err) {
        throw new Error('An unexpected error occurred, please try again later.')
    }

    //store shit in database

    const userInfo = {"Name": name, 'Email': email}

    return userInfo;
}
    
async function Login(email, password) {
    //Get the user record based on email

    // If user not found, throw error

    const correctPassword = await argon2.verify(userRecord.password, password);
    if (!correctPassword) {
      throw new Error('Incorrect password')
    }

    return {
        user: {
          email: userRecord.email,
          name: userRecord.name,
        },
        token: this.generateJWT(userRecord),
      }
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