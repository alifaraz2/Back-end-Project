
import likesModel from "../model/likes/likes.js"
import commentModel from "../model/post/comment.js"
import PostModel from "../model/post/index.js"

import ContactModel from "../model/user/contact.js"
import userModel from "../model/user/index.js"
import userFollowerModel from "../model/user/userFollowers.js"

const initDB = async () => {
  await userModel.sync({
    alter: true,
    force: false,
  }),
    await ContactModel.sync({
      alter: true,
      force: false,
    }),
    await PostModel.sync({
      alter: true,
      force: false,
    }),
    await commentModel.sync({
      alter: true,
      force: false,
    }),
    await likesModel.sync({
      alter:true,
      force:false
    }),
    await userFollowerModel.sync({
      alter: true,
      force: false,
    })

  
  
}

export default initDB
