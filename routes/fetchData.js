const mongoose = require('mongoose');
const axios = require('axios');
const Product = require('../models/product'); // Import the Product model

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/datapoc', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Middleware to fetch and store data
const fetchDataAndStore = async (req, res) => {
    try {
        // Fetch data from the third-party API
        
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json'); // Replace with your third-party API URL
        const products = response.data;
         // // Store each product in the MongoDB collection
        await Product.insertMany(products, { ordered: false });

         console.log('Data fetched and stored successfully');
         res.status(200).send('Data fetched and stored successfully');
       // res.json(data); // Send the received data as the response
    } catch (error) {
        console.error('Error fetching or storing data:', error);
        res.status(500).send('An error occurred while fetching or storing data');
    }
};

module.exports = fetchDataAndStore;