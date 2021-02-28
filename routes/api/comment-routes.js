// connect to the express Router
const router = require('express').Router();
// connect to the comment controllers
const { 
    addComment, 
    removeComment,
    addReply,
    removeReply
} = require('../../controllers/comment-controller');

// /api/comments/:pizzaId
router.route('/:pizzaId')
    .post(addComment);

// /api/comments/pizzaId/commentId
router.route('/:pizzaId/:commentId')
    .put(addReply)
    .delete(removeComment);

// remove the reply to the comment
// "Go to this pizza, then look at this particular comment, then delete this one reply."
router.route('/:pizzaId/:commentId/:replyId')
    .delete(removeReply);

module.exports = router;