const express = require("express"); //load the Express module & create an instance
const app = express(); //create an instance of the Express app

app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static("public"));

app.set("view engine", "ejs");

// prettier-ignore
app.get('/', (req, res) => {    //create a GET route for the root URL
 res.render('todo.ejs');      //send a response to client
});

app.post("/", (req, res) => {
  console.log(req.body);
});

//start the server & listen on port 3000, log a message to console when server ready
app.listen(3000, () => console.log("Server up and running"));
