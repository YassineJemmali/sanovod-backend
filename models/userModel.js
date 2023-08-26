const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg",
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserRole",
      default: "64de2190a1eafc00a8569593",
    }, // Ajout du champ de rôle
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
