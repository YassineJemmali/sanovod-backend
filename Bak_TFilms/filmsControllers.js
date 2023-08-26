const mongoose = require("mongoose");
const Film = require("./filmsSchema");
const asyncHandler = require("express-async-handler");

const creerFilm = asyncHandler(async (req, res) => {
  const {
    titre,
    description,
    dateSortie,
    annee,
    genre,
    plateformes,
    paysOrigine,
    image,
    bandeAnnonce,
    imdbNote,
    imdbNoteurs,
    imdbLien,
    justWatchNote,
    justWatchNoteurs,
    justWatchLien,
    moyenneNotes,
    moyenneNoteurs,
  } = req.body;

  // Utilisez directement les identifiants hexadécimaux (24 caractères) dans les tableaux
  const nouveauFilm = await Film.create({
    titre,
    description,
    dateSortie,
    annee,
    genre,
    plateformes,
    paysOrigine,
    image,
    bandeAnnonce,
    imdbNote,
    imdbNoteurs,
    imdbLien,
    justWatchNote,
    justWatchNoteurs,
    justWatchLien,
    moyenneNotes,
    moyenneNoteurs,
  });

  if (nouveauFilm) {
    res.status(201).json(nouveauFilm);
  } else {
    res.status(400);
    throw new Error("Données de film invalides");
  }
});

// obtenir tous les films

const obtenirTousLesFilms = asyncHandler(async (req, res) => {
  try {
    const films = await Film.find()
      .populate("genre")
      .populate("paysOrigine")
      .populate("plateformes");
    res.status(200).json(films);
  } catch (error) {
    res.status(500).json({
      message: "Une erreur s'est produite lors de la récupération des films.",
    });
  }
});

// obtenir tous les films

const lesFilmsPopulate = asyncHandler(async (req, res) => {
  try {
    const films = await Film.find()
      .populate("genre")
      .populate("paysOrigine")
      .populate("plateformes");

    res.status(200).json(films);
  } catch (error) {
    res.status(500).json({
      message: "Une erreur s'est produite lors de la récupération des films.",
    });
  }
});

// Supprimer un film

const supprimerFilm = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const film = await Film.findOneAndDelete({ _id: id });

  if (film) {
    res.status(200).json({ message: "Film supprimé avec succès" });
  } else {
    res.status(404);
    throw new Error("Film non trouvé");
  }
});

const mettreAJourFilm = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    titre,
    description,
    dateSortie,
    annee,
    genre,
    plateformes,
    paysOrigine,
    image,
    bandeAnnonce,
    imdbNote,
    imdbNoteurs,
    imdbLien,
    justWatchNote,
    justWatchNoteurs,
    justWatchLien,
    moyenneNotes,
    moyenneNoteurs,
  } = req.body;

  const filmMisAJour = await Film.findOneAndUpdate(
    { _id: id },
    {
      titre,
      description,
      dateSortie,
      annee,
      genre,
      plateformes,
      paysOrigine,
      image,
      bandeAnnonce,
      imdbNote,
      imdbNoteurs,
      imdbLien,
      justWatchNote,
      justWatchNoteurs,
      justWatchLien,
      moyenneNotes,
      moyenneNoteurs,
    },
    { new: true }
  );

  if (filmMisAJour) {
    res.status(200).json(filmMisAJour);
  } else {
    res.status(404);
    throw new Error("Film non trouvé");
  }
});

module.exports = {
  creerFilm,
  obtenirTousLesFilms,
  lesFilmsPopulate,
  supprimerFilm,
  mettreAJourFilm,
};
