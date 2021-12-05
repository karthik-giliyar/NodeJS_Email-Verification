const mongoose = require("mongoose")
const express = require("express")

const cookieParser = require("cookie-parser")
const cors = require("cors")
require("dotenv").config()

const app = express()

// DB connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(()=>{console.log("DB CONNECTED SUCCESSFULLY")})
.catch(()=>{console.log("UNABLE TO CONNECT TO DB")})


//Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// Import the routes
const userRoutes = require("./routes/user")

// Using routes
app.use('/api/user', userRoutes) 

// starting a server
const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`APP IS RUNNING AT ${port}`);
})