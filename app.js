require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

const port = process.env.PORT || 3000;

async function dbConnection(){ 
try {
    
    await mongoose.connect(process.env.DB_URL);
    console.log("connected");
    
} catch (error) {
   console.log("error");
    
}
}
dbConnection();

const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");

app.use("/api", authRoutes);
app.use("/api/courses", courseRoutes);

// app.get("/home", (req,res) => {
//     res.send("test route")
// })

app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`);
    
});
