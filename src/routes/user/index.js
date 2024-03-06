import { Router } from "express";
import userController from "../../controller/user/index.js";

const userRoutes=Router();
userRoutes.get("/user",userController.get)
userRoutes.post("/user",userController.post)
userRoutes.post("/user/:user_id/follow", userController.follow);
userRoutes.get("/user/:user_id/follow", userController.getFollowerPosts);
export default userRoutes;