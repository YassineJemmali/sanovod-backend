const mongoose = require("mongoose");
//
const categorieSchema = mongoose.Schema(
  {
    categorie: { type: String, required: true },
  },
  { timestamps: true }
);

const Categorie = mongoose.model("Categorie", categorieSchema);

module.exports = Categorie;
