//connect with mongoose
const mongoose = require('mongoose');
//connect with express
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

// connect with mongoose
// mongoose.connect tells us which database to connect to
// if MONGODB_URI exists then it will connect to that, otherwise it will connect to mongodb://localhost/pizza-hunt
// mongoose will check for the database and create it if it doesn't exist
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pizza-hunt', {
    // configuration option Mongoose asks for more information about.
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// use this to log mongo queries being executed
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
