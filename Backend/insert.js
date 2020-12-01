const db = require('./Database');

db.insertIngredientInfo("thomas@thomas.com", "Cheddar Cheese", "Kroger", 2.0, "Gram(s)", new Date(), new Date()).then(() => {console.log('success')}).catch((err) => {console.log(err)});


