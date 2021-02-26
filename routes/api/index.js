// connect to express router
const router = require('express').Router();
//connect to pizza routes
const pizzaRoutes = require('./pizza-routes');

// add prefix of '/pizzas' to routes created in 'pizza-routes.js'
router.use('/pizzas', pizzaRoutes);

//export the router
module.exports = router;