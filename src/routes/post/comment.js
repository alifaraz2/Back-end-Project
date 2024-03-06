import { Router } from "express";
import commentController from "../../controller/post/comment.js";

const commentRoutes=Router();

commentRoutes.get("/:PostId/comment",commentController.getpostComment);
commentRoutes.post("/:PostId/comment",commentController.create);
export default commentRoutes;