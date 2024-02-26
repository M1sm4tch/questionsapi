const express = require('express');
const bodyParser = require('body-parser');
const questionRouter = require('./routes/questionRoutes');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userroutes');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const mongodb = process.env.MONGODB_URI;

if(!mongodb)  {
  console.log("Mongodb url does not exist.");
  process.exit(0);
}
try {
  mongoose.connect(mongodb);
  console.log("database connected")
} catch(error){
  console.log(error);
}

app.use(cors({ origin: '*' })); 

app.use(bodyParser.json());

app.use('/user', userRoutes); // User routes

app.use('/api', questionRouter); // Questions api routes

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
