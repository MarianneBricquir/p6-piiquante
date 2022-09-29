// fichier avec uniquement la logique de routine
// création d'un router
const express = require('express');
const router = express.Router();


const sauceCtrl = require('../controllers/sauces');
//const likeCtrl = require('../controllers/like');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// route post pour enregistrer un nouvel objet dans la BD
router.post('/', auth, multer, sauceCtrl.createSauce);
// route put pour permettre la modification d'un objet
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
// route delete pour permettre la suppression d'un objet
router.delete('/:id', auth, sauceCtrl.deleteSauce);
// route get pour récupérer un article spécifique
router.get('/:id', auth, sauceCtrl.getOneSauce );
// route get pour récupérer tous les sauces
router.get('/', auth, sauceCtrl.getAllSauces );
// route pour la gestion des likes/dislikes
router.post('/:id/like', auth, sauceCtrl.likeUser);


// export du router de ce fichier là
module.exports = router;