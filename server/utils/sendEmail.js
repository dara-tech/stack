import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Verification from "../models/emailVerification.js";
import { generateOTP, hashString } from "./index.js";

dotenv.config();

const { AUTH_EMAIL, AUTH_PASSWORD } = process.env;

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASSWORD,
  },
});

export const sendVerificationEmail = async (user, res, token) => {
  const { _id, email, name } = user;
  const otp = generateOTP();

  const currentYear = new Date().getFullYear();

  // mail options
  const mailOptions = {
    from: AUTH_EMAIL,
    to: email,
    subject: "Email Verification",
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; color: #333;">
        <div style="padding: 20px; background-color: #f7f7f7; border-radius: 10px;">
          <div style="background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #0838bc; text-align: center;">Please Verify Your Email Address</h2>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <h4>Hi, ${name},</h4>
            <p style="font-size: 16px;">
              To complete your registration, please verify your email address using the OTP below:
            </p>
            <div style="text-align: center; margin: 20px 0;">
              <span style="font-size: 24px; font-weight: bold; color: #0838bc; background-color: #e0e7ff; padding: 10px 20px; border-radius: 5px;">${otp}</span>
            </div>
            <p style="font-size: 16px; text-align: center;">
              This OTP <b>expires in 2 minutes</b>.
            </p>
            <div style="margin-top: 20px; text-align: center;">
              <p>Regards,</p>
              <p><b>Dara Blog Team</b></p>
            </div>
            <div style='margin-top: 20px; text-align: center;'>
              <p style='font-size: 14px;'>© ${currentYear} Dara <span style='font-weight: bold; border-radius: 5px; padding: 0 5px; color: #fff; background: linear-gradient(to right, indigo, purple, pink);'>Blog</span>. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>`,
  };

  try {
    const hashedToken = await hashString(String(otp));

    const newVerifiedEmail = await Verification.create({
      userId: _id,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 120000,
    });

    if (newVerifiedEmail) {
      await transporter.sendMail(mailOptions);
      res.status(201).send({
        success: "PENDING",
        message: "OTP has been sent to your account. Check your email and verify your email.",
        user,
        token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};
