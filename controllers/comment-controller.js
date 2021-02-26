// connect to the Comment and Pizza models
const { Comment, Pizza } = require('../models');

const commentController = {
    // add a comment to pizza
    addComment({ params, body }, res) {
        console.log(body);
        Comment.create(body)
            .then(({ _id }) => {
                return Pizza.findOneAndUpdate(
                    { _id: params.pizzaId },
                    // adds the comment's _id to the specific pizza we want to update
                    // all the MongoDB-based functions like $push start with a $
                    // when you add data into a nested array of a MongoDB document, they become what is known as a "nested document" or "subdocument"
                    { $push: { comments: _id } },
                    { new: true } //update existing document
                );
            })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));
    },

    // remove comment
    // first we will delete the comment then remove it's _id from the associated pizza
    removeComment({ params }, res) {
        // delete the comment
        // .findOneAndDelete deletes the document while returning its data
        Comment.findOneAndDelete({ _id: params.commentId })
            .then(deletedComment => {
                if (!deletedComment) {
                    return res.status(404).json({ message: 'No comment with this id!' });
                }
                // remove the comment from the pizza
                return Pizza.findOneAndUpdate(
                    { _id: params.pizzaId },
                    // Mongo $pull operation is used to identify and remove the comment from the associated pizza
                    { $pull: { comments: params.commentId } },
                    // then we return the updated pizza data, now without the _id of the comment in the Comments array, and return it to the user.
                    { new: true }
                );
            })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));
    }
};

module.exports = commentController;