require("dotenv").config({ path: ".env" });
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("Connected to Mongoose"))
.catch((error)=>console.log("Failed to connect to MongoDB",error))

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});

app.get("/",(req,res)=>{
  res.send("Connected to Server");
})
