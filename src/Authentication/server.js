const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");

require("dotenv").config()

const authRoutes=require('./routes/auth');

const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Successfully Connected")).catch((err)=>console.log(err))
app.use('/api/auth',authRoutes)

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));