const express = require("express");
const {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  hetLesUtilisateurs,
  majUAdmin,
  supprimerUtilisateur,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.get("/", hetLesUtilisateurs);
router.put("/usersadmin/:id", majUAdmin);
router.delete("/:id", supprimerUtilisateur);

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

module.exports = router;
