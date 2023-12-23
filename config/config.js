require('dotenv').config()

let config = {
    Host: process.env.HOST,
    Port: process.env.PORT,
    DataBaseURI: process.env.DATABASE_URI,
    OAuth_ClientID: process.env.OAuth_ClientID,
    OAuth_ClientSecret: process.env.OAuth_ClientSecret
}

module.exports = config;