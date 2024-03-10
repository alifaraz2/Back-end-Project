import { Router } from "express";
import PostController from "../../controller/post/index.js";
import AuthMiddleware from "../../middleware/authMiddleware.js";

const postRoutes = Router();
postRoutes.get("/post",AuthMiddleware,PostController.getAll);
postRoutes.post("/post", AuthMiddleware,PostController.create);
postRoutes.get("/getOnePost/:post_id",AuthMiddleware, PostController.getOnePost);
postRoutes.put("/updatePost/:post_id",AuthMiddleware, PostController.updatePost);

export default postRoutes;
