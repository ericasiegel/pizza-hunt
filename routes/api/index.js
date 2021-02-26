// connect to express router
const router = require('express').Router();
//connect to pizza routes
const pizzaRoutes = require('./pizza-routes');
// connect to the comment routes
const commentRoutes = require('./comment-routes');

// add prefix of '/pizzas' to routes created in 'pizza-routes.js'
router.use('/pizzas', pizzaRoutes);
// add prefix of '/comments' to routes created in 'comment-routes.js'
router.use('/comments', commentRoutes);

//export the router
module.exports = router;