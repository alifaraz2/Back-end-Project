import { Router } from "express";
import likeController from "../../controller/like/index.js";


const likeRoutes=Router();
likeRoutes.get('/like/:PostId',likeController.getAllpostlikes)
likeRoutes.get('/like',likeController.getAllLikes)
likeRoutes.post('/like',likeController.postlikes)
export  default likeRoutes