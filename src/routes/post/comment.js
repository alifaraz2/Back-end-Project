import { Router } from "express";
import commentController from "../../controller/post/comment.js";
import AuthMiddleware from "../../middleware/authMiddleware.js";

const commentRoutes=Router();

commentRoutes.get("/:PostId/comment",AuthMiddleware,commentController.getpostComment);
commentRoutes.post("/:PostId/comment",AuthMiddleware,commentController.create);
export default commentRoutes;