// db 

const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb://localhost:27017/fitness-app-gfg').on(
    'open', () => {
        console.log('Connected to the database');
    }
).on('error', (error) => {
    console.log(`Error connecting to the database: ${error}`);
});

module.exports = connection;