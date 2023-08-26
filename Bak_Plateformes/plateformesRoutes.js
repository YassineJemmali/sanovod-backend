const express = require("express");
const {
  zidPlateforme,
  hetLesPlatformes,
  supprimerPlatforme,
  mettreAPlatforme,
} = require("./plateformesControllers");

const router = express.Router();
router.post("/", zidPlateforme);
router.get("/", hetLesPlatformes);
router.delete("/:id", supprimerPlatforme);
router.put("/:id", mettreAPlatforme);

module.exports = router;
