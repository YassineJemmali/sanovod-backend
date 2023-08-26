const mongoose = require("mongoose");

const plateformeSchema = mongoose.Schema(
  {
    unePlateforme: { type: String, required: true },
    logoPlateforme: {
      type: String,
      default:
        "https://img.freepik.com/icones-gratuites/etats-unis-amerique_318-297392.jpg", // URL de l'image par défaut de 50px
    },
  },
  { timestamps: true }
);

const Platforme = mongoose.model("Platforme", plateformeSchema);

module.exports = Platforme;
