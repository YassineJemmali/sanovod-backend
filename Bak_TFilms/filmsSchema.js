const mongoose = require("mongoose");
//
const filmSchema = new mongoose.Schema(
  {
    titre: { type: String },
    description: { type: String },
    dateSortie: { type: Date },
    annee: { type: Number }, // Calculer automatiquement à partir de dateSortie
    genre: [{ type: mongoose.Schema.Types.ObjectId, ref: "Categorie" }],
    plateformes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Platforme",
      },
    ],
    paysOrigine: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pays" }],
    image: { type: String }, // Lien ou URL de l'affiche du film
    bandeAnnonce: { type: String }, // Lien ou URL de la bande-annonce du film
    imdbNote: { type: Number, default: 0 },
    imdbNoteurs: { type: Number, default: 0 },
    imdbLien: { type: String },
    justWatchNote: { type: Number, default: 0 },
    justWatchNoteurs: { type: Number, default: 0 },
    justWatchLien: { type: String },
    moyenneNotes: { type: Number, default: 0 },
    moyenneNoteurs: { type: Number, default: 0 },
    favoris: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const FilmSC = mongoose.model("Film", filmSchema);

module.exports = FilmSC;
