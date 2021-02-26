// connect to the Pizza model
const { Pizza } = require('../models');

const pizzaController = {
    // the functions will go in here as methods
    // get all pizzas
    // serves as a callback function for the GET /api/pizzas route.
    getAllPizza(req, res) {
        Pizza.find({})
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
            console.log(err);
            res.status(400).json(err);
            });
    },

    // get one pizza by id
    // we destructure the params.id out of the object
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
            .then(dbPizzaData => {
                // If no pizza is found, send 404
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pissa found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create a pizza
    // we destructure the body out of the Express.js req object because we don't need to interface with any of the other data it provides
    createPizza({ body }, res) {
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.status(404).json(err));
    },

    // update pizza by id
    // mongoose finds a single document we want to update, then updates it and returns the updated document
    // new:true returns the updated document, without it, it will return the original document.
    // by setting it to "true", we are instructing Mongoose to return the new verson of the document.
    updatePizza({ params, body }, res) {
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: "No pizza found with this id!" });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete pizza
    // .findOneAndDelete - finds the document to be returned and also delete it from the database
    
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pissa found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    }
};

//export the pizzaController
module.exports = pizzaController;