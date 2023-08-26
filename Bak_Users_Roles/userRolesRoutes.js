const express = require("express");
const {
  creerRole,
  tousRoles,
  supprimerRole,
  majRole,
} = require("./userRolesControllers"); // Assurez-vous d'importer correctement vos contrôleurs de rôles

const router = express.Router();

router.post("/", creerRole);
router.get("/", tousRoles);
router.delete("/:id", supprimerRole);
router.put("/:id", majRole);

module.exports = router;
