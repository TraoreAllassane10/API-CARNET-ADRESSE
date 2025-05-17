const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contact.routes');
const userRoutes = require('./routes/user.routes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/carnet-adresses');

app.use('/contacts', contactRoutes);
app.use('/users', userRoutes);

app.use((req, res) => {
    res.status(404).send('Page introuvable');
})

app.listen(3000, () => {
    console.log(`L'application est lancée sur http://localhost:3000`)
})