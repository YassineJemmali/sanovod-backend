const mongoose = require("mongoose");

const userRolesSchema = new mongoose.Schema(
  {
    leRole: { type: String },
    permissions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "PermissionsAction" },
    ],
  },
  { timestamps: true }
);

const UserRoles = mongoose.model("UserRole", userRolesSchema);

module.exports = UserRoles;
