const express = require('express'); // express pour créer un router
const router = express.Router(); // création du router avec la fonction Router() d'express
const userCtrl = require('../controllers/user');// il nous faut le controller pour associer les fonctions aux différentes routes


// routes POST car frontend envoie des informations (user et mdp)
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);


module.exports = router;// export du router