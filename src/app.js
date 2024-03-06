import 'dotenv/config'
import express, { json } from "express"
import { connectDB } from "./db/config.js"
import initDB from "./db/init.js"
import userRoutes from "./routes/user/index.js"
import postRoutes from "./routes/post/index.js"
import commentRoutes from "./routes/post/comment.js"
import authRoutes from "./routes/auth/index.js"
import likeRoutes from './routes/likes/index.js'
import emailRoutes from './routes/sendemail/sentemail.js'



const app = express()
connectDB()
initDB().then(() => console.log("db synced"))
app.use(json())

app.use(userRoutes)
app.use(postRoutes)  
app.use(commentRoutes)
app.use(likeRoutes)
app.use(authRoutes)
app.use(emailRoutes)

app.listen(3000, () => {
  console.log(`Example app listening on port`)
})
