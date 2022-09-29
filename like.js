// import du model Sauce
const Sauce = require('../models/Sauce');

/*
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

            // like = 1 (like +1)
            // méthode js include pour vérifier si id de l'utilisateur se trouve dans le tableau
            // si le usersLiked est FALSE et si like === 1 
            if (!sauce.usersLiked.includes(req.body.userId) && req.body.likes === 1) {
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
            // like = 0
            if (sauce.usersLiked.includes(req.body.userId) && req.body.likes === 0) {
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
            // like = -1 (dislikes = +1)
            if (!sauce.usersDisliked.includes(req.body.userId) && req.body.likes === -1) {
                Sauce.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { dislikes: 1 }, // $inc = pour incrémenter un champ
                        $push: { usersDisliked: req.body.userId } // permet d'ajouter une valeur spécifiée à un tableau
                    }
                )
                    .then(() => res.status(201).json({ message: "Un dislike de plus pour la sauce !" })) // created
                    // error bad request
                    .catch(error => res.status(400).json({ error }))
            };
            // dislike = 0 (pas de vote)
            if (sauce.usersDisliked.includes(req.body.userId) && req.body.likes === 0) {
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
        })

        .catch(error => res.status(404).json({ error }));

};
*/


// avec le switch case
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
            switch (req.body.likes) {
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
                    }
                    break;

                // like = -1 (dislikes = +1)
                case -1:
                    if (!sauce.usersDisliked.includes(req.body.userId)) {
                        Sauce.updateOne(
                            { _id: req.params.id },
                            {
                                $inc: { dislikes: 1 }, // $inc = pour incrémenter un champ
                                $push: { usersDisliked: req.body.userId } // permet d'ajouter une valeur spécifiée à un tableau
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