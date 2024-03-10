import userModel from "../../model/user/index.js"
import ContactModel from "../../model/user/contact.js"
import userFollowerModel from "../../model/user/userFollowers.js"
import PostModel from "../../model/post/index.js"
import Joi from "joi"
const userController = {
  post: async (req, res) => {
    try {
      const payload = req.body
      let check = await userModel.findOne({
        where: {
          email: payload.email,
        },
      })
      if (check) {
        return res.status(400).json({
          message: "user with this email already exists",
        })
      }
      check = await userModel.findOne({
        where: {
          username: payload.username,
        },
      })
      if (check) {
        return res.status(400).json({
          message: "user with this username already exists",
        })
      }
      const schema = Joi.object({
        firstName: Joi.string().min(3).max(30).required(),
        lastName: Joi.string().min(3).max(900),
        email: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().min(3).max(900),
        phone:Joi.string().min(3).max(900),
      })
  
      const isValidate = schema.validate(payload)
      if (isValidate.error) {
        return res
          .status(400)
          .json({ message: "Invalid data", error: isValidate.error })
      }
      const user = new userModel()
      user.firstName = payload.firstName
      user.lastName = payload.lastName
      user.email = payload.email
      user.username = payload.username
      user.password = payload.password
      await user.save()
      await ContactModel.create({
        phone: payload.phone,
        mobile: payload.mobile,
        userId: user.id,

      
      })
      
      res.json({
        message: "this is a post user",
        user,
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: "Something bad happened to server",
      })
    }
  },
  get: async (req, res) => {
    try {
      const user = await userModel.findAll({
        include: [ContactModel],
      })
      res.json({
        students,
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: "Something bad happened to server",
      })
    }
  },
  getOneUser: async (req, res) => {
    try {
      const user_id = req.params.user_id;

      const user = await userModel.findByPk(user_id, {
        include: [ContactModel, PostModel],
      });


      if (!user) {
        return res.status(404).json({
          message: "No user found",
        });
      }
      
      res.json({
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something bad happened to server",
      });
    }
  },
  updateUser: async (req, res) => {
    try {
      const user_id = req.params.user_id;
       const payload=req.body;
      const user = await userModel.findByPk(user_id);
      if (!user) {
        return res.status(404).json({
          message: "No user found",
        });
      }
      const schema = Joi.object({
        firstName: Joi.string().min(3).max(30).required(),
        lastName: Joi.string().min(3).max(900),
        email: Joi.string(),
        username: Joi.string(),
        password: Joi.string().min(3).max(900),
        phone:Joi.string().min(3).max(900),
      })
  
      const isValidate = schema.validate(payload)
      if (isValidate.error) {
        return res
          .status(400)
          .json({ message: "Invalid data", error: isValidate.error })
      }
      user.firstName = payload.firstName
      user.lastName = payload.lastName
      user.email = payload.email
      user.username = payload.username
      user.password = payload.password
      await user.save()
      await ContactModel.create({
        phone: payload.phone,
        mobile: payload.mobile,
        userId: user.id,

      
      })
      

      res.json({
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something bad happened to server",
      });
    }
  },
  
  getFollowerPosts: async (req, res) => {
    try {
      const user_id = req.params.user_id;

      const followedUsers = await userFollowerModel.findAll({
        where: {
          FollowerId: user_id,
        },
        attributes: ['FolloweeId'], 
      });

      
      const followedUserIds = followedUsers.map(user => user.FolloweeId);

      const posts = await PostModel.findAll({
        where: {
          userId: followedUserIds,
        },
        include: [userModel], 
      });

      res.json({
        posts,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something bad happened to server",
      });
    }
  },

  follow: async (req, res) => {
    try {
      const user_id = req.params.user_id;
      const followerID = req.body.followerID;

      const user = await userFollowerModel.create({
        FolloweeId: user_id,
        FollowerId: followerID,
      });

      res.json({
        Message: "User followed",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something bad happened to server",
      });
    }
  },
}
export default userController
