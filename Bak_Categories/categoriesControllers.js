const Categorie = require("./categoriesSchema");
const asyncHandler = require("express-async-handler");

// zidCatégorie

const zidCategorie = asyncHandler(async (req, res) => {
  const { categorie } = req.body;

  const zidCategorie = await Categorie.create({
    categorie,
  });

  if (zidCategorie) {
    res.status(201).json({
      _id: zidCategorie._id,
      categorie: zidCategorie.categorie,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Facture data");
  }
});

// hetLesCategories

const hetLesCategories = asyncHandler(async (req, res) => {
  const { categorie } = req.body;

  const lesCategories = await Categorie.find();
  res.status(200).json(lesCategories);
});

// supprimer une catégorie
const supprimerCategorie = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const categorie = await Categorie.findOneAndDelete({ _id: id });

  if (categorie) {
    res.status(200).json({ message: "Catégorie supprimée avec succès" });
  } else {
    res.status(404);
    throw new Error("Catégorie non trouvée");
  }
});

// mettre à jour
const mettreAJourCategorie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { categorie } = req.body;

  const updatedCategorie = await Categorie.findByIdAndUpdate(
    id,
    { categorie },
    { new: true }
  );

  if (updatedCategorie) {
    res.status(200).json({
      _id: updatedCategorie._id,
      categorie: updatedCategorie.categorie,
    });
  } else {
    res.status(404);
    throw new Error("Catégorie non trouvée");
  }
});

module.exports = {
  zidCategorie,
  hetLesCategories,
  supprimerCategorie,
  mettreAJourCategorie,
};
