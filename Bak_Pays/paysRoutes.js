const express = require("express");
const {
  creerPays,
  obtenirTousLesPays,
  supprimerPays,
  majPays,
} = require("./paysControllers");

const router = express.Router();

router.post("/zid", creerPays);
router.get("/lkol", obtenirTousLesPays);
router.delete("/sup/:id", supprimerPays);
router.put("/maj/:id", majPays);

module.exports = router;
