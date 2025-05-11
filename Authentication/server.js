const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");

const bodyParser = require('body-parser');
const scanRouter = require('./routes/routes')

require("dotenv").config()

const authRoutes=require('./routes/routes');

const app=express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Successfully Connected")).catch((err)=>console.log(err))
app.use('/api/auth',authRoutes)


app.get('/api/auth/status', (req, res) => {
    res.status(200).json({ message: "Server is running" });
  });

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));