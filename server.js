const express = require("express");
const dotenv = require("dotenv");
const { connectDb } = require("./Config/db");

// import les routes
const userRoutes = require("./routes/userRoutes");
const categoriesRoutes = require("./Bak_Categories/categoriesRoutes");
const plateformesRoutes = require("./Bak_Plateformes/plateformesRoutes");
const paysRoutes = require("./Bak_Pays/paysRoutes");
const filmsRoutes = require("./Bak_TFilms/filmsRoutes");
const userRolesRoutes = require("./Bak_Users_Roles/userRolesRoutes");
const userRolesRoutesPermissions = require("./Bak_Users_Roles_Permissions/userRolesPermissionsRoutes");
const favoriesRoutes = require("./Bak_TFavories/favoriesRoutes");

const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
dotenv.config();
connectDb();

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// use api de router (déclaration du chemin)
app.use("/api/users", userRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/plateformes", plateformesRoutes);
app.use("/api/pays", paysRoutes);
app.use("/api/films", filmsRoutes);

app.use("/api/roles", userRolesRoutes);
app.use("/api/permissions", userRolesRoutesPermissions);
app.use("/api/favories", favoriesRoutes);

app.use(notFound);
app.use(errorHandler);

// écoute du port
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
