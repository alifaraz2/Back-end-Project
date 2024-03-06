import nodemailer from "nodemailer"

// Function to generate a random OTP
const generateOTP = () => {
  const digits = "0123456789"
  let OTP = ""
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)]
  }
  return OTP
}

// Function to verify OTP
const verifyOTP = (enteredOTP, generatedOTP) => enteredOTP === generatedOTP

const emailController = {
  sendEmail: (req, res) => {
    // Generate OTP
    const otp = generateOTP()

    // Assuming req.body contains the user's email address
    const userEmail = req.body.email

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "9cb57f9a31b206",
        pass: "545b3bc47d244b",
      },
    })

    const mailOptions = {
      from: '"Your Name" <your_email@example.com>',
      to: "<recipient@example.com>",
      subject: "Forgot Password - OTP",
      text: `Your OTP for resetting password is: ${otp}`,
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error)
        res.status(500).json({ error: "Failed to send email" })
      } else {
        console.log("Email sent: ", info.response)
        // Here you might want to store the OTP along with the user's email for verification later
        res.status(200).json({
          message: "Email sent successfully",
          otp: otp, // Sending the OTP back to the client for verification
        })
      }
    })
  },

  verifyOTP: (req, res) => {
    const { enteredOTP, email } = req.body

    // Retrieve the OTP sent to the user's email (you might have stored it in your database or session)
    const generatedOTP = req.body.otp // Assuming you're sending the OTP back to the client for verification

    // Verify the entered OTP
    if (verifyOTP(enteredOTP, generatedOTP)) {
      res.json({ message: "OTP verified successfully" })
    } else {
      res.status(400).json({ error: "Invalid OTP" })
    }
  },
}

export default emailController
