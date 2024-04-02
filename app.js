const express = require('express');
const mongoose = require('mongoose');

const bookRoute = require('./routes/library/books');
const themeRoute = require('./routes/library/themes');
const studentRoute = require('./routes/students');

mongoose.connect('mongodb://localhost/materDei')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use('/api/books', bookRoute);
app.use('/api/themes', themeRoute);
app.use('/api/students', studentRoute);

app.listen(PORT, () => {
    console.log('App running on http://localhost:' + PORT);
});