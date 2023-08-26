// favorisController.js

const Film = require("../Bak_TFilms/filmsSchema"); // Assurez-vous d'importer le modèle Film
const asyncHandler = require("express-async-handler");

// Ajouter un utilisateur aux favoris d'un film
const ajouterUtilisateurAuxFavoris = asyncHandler(async (req, res) => {
  const { filmId } = req.params;
  const { userId } = req.body;

  try {
    const film = await Film.findById(filmId);

    if (!film) {
      res.status(404).json({ message: "Film introuvable." });
    } else {
      film.favoris.push(userId);
      await film.save();
      res
        .status(200)
        .json({ message: "Utilisateur ajouté aux favoris avec succès." });
    }
  } catch (error) {
    res.status(500).json({
      message: "Une erreur s'est produite lors de l'ajout aux favoris.",
    });
  }
});

// Supprimer un utilisateur des favoris d'un film
const supprimerUtilisateurDesFavoris = asyncHandler(async (req, res) => {
  const { filmId } = req.params;
  const { userId } = req.body;

  try {
    const film = await Film.findById(filmId);

    if (!film) {
      res.status(404).json({ message: "Film introuvable." });
    } else {
      film.favoris = film.favoris.filter((id) => id.toString() !== userId); // Convertir en chaîne pour la comparaison
      await film.save();
      res
        .status(200)
        .json({ message: "Utilisateur supprimé des favoris avec succès." });
    }
  } catch (error) {
    res.status(500).json({
      message: "Une erreur s'est produite lors de la suppression des favoris.",
    });
  }
});

module.exports = {
  ajouterUtilisateurAuxFavoris,
  supprimerUtilisateurDesFavoris,
};
