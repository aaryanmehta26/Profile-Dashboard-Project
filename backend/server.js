const express = require('express');
const posts = require('./data/posts');
const userRoutes = require('./routes/userRoutes')
const dotenv = require('dotenv');
const connectDataBase = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
// const { authorised } = require('./middlewares/authMiddleware');

const app = express();
dotenv.config();
connectDataBase();
app.use(express.json()); // to request json data from user (request)


/** DUMMY ROUTE FOR TESTING PURPOSES */
app.get('/api/posts', (req, res) => {
    res.send(posts);
})

/** ACTUAL ROUTE HANDLER */
app.use('/api/users', userRoutes);

// adding error middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(9000, console.log(`Server started on PORT ${PORT}`));