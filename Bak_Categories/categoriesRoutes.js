const express = require("express");
const {
  zidCategorie,
  hetLesCategories,
  supprimerCategorie,
  mettreAJourCategorie,
} = require("./categoriesControllers");

const router = express.Router();
router.post("/", zidCategorie);
router.get("/tous", hetLesCategories);
router.delete("/:id", supprimerCategorie);
router.put("/:id", mettreAJourCategorie);

module.exports = router;
