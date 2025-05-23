const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../model");
const { sendEmail } = require("../config/email");
const { generateToken, tokenForVerify } = require("../utils/token");
const { secret } = require("../config/secret");
const { Op } = require("sequelize");

// register user / sign up
exports.signup = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      res.send({ status: "failed", message: "Email already exists" });
    } else {
      // Hash password
      if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password);
      }
      // Tạo user
      const saved_user = await User.create(req.body);
      // Generate confirmation token
      const token = jwt.sign({ email: saved_user.email }, secret.jwt_secret, { expiresIn: '10m' });
      await saved_user.update({
        confirmation_token: token,
        confirmation_token_expires: new Date(Date.now() + 10 * 60 * 1000),
      });

      // Gửi mail xác thực
      const mailData = {
        from: secret.email_user,
        to: req.body.email,
        subject: "Verify Your Email",
        html: `<h2>Hello ${req.body.name}</h2>
          <p>Verify your email address to complete the signup and login into your <strong>shofy</strong> account.</p>
          <p>This link will expire in <strong> 10 minute</strong>.</p>
          <p style="margin-bottom:20px;">Click this link for active your account</p>
          <a href="${secret.client_url}/email-verify/${token}" style="background:#0989FF;color:white;border:1px solid #0989FF; padding: 10px 15px; border-radius: 4px; text-decoration:none;">Verify Account</a>
          <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at support@shofy.com</p>
          <p style="margin-bottom:0px;">Thank you</p>
          <strong>shofy Team</strong>
        `,
      };
      const message = "Please check your email to verify!";
      sendEmail(mailData, res, message);
    }
  } catch (error) {
    next(error)
  }
};

// Đăng nhập user
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        error: "Please provide your credentials",
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        status: "fail",
        error: "No user found. Please create an account",
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        status: "fail",
        error: "Password is not correct",
      });
    }

    if (user.status !== "active") {
      return res.status(401).json({
        status: "fail",
        error: "Your account is not active yet.",
      });
    }

    const token = generateToken(user);
    const { password: pwd, ...others } = user.toJSON();

    res.status(200).json({
      status: "success",
      message: "Successfully logged in",
      data: {
        user: others,
        token,
      },
    });
  } catch (error) {
    next(error)
  }
};

// Xác nhận email
exports.confirmEmail = async (req, res, next) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ where: { confirmation_token: token } });

    if (!user) {
      return res.status(403).json({
        status: "fail",
        error: "Invalid token",
      });
    }

    const expired = new Date() > new Date(user.confirmation_token_expires);

    if (expired) {
      return res.status(401).json({
        status: "fail",
        error: "Token expired",
      });
    }

    await user.update({
      status: "active",
      confirmation_token: null,
      confirmation_token_expires: null,
    });

    const accessToken = generateToken(user);
    const { password: pwd, ...others } = user.toJSON();

    res.status(200).json({
      status: "success",
      message: "Successfully activated your account.",
      data: {
        user: others,
        token: accessToken,
      },
    });
  } catch (error) {
    next(error)
  }
};

// Quên mật khẩu (gửi mail reset)
exports.forgetPassword = async (req, res, next) => {
  try {
    const { verifyEmail } = req.body;
    const user = await User.findOne({ where: { email: verifyEmail } });
    if (!user) {
      return res.status(404).send({ message: "User Not found with this email!" });
    } else {
      const token = jwt.sign({ email: user.email }, secret.jwt_secret, { expiresIn: '10m' });
      await user.update({
        confirmation_token: token,
        confirmation_token_expires: new Date(Date.now() + 10 * 60 * 1000)
      });
      const body = {
        from: secret.email_user,
        to: verifyEmail,
        subject: "Password Reset",
        html: `<h2>Hello ${verifyEmail}</h2>
          <p>A request has been received to change the password for your <strong>Shofy</strong> account </p>
          <p>This link will expire in <strong> 10 minute</strong>.</p>
          <p style="margin-bottom:20px;">Click this link for reset your password</p>
          <a href=${secret.client_url}/forget-password/${token} style="background:#0989FF;color:white;border:1px solid #0989FF; padding: 10px 15px; border-radius: 4px; text-decoration:none;">Reset Password</a>
          <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at support@shofy.com</p>
          <p style="margin-bottom:0px;">Thank you</p>
          <strong>Shofy Team</strong>
        `,
      };
      const message = "Please check your email to reset password!";
      sendEmail(body, res, message);
    }
  } catch (error) {
    next(error)
  }
};

// Xác nhận đổi mật khẩu khi quên
exports.confirmForgetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const user = await User.findOne({ where: { confirmation_token: token } });

    if (!user) {
      return res.status(403).json({
        status: "fail",
        error: "Invalid token",
      });
    }

    const expired = new Date() > new Date(user.confirmation_token_expires);

    if (expired) {
      return res.status(401).json({
        status: "fail",
        error: "Token expired",
      });
    } else {
      const newPassword = bcrypt.hashSync(password);
      await user.update({
        password: newPassword,
        confirmation_token: null,
        confirmation_token_expires: null,
      });

      res.status(200).json({
        status: "success",
        message: "Password reset successfully",
      });
    }
  } catch (error) {
    next(error)
  }
};

// Đổi mật khẩu
exports.changePassword = async (req, res, next) => {
  try {
    const { email, password, googleSignIn, newPassword } = req.body || {};
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (googleSignIn) {
      const hashedPassword = bcrypt.hashSync(newPassword);
      await user.update({ password: hashedPassword });
      return res.status(200).json({ message: "Password changed successfully" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Incorrect current password" });
    } else {
      const hashedPassword = bcrypt.hashSync(newPassword);
      await user.update({ password: hashedPassword });
      res.status(200).json({ message: "Password changed successfully" });
    }
  } catch (error) {
    next(error)
  }
};

// Cập nhật profile
exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (user) {
      await user.update({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        bio: req.body.bio,
      });
      const token = generateToken(user);
      res.status(200).json({
        status: "success",
        message: "Successfully updated profile",
        data: {
          user: user,
          token,
        },
      });
    }
  } catch (error) {
    next(error)
  }
};

// Đăng ký với Google, Facebook provider
exports.signUpWithProvider = async (req, res, next) => {
  try {
    const userData = jwt.decode(req.params.token);
    const isAdded = await User.findOne({ where: { email: userData.email } });
    if (isAdded) {
      const token = generateToken(isAdded);
      res.status(200).send({
        status: "success",
        data: {
          token,
          user: {
            id: isAdded.id,
            name: isAdded.name,
            email: isAdded.email,
            address: isAdded.address,
            phone: isAdded.phone,
            image_url: isAdded.image_url,
            googleSignIn: true,
          },
        },
      });
    } else {
      const newUser = await User.create({
        name: userData.name,
        email: userData.email,
        image_url: userData.picture,
        status: 'active'
      });

      const token = generateToken(newUser);
      res.status(200).send({
        status: "success",
        data: {
          token,
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            image_url: newUser.image_url,
            googleSignIn: true,
          }
        },
      });
    }
  } catch (error) {
    next(error)
  }
};
