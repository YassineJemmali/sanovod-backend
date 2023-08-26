const PermissionsAction = require("./userRolesPermissionsSchema");
const asyncHandler = require("express-async-handler");

// Créer une nouvelle permission d'action
const creerPermissionAction = asyncHandler(async (req, res) => {
  const { action } = req.body;

  const nouvellePermissionAction = await PermissionsAction.create({
    action,
  });

  if (nouvellePermissionAction) {
    res.status(201).json({
      _id: nouvellePermissionAction._id,
      action: nouvellePermissionAction.action,
    });
  } else {
    res.status(400);
    throw new Error("Données de permission d'action invalides");
  }
});

// Obtenir toutes les permissions d'action
const tousPermissionsAction = asyncHandler(async (req, res) => {
  const permissionsAction = await PermissionsAction.find();
  res.status(200).json(permissionsAction);
});

// Supprimer une permission d'action
const supprimerPermissionAction = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const permissionAction = await PermissionsAction.findOneAndDelete({
    _id: id,
  });

  if (permissionAction) {
    res
      .status(200)
      .json({ message: "Permission d'action supprimée avec succès" });
  } else {
    res.status(404);
    throw new Error("Permission d'action non trouvée");
  }
});

// Mettre à jour une permission d'action
const majPermissionAction = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { action } = req.body;

  const permissionActionMiseAJour = await PermissionsAction.findOneAndUpdate(
    { _id: id },
    { action },
    { new: true }
  );

  if (permissionActionMiseAJour) {
    res.status(200).json({
      _id: permissionActionMiseAJour._id,
      action: permissionActionMiseAJour.action,
    });
  } else {
    res.status(404);
    throw new Error("Permission d'action non trouvée");
  }
});

module.exports = {
  creerPermissionAction,
  tousPermissionsAction,
  supprimerPermissionAction,
  majPermissionAction,
};
