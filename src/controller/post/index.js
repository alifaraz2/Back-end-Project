import PostModel from "../../model/post/index.js"
import userModel from "../../model/user/index.js"
import Joi from "joi"
const PostController = {
  getAll: async (req, res) => {
    console.log(req.user);
    const data = await PostModel.findAll({
     
      include: [userModel],
    })
    res.json({
      data,
    })
  },
  create: async (req, res) => {
    const payload = req.body
    const UserId = req.user.id;
    console.log(UserId,"this is a authorization")
    const schema = Joi.object({
      title: Joi.string().min(3).max(30),
      description: Joi.string().min(3).max(900),
      // userId: Joi.number().required(),
    })

    const isValidate = schema.validate(payload)
    if (isValidate.error) {
      return res
        .status(400)
        .json({ message: "Invalid data", error: isValidate.error })
    }
    const data = await PostModel.create({
      title: payload.title,
      description: payload.description,
      userId: UserId,
    })
    res.json({
      message: "Post Created",
      data,
    })
  },
  getOnePost: async (req, res) => {
    try {
        const post_id = req.params.post_id;

        const post = await PostModel.findByPk(post_id);
        if (!post) {
          return res.status(404).json({
            message: "No post found",
          });
        }
      res.json({
        post,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something bad happened to server",
      });
    }
  },
  updatePost: async (req, res) => {
    try {
      const post_id = req.params.post_id;

      const post = await PostModel.findByPk(post_id);
      if (!post) {
        return res.status(404).json({
          message: "No post found",
        });
      }

      
      post.title = req.body.title;
     

      await post.save();

      res.json({
        post,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something bad happened to server",
      });
    }
  },
}

export default PostController
