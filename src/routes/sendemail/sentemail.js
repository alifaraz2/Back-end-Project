import { Router } from "express";
import emailController from "../../controller/sendmail/sentemail.js";


const emailRoutes=Router();
emailRoutes.post("/email",emailController.sendEmail)

export default emailRoutes