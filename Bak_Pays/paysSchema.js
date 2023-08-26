const mongoose = require("mongoose");
const utilisateurSchema = require("../models/userModel");

const paysSchema = mongoose.Schema(
  {
    lePays: { type: String, required: true },
    leDrapeau: {
      type: String,
      default:
        "https://img.freepik.com/vecteurs-libre/illustration-du-drapeau-turquie_53876-27134.jpg?size=626&ext=jpg",
    },
    publiePar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: "64e08dd1b443866939c7ae3c",
    },
  },
  {
    toJSON: { virtuals: true },
    toString: { virtuals: true },
    timestamps: true,
  }
);

const PaysSC = mongoose.model("Pays", paysSchema);

module.exports = PaysSC;
