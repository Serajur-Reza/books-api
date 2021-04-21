const express = require('express')
const mongoose = require('mongoose')

const cookie_parser = require('cookie-parser')
const cors = require('cors')

require('dotenv').config()

const UserRoutes = require('./Routes/UserRoutes')
const BookRoutes = require("./Routes/BookRoutes")
const AuthorRoutes = require("./Routes/AuthorRoutes");
const PublisherRoutes = require("./Routes/PublisherRoutes");

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie_parser(process.env.COOKIES_SECRET));
app.use(cors());



app.use("/", UserRoutes)
app.use("/books", BookRoutes)
app.use("/authors", AuthorRoutes);
app.use("/publishers", PublisherRoutes);

mongoose
  .connect("mongodb://localhost:27017/simple_books", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((e) => {
    console.log("Database cannot be connected due to this error: ", err.message);
  });


app.listen(3000, ()=>{
  console.log("Listening from port 3000")
})