import sequelize from "../../db/config.js"
import { DataTypes } from "sequelize"
import ContactModel from "./contact.js";
const userModel = sequelize.define(
  "user",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    paranoid: true,
  }
);
userModel.hasOne(ContactModel);
ContactModel.belongsTo(userModel);

export default userModel;
