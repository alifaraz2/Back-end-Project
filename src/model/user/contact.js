import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";

const ContactModel = sequelize.define(
  "Contact",
  {
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING(20),
    },
  },
  {
    paranoid: true,
  }
);

export default ContactModel;
