import commentModel from "../../model/post/comment.js";
import userModel from "../../model/user/index.js";

const commentController={
    getpostComment: async (req, res) => {
        const params = req.params;
        const allComments = await commentModel.findAll({
          where: {
            PostId: params.PostId,
          },
          include: [userModel],
        });
       
        
        res.json({
          comments: allComments,
        });
      },
    create:async(req,res)=>{
        const params=req.params;
        const payload=req.body;
        const comment= await commentModel.create({
            userId: payload.userId,
            comments: payload.comments,
            
            PostId: params.PostId,
            
        })
       
        res.json({
            
            message:"comments added"
        })
    },
    


};

export default commentController;