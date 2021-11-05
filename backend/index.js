import app from "./server.js";
//import mongodb from "mongodb";
import mongoose from "mongoose";
import dotenv from "dotenv";
import https from 'https';
import fs from 'fs';

dotenv.config();

const options = {
    key: fs.readFileSync(process.env.SSL_KEY), 
    cert: fs.readFileSync(process.env.SSL)
};

//const MongoClient = mongodb.MongoClient
const port = process.env.PORT || 8000

mongoose.connect(
    process.env.RESTIMPRENTA_DB_URI,
    /*
    {
        poolSize: 50,
        wtimeout: 2500,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    */
)
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    })
    .then(async client => {
        https.createServer(options, app).listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    });

//mongoose.set('useFindAndModify', false);