import { Router } from "express"
import userController from "../../controller/user/index.js"
import AuthMiddleware from "../../middleware/authMiddleware.js"
const userRoutes = Router()
userRoutes.get("/user", AuthMiddleware, userController.get)
userRoutes.post("/user", AuthMiddleware, userController.post)
userRoutes.get("/user/:user_id", AuthMiddleware, userController.getOneUser)
userRoutes.put("/user/:user_id", AuthMiddleware, userController.updateUser)
userRoutes.post("/user/:user_id/follow", AuthMiddleware, userController.follow)
userRoutes.get(
  "/user/:user_id/follow",
  AuthMiddleware,
  userController.getFollowerPosts
)
export default userRoutes
