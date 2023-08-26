const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

// hetLesUtilisateurs

const hetLesUtilisateurs = asyncHandler(async (req, res) => {
  const lesUtilisateurs = await User.find();
  res.status(200).json(lesUtilisateurs);
});

//@desc  UserProfile
//route GET /api/users/profile
//@access Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    image: req.user.image,
    role: req.user.role,
  };

  res.status(200).json({ user });
});

//@desc Register new user
//route POST /api/users
//@access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, image } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    image,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});

//@desc Update User
//route PUT /api/users/profile
//@access Private

// admin mise a jour user

const majUAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, password, image, role } = req.body; // Remplace roleName par leRole

  const userAdminMisAJour = await User.findOneAndUpdate(
    { _id: id },
    {
      name, // Remplace roleName par leRole
      email,
      image,
      password,
      role,
    },
    { new: true }
  );

  if (userAdminMisAJour) {
    res.status(200).json(userAdminMisAJour);
  } else {
    res.status(404);
    throw new Error("Un message");
  }
});

// Profil perso mise a jour user

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.image = req.body.image || user.image;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.image,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

//@desc Authuser
//route POST /api/users/auth
//@access Public

// const authUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email }).populate("role"); // Utilisez populate pour obtenir les détails du rôle
//   if (user && (await user.matchedPassword(password))) {
//     generateToken(res, user._id);
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       // role: user.role, // Gardez l'ID du rôle
//       leRole: user.role.leRole, // Le nom du rôle
//       image: user.image,
//     });

//     // Enregistrer le rôle dans le localStorage
//     // localStorage.setItem("userRole", user.role.leRole);
//   } else {
//     res.status(401);
//     throw new Error("Invalid email or password");
//   }
// });

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).populate("role"); // Utilisez populate pour obtenir les détails du rôle
  if (user && user.password === password) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      leRole: user.role.leRole, // Le nom du rôle
      image: user.image,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc Logout User
//route POST /api/users/logout
//@access Public

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

// supprimer utilisateur
const supprimerUtilisateur = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const utilisateur = await User.findOneAndDelete({ _id: id });

  if (utilisateur) {
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } else {
    res.status(404);
    throw new Error("Film non trouvé");
  }
});

module.exports = {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  hetLesUtilisateurs,
  majUAdmin,
  supprimerUtilisateur,
};
