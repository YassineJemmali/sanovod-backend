const Platforme = require("./plateformesSchema");
const asyncHandler = require("express-async-handler");

// zidPlatforme

const zidPlateforme = asyncHandler(async (req, res) => {
  const { unePlateforme, logoPlateforme } = req.body;

  const zidPlateforme = await Platforme.create({
    unePlateforme,
    logoPlateforme,
  });

  if (zidPlateforme) {
    res.status(201).json({
      _id: zidPlateforme._id,
      unePlateforme: zidPlateforme.unePlateforme,
      logoPlateforme: zidPlateforme.logoPlateforme,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Facture data");
  }
});

// hetLesPlatformes

const hetLesPlatformes = asyncHandler(async (req, res) => {
  const lesPlatformes = await Platforme.find();
  res.status(200).json(lesPlatformes);
});

// supprimer une plateforme
const supprimerPlatforme = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const plateforme = await Platforme.findOneAndDelete({ _id: id });

  if (plateforme) {
    res.status(200).json({ message: "Plateforme supprimée avec succès" });
  } else {
    res.status(404);
    throw new Error("Plateforme non trouvée");
  }
});

// mettre à jour
const mettreAPlatforme = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { unePlateforme, logoPlateforme } = req.body;

  const updatedPlateforme = await Platforme.findOneAndUpdate(
    { _id: id },
    { unePlateforme, logoPlateforme },
    { new: true }
  );

  if (updatedPlateforme) {
    res.status(200).json({
      _id: updatedPlateforme._id,
      unePlateforme: updatedPlateforme.unePlateforme,
      logoPlateforme: updatedPlateforme.logoPlateforme,
    });
  } else {
    res.status(404);
    throw new Error("Plateforme non trouvé");
  }
});

module.exports = {
  zidPlateforme,
  hetLesPlatformes,
  supprimerPlatforme,
  mettreAPlatforme,
};
