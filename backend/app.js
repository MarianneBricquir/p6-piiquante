const express = require('express');
const mongoose = require('mongoose');

const app = express(); // méthode express qui permet de créer une application express

require("dotenv").config();

// import des routers
const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const path = require('path');


// Connection à la bd sur MongoDB
mongoose.connect(`mongodb+srv://piiquante-user:${process.env.mdp}@cluster0.eriumea.mongodb.net/test`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// CORS - Pour que les utilisateurs puissent réaliser les requêtes nécessaire pour accéder à l'API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// intercepte les req qui contiennent du json lors d'une requête POST réalisée par l'utilisateur
app.use(express.json())

// enregistrement des routes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images'))); // route avec middleware static qui est founri par express. On obtient le chemin complet sur le disque

module.exports = app;