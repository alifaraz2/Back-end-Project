import { Router } from "express";
import likeController from "../../controller/like/index.js";
import AuthMiddleware from "../../middleware/authMiddleware.js";;

const likeRoutes=Router();
likeRoutes.get('/like/:PostId',AuthMiddleware,likeController.getAllpostlikes)
likeRoutes.get('/like',AuthMiddleware,likeController.getAllLikes)
likeRoutes.post('/like',AuthMiddleware,likeController.postlikes)
export  default likeRoutes