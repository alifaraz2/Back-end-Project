import { DataTypes } from "sequelize"
import sequelize from "../../db/config.js"
import userModel from "./index.js"

const userFollowerModel = sequelize.define(
  "UserFollower",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    paranoid: true,
  }
)

userFollowerModel.belongsTo(userModel, { as: "Follower" })
userFollowerModel.belongsTo(userModel, { as: "Followee" })

userModel.belongsToMany(userModel, {
  through: userFollowerModel,
  as: "Followee",

  foreignKey: "FollowerId",
})
userModel.belongsToMany(userModel, {
  through: userFollowerModel,
  as: "Follower",

  foreignKey: "FolloweeId",
})

export default userFollowerModel
