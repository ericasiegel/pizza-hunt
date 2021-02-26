// connect to the express router
const router = require('express').Router();

// desctructure the names out of the imported object and use them directly
const {
    getAllPizza,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza
} = require('../../controllers/pizza-controller');

// set up GET all and POST at /api/pizzas
router
    .route('/')
    // provide the name o the controller method as the callback
    // it is why we set up the methods with (req, res)
    .get(getAllPizza)
    .post(createPizza);

// set up GET one, PUT, and DELETE at /api/pizzas/:id
router
    .route('/:id')
    .get(getPizzaById)
    .put(updatePizza)
    .delete(deletePizza);

module.exports = router;