// fichier avec la logique métier
// import du fichier du dossier models
const Sauce = require('../models/Sauce');
const fs = require('fs');


// fonction pour la création d'une sauce dans la base (POST)
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    sauce.save()
        .then(() => { res.status(201).json({ message: 'Sauce enregistrée !' }) })
        .catch(error => { res.status(400).json({ error }) })
};

// fonction pour la modification d'une sauce (PUT)
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    delete sauceObject._userId; // mesure de sécurité
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(400).json({ message: "Non-autorisé" });
            } else {
                Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
};

// fonction pour la suppression d'une sauce (DELETE)
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Sauce supprimée !' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

// fonction pour avoir une sauce avec son id (GET)
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

// fonction pour avoir toutes les sauces (GET)
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }))

}


// fonction pour gérer les likes / dislikes (POST)
exports.likeUser = (req, res, next) => {
    // console.log("je suis dans le controller like")
    // affichage du req.body
    //console.log("Contenu req.body - ctrl like")
    //console.log(req.body)
    //console.log("Contenu req.params - ctrl like = id de la sauce")
    //console.log({_id : req.params.id})

    Sauce.findOne(({ _id: req.params.id }))
        .then(sauce => {
            //res.status(200).json(sauce);
            switch (req.body.like) {
                case 1:
                    // like = 1 (like +1)
                    if (!sauce.usersLiked.includes(req.body.userId)) {
                        Sauce.updateOne(
                            { _id: req.params.id },
                            {
                                $inc: { likes: 1 }, // $inc = pour incrémenter un champ
                                $push: { usersLiked: req.body.userId } // permet d'ajouter une valeur spécifiée à un tableau
                            }
                        )
                            .then(() => res.status(201).json({ message: "Un like de plus pour la sauce !" })) // created
                            // error bad request
                            .catch(error => res.status(400).json({ error }))
                    };
                    break;

                // like = -1 (dislikes = +1)
                case -1:
                    if (!sauce.usersDisliked.includes(req.body.userId)) {
                        Sauce.updateOne(
                            { _id: req.params.id },
                            {
                                $inc: { dislikes: 1 },
                                $push: { usersDisliked: req.body.userId }
                            }
                        )
                            .then(() => res.status(201).json({ message: "Un dislike de plus pour la sauce !" })) // created
                            // error bad request
                            .catch(error => res.status(400).json({ error }))
                    }
                    break;

                // like = 0
                case 0:
                    if (sauce.usersLiked.includes(req.body.userId)) {
                        Sauce.updateOne(
                            { _id: req.params.id },
                            {
                                $inc: { likes: -1 }, // $inc = pour incrémenter un champ
                                $pull: { usersLiked: req.body.userId } // permet d'ajouter une valeur spécifiée à un tableau
                            }
                        )
                            .then(() => res.status(201).json({ message: "Un like de moins pour la sauce !" })) // created
                            // error bad request
                            .catch(error => res.status(400).json({ error }))
                    };

                    if (sauce.usersDisliked.includes(req.body.userId)) {
                        Sauce.updateOne(
                            { _id: req.params.id },
                            {
                                $inc: { dislikes: -1 }, // $inc = pour incrémenter un champ
                                $pull: { usersDisliked: req.body.userId } // permet d'ajouter une valeur spécifiée à un tableau
                            }
                        )
                            .then(() => res.status(201).json({ message: "Un dislike de moins pour la sauce !" })) // created
                            // error bad request
                            .catch(error => res.status(400).json({ error }))
                    };
                    break;
            };
        })

        .catch(error => res.status(404).json({ error }));

};