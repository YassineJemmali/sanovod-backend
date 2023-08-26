const verifierAutorisation = (permission) => (req, res, next) => {
  if (req.user.permissions.some((p) => p.action === permission)) {
    // L'utilisateur a la permission nécessaire, continuez
    next();
  } else {
    // L'utilisateur n'a pas la permission, renvoyez une réponse d'erreur
    res.status(403).json({ message: "Permission refusée" });
  }
};

// ...

router.delete("/:id", verifierAutorisation("delete"), supprimerFilm);
