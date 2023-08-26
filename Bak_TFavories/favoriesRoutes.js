// favoriesRoutes.js

const express = require("express");
const {
  ajouterUtilisateurAuxFavoris,
  supprimerUtilisateurDesFavoris,
} = require("./favoriesControllers");

const router = express.Router();

router.patch("/:filmId/ajouter-a-favoris", ajouterUtilisateurAuxFavoris);
router.patch("/:filmId/suppimer-de-favoris", supprimerUtilisateurDesFavoris);

module.exports = router;
