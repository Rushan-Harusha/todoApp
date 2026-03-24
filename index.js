const express = require("express"); //load the Express module & create an instance
const app = express(); //create an instance of the Express app
const dotenv = require("dotenv"); //load the dotenv module to manage environment variables
const mongoose = require("mongoose"); //load the Mongoose module to interact with MongoDB
const TodoTask = require("./models/TodoTask"); //load the TodoTask model from models/TodoTask.js

dotenv.config(); //load environment variables from a .env file into process.env

app.use(express.urlencoded({ extended: true })); //middleware to process POST requests requests
app.use("/static", express.static("public")); //serve static files from the "public" directory

mongoose
  .connect(process.env.DB_CONNECT) //connect to MongoDB using the connection string from env var
  .then(() => {
    console.log("Connected to db!"); //log a message when connected to DB
    app.listen(3000, () => console.log("Server up and running")); //start server, port 3000, log msg
  })
  .catch((err) => {
    console.error(err);
  }); //log any errors that occur during DB connection

app.set("view engine", "ejs"); //set EJS as the view engine for rendering templates

// prettier-ignore
app.get("/", (req, res) => {  //create a GET route for the root URL
  res.render("todo.ejs");     //render the "todo.ejs" template when root URL accessed
});

// prettier-ignore
app.post("/", async (req, res) => { //create a POST route for the root URL to handle form submissions
    const todoTask = new TodoTask({ //create a new instance of the TodoTask model with content from the form submission
        content: req.body.content   //access the "content" field from the submitted form data
    });
    try {                           //try to save the new todo task to the database
        await todoTask.save();      //save the new task to the database, wait for it to complete
        res.redirect("/");          //redirect the user back to the root URL after saving the task
    } catch (err) {                 //if an error occurs during saving, catch it and handle it
        res.status(500).send(err);  //send a 500 Internal Server Error response with the error message
        res.redirect("/");          //redirect the user back to the root URL even if there's an error
    }
});

//start the server & listen on port 3000, log a message to console when server ready
// app.listen(3000, () => console.log("Server up and running"));
