import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import PostModel from "../post/index.js";

const likesModel = sequelize.define(
    "likes",
    {
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      
    },
    {
      paranoid: true,
    }
  );
  PostModel.hasMany(likesModel);
  likesModel.belongsTo(PostModel);
  
  export default likesModel;
  