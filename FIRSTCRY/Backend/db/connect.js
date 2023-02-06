
const mongoose = require('mongoose');
require("dotenv").config()
// const connect=mongoose.connect('mongodb://127.0.0.1:27017/mydata')
 async function connect() {
    // protocol://username:password@host:port/db_name
   // mongodb://127.0.0.1:27017/
   
    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.MONGODB_URL, (err) => {
            if (err) {
                console.log('Error in connecting to database')
                console.log(err);
                return reject(err);
            }
            console.log('Connected to DB')
            resolve();
        })
    })
}

module.exports = connect;