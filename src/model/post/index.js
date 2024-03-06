import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import userModel from "../user/index.js";
const PostModel = sequelize.define(
    "Post",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(1000),
      },
      image: {
        type: DataTypes.STRING,
        unique: false,
      },
    },
    {
      paranoid: true,
    }
  );
  userModel.hasMany(PostModel);
  PostModel.belongsTo(userModel);
  
  export default PostModel;
  