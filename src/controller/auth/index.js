import Jwt from "jsonwebtoken"
import userModel from "../../model/user/index.js"
import bcrypt from "bcrypt"
const authController = {
  login: async (req, res) => {
    const payload = req.body
    const user = await userModel.findOne({
      where: {
        email: payload.email,
       
      },
    })
    if (!user) {
      return res.status(401).json({
        message: "invalid credentional",
      })
    }
    const hpassword = user.password
    const password = payload.password
    const result = await bcrypt.compare(password, hpassword)
    console.log(result, "this is a result")

    if (!result) {
      return res.status(401).json({
        message: "invalid credentional",
      })
    }
  
    const data = {
      id: user.id,
      email: user.email,
      name: user.firstName + " " + user.lastName,
    }

    const token = Jwt.sign(
      {
        //exp: Math.floor(Date.now() / 1000) + (60 * 60),
        ...data,
      },
      "secret",
      { expiresIn: "1h" }
    )

    res.json({
      message: "user logged in",
      data,
      token,
    })
  },

  register: async (req, res) => {
    const payload = req.body
    const password = await bcrypt.hash(payload.password, 10)
    console.log(password, "password")
    const user = await userModel.create({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      username: payload.username,
      password: password,
    })
    res.json({
      message: "user register",
    })
  },
}
export default authController
