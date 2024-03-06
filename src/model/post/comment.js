import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import PostModel from "./index.js";
import userModel from "../user/index.js";
const commentModel = sequelize.define(
    "comment",
    {
      comments: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      paranoid: true,
    }
  );

  PostModel.hasMany(commentModel);
  commentModel.belongsTo(PostModel);

  userModel.hasMany(commentModel);
  commentModel.belongsTo(userModel);

  export default commentModel;