const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mdp = require('./mdp')

// import des routers
//const saucesRoutes = require('./routes/sauces');
const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const path = require('path');


// Connection à la bd sur MongoDB
mongoose.connect(`mongodb+srv://piiquante-user:${mdp}@cluster0.eriumea.mongodb.net/test`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// intercepte les req qui contiennent du json
app.use(express.json())



// enregistrer les routes ici
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;