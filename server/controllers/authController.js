import Users from "../models/userModel.js";
import { compareString, createJWT, hashString } from "../utils/index.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";

export const register = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      image,
      accountType,
      provider,
    } = req.body;

    //validate fileds
    if (!(firstName || lastName || email || password)) {
      return res.status(400).json({ success: false, message: "Provide Required Fields!" });
    }

    if (accountType === "Writer" && !image)
      return res.status(400).json({ success: false, message: "Please provide profile picture" });

    const userExist = await Users.findOne({ email });

    if (userExist) {
      return res.status(400).json({ success: false, message: "Email Address already exists. Try Login" });
    }

    const hashedPassword = await hashString(password);

    const user = await Users.create({
      name: firstName + " " + lastName,
      email,
      password: !provider ? hashedPassword : "",
      image,
      accountType,
      provider,
    });

    user.password = undefined;

    const token = createJWT(user?._id);

    //send email verification if account type is writer
    if (accountType === "Writer") {
      sendVerificationEmail(user, res, token);
    } else {
      res.status(201).json({
        success: true,
        message: "Account created successfully",
        user,
        token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const googleSignUp = async (req, res, next) => {
  try {
    const { name, email, image, emailVerified } = req.body;

    const userExist = await Users.findOne({ email });

    if (userExist) {
      return res.status(400).json({ success: false, message: "Email Address already exists. Try Login" });
    }

    const user = await Users.create({
      name,
      email,
      image,
      provider: "Google",
      emailVerified,
    });

    user.password = undefined;

    const token = createJWT(user?._id);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email) {
      return res.status(400).json({ success: false, message: "Please Provide User Credentials" });
    }

    // find user by email
    const user = await Users.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // Google account signed in
    if (!password && user?.provider === "Google") {
      const token = createJWT(user?._id);

      return res.status(201).json({
        success: true,
        message: "Login successfully",
        user,
        token,
      });
    }

    // compare password
    const isMatch = await compareString(password, user?.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    if (user?.accountType === "Writer" && !user?.emailVerified) {
      return res.status(400).json({ success: false, message: "Please verify your email address." });
    }

    user.password = undefined;

    const token = createJWT(user?._id);

    res.status(201).json({
      success: true,
      message: "Login successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
