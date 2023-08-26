const Pays = require("./paysSchema");
const asyncHandler = require("express-async-handler");

// Pour créer un pays
const creerPays = asyncHandler(async (req, res) => {
  const { lePays, leDrapeau } = req.body;

  const nouveauPays = await Pays.create({
    lePays,
    leDrapeau,
  });

  if (nouveauPays) {
    res.status(201).json(nouveauPays);
  } else {
    res.status(400);
    throw new Error("Échec de la création du pays");
  }
});

// Obtenir tous les pays
const obtenirTousLesPays = asyncHandler(async (req, res) => {
  const lesPays = await Pays.find();
  res.status(200).json(lesPays);
});

// Supprimer un pays
const supprimerPays = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const pays = await Pays.findOneAndDelete({
    _id: id,
  }); // Vérifie que l'utilisateur possède le pays avant de le supprimer

  if (pays) {
    res.status(200).json({ message: "Pays supprimé avec succès" });
  } else {
    res.status(404);
    throw new Error("Pays non trouvé");
  }
});

// Mettre à jour un pays
const majPays = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { lePays, leDrapeau } = req.body;

  const paysMaj = await Pays.findOneAndUpdate(
    { _id: id },
    { lePays, leDrapeau },
    { new: true }
  );

  if (paysMaj) {
    res.status(200).json({
      _id: paysMaj._id,
      lePays: paysMaj.lePays,
      leDrapeau: paysMaj.leDrapeau,
      leUtilisateur: paysMaj.leUtilisateur,
    });
  } else {
    res.status(404);
    throw new Error("Pays non trouvé");
  }
});

module.exports = {
  creerPays,
  obtenirTousLesPays,
  supprimerPays,
  majPays,
};
