
const productdb=require('./models/product');
const express = require("express");
const path = require("path");
const app = express();
//const hbs = require("express-handlebars");
const port = 3000;
const axios = require('axios'); // Using axios to make HTTP requests
// const middleWareTest = (req, res, next) => {
//   console.log(req);
//next();
// };

//app engine('handlebars', hbs.engine({ //defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts' }));
//app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, "public")));

app.use('/b', require(path.join(__dirname, 'routes/blog.js')))

app.use('/fetchData', require(path.join(__dirname, 'routes/fetchData.js')))
//app.use(middleWareTest)

// app.get("/hello/:name", (req, res) => {
//   res.send('Hello World! .' + req.params.name);
// });

// app.get("/about", (req, res) => {
//    res.send('About Section')
//   res.sendFile(path.join(__dirname, "index.html"));
//    res.status(200)
//   res.json({"name" : "piyush"})
// });

app.get('', async(req,res)=>{
  const data=await productdb.find({});
  //res.json(data);
  console.log(data);

  var month= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
            
res.render('transactions.ejs',{transactions:data,getmonth:month});


})

app.listen(port, () => {
  console.log(`My app listening on port ${port}`);
});


app.get('/getS3Data', async function(req, res) {  
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json'); // Replace with your third-party API URL
    
    const data = response.data;
    res.json(data); // Send the received data as the response
} catch (error) {
    console.error('Error fetching data from third-party API:', error);
    res.status(500).send('An error occurred');
}
});  




