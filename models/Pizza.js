// Import the Mongoose dependancies
const { Schema, model } = require('mongoose');

// import the date formatting in utils folder
const dateFormat = require('../utils/dateFormat');

// Schema for Pizza
const PizzaSchema = new Schema(
    {
        pizzaName: {
            type: String
        },
        createdBy: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // use GETTERS to tranform data by default before it gets to the controller
            // Getter is typically a special type of function that takes stored data you are looking to retrieve and modifies or formats it upon return
            // use the key "get" to use a "getter" in Mongoose
            get: (createdAtVal) => dateFormat(createdAtVal) // comes from Utils folder
        },
        size: {
            type: String,
            default: 'Large'
        },
        toppings: [],
        // add the child "comments" element to the parent "pizza" element
        comments: [
            {
                // tell Mongoose to expect an ObjectId and to tell it that its data comes from the Comment model
                type: Schema.Types.ObjectId,
                // "ref:" tells the Pizza model which documents to search to find the right comments
                ref: 'Comment'
            }
        ]
    },
    {
        // tell the schema to use virtuals using toJSON property
        toJSON: {
            // use virtuals
            virtuals: true,
            // use getters
            getters: true
        },
        id: false // set to "false" because this is a virtual that Mongoose returns, and we don't need it
    }
);

// Virtuals allow you to add virtual properties to a document that aren't stored in the database
// - they are normally computed values that get evaluated when you try to access their properties
// - they allow us to add more information to a database respons so that we don't have to add in the information manually with a helper before responding to the API request
// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function () {
    //.reduce is being used to tally up the total of every comment with its replies
    //.reduce takes two parameters, an "accumulator" (total) and a "currentValue" (comment)
    //as .reduce walks through an array, it passes the accumulating total and the current value of comment into the function, with the return of the function revising the total for the next iteration through the array
    //.reduce executes a function on each elememt in an array using the result of each function execution for each successive computation. Makes it the perfect candidate for getting a sum of multiple values
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
})


// create the Pizza model using the PizzaShema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;