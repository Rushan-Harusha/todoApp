const mongoose = require("mongoose"); //load the Mongoose module to interact with MongoDB
// prettier-ignore
const todoTaskSchema = new mongoose.Schema({    //define a Mongoose schema for a todo task
    content: {                                  //define a "content" field of type String, required
        type: String,
        required: true
    },
    date: {                             //define a "date" field of type Date, with a default value of the current date/time
        type: Date,
        default: Date.now
    }
});

//export Mongoose model named "TodoTask" based on the defined schema for use in the app
module.exports = mongoose.model("TodoTask", todoTaskSchema);
