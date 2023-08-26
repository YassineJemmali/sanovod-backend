const express = require("express");
const {
  creerFilm,
  obtenirTousLesFilms,
  lesFilmsPopulate,
  supprimerFilm,
  mettreAJourFilm,
} = require("./filmsControllers");

const router = express.Router();
router.post("/", creerFilm);
router.get("/", obtenirTousLesFilms);
router.get("/pop", lesFilmsPopulate);
router.delete("/:id", supprimerFilm);
router.put("/:id", mettreAJourFilm);

module.exports = router;
