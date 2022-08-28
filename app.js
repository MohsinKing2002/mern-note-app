const express = require('express');
const cloudinary = require('cloudinary');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const {urlencoded} = require('express');
const { connectDB } = require('./config/db');

const app = express();
dotenv.config({path: './config/config.env'});
//using middlewares
app.use(cookieParser());
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb", extended: true }));

//set up cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})


//accessing routes
app.use(require("./routes/userRoutes"));
app.use(require("./routes/noteRoutes"));

//accessing database
connectDB();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "./client/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
    });
}

app.listen(process.env.PORT, ()=>{
    console.log(`server is runnning at port : ${process.env.PORT}`);
})