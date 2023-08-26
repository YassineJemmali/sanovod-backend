const express = require("express");
const {
  creerPermissionAction,
  tousPermissionsAction,
  supprimerPermissionAction,
  majPermissionAction,
} = require("./userRolesPermissionsController"); // Assurez-vous d'importer correctement vos contrôleurs de permissions d'action

const router = express.Router();

router.post("/", creerPermissionAction);
router.get("/", tousPermissionsAction);
router.delete("/:id", supprimerPermissionAction);
router.put("/:id", majPermissionAction);

module.exports = router;
