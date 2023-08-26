const mongoose = require("mongoose");
const UserRoles = require("./userRolesSchema"); // Assurez-vous d'importer correctement votre schéma de rôles
const asyncHandler = require("express-async-handler");

const creerRole = asyncHandler(async (req, res) => {
  const { leRole, permissions } = req.body; // Remplace roleName par leRole

  const creerRole = await UserRoles.create({
    leRole, // Remplace roleName par leRole
    permissions,
  });

  if (creerRole) {
    res.status(201).json(creerRole);
  } else {
    res.status(400);
    throw new Error("Données de rôle invalides");
  }
});

const tousRoles = asyncHandler(async (req, res) => {
  try {
    const roles = await UserRoles.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({
      message: "Une erreur s'est produite lors de la récupération des rôles.",
    });
  }
});

const supprimerRole = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const role = await UserRoles.findOneAndDelete({ _id: id });

  if (role) {
    res.status(200).json({ message: "Rôle supprimé avec succès" });
  } else {
    res.status(404);
    throw new Error("Rôle non trouvé");
  }
});

const majRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { leRole, permissions } = req.body; // Remplace roleName par leRole

  const roleMisAJour = await UserRoles.findOneAndUpdate(
    { _id: id },
    {
      leRole, // Remplace roleName par leRole
      permissions,
    },
    { new: true }
  );

  if (roleMisAJour) {
    res.status(200).json(roleMisAJour);
  } else {
    res.status(404);
    throw new Error("Rôle non trouvé");
  }
});

module.exports = {
  creerRole,
  tousRoles,
  supprimerRole,
  majRole,
};
