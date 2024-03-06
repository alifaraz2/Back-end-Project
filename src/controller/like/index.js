import likesModel from "../../model/likes/likes.js"
import PostModel from "../../model/post/index.js"

const likeController = {
   getAllpostlikes: async (req, res) => { 
    try {
      const postId = req.params.PostId;

  
      const existingPost = await PostModel.findByPk(postId);

      if (!existingPost) {
          return res.json({ message: "No Post found" });
      }

  
      const allLikesForPost = await likesModel.findAll({
          where: { PostId: postId },
      });

      res.json({
          message: "Get All Likes for Post",
          likes: allLikesForPost,
      });
  } catch (error) {
      console.log(error);
      res.json({ message: `Server Error = ${error}` });
  }

   },


  getAllLikes: async (req, res) => {
    try {
      const allLikes = await likesModel.findAll({
         include:[PostModel]
      })
        
      res.json({
        message: "Get All Likes",
        likes: allLikes,
      })
    } catch (error) {
      console.log(error)
      res.json({ message: `Server Error = ${error}` })
    }
  },

  postlikes: async (req, res) => {
    const payload = req.body
    const postId = req.body.postId
    const Like = await likesModel.create({
      like: payload.likes,
      PostId: postId,
    })

    res.json({
      message: "post created",
      Like,
    })
  },
}
export default likeController
