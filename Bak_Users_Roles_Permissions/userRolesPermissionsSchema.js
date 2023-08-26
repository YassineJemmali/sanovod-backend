const mongoose = require("mongoose");

const userRolesPermissionsSchema = new mongoose.Schema({
  action: { type: String, required: true },
});

const PermissionsAction = mongoose.model(
  "PermissionsAction",
  userRolesPermissionsSchema
);

module.exports = PermissionsAction;
