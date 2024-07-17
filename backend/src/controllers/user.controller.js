const HttpError = require("../helpers/httpError.helpers");
const Response = require("../helpers/Response.helpers");
const Logger = require("../helpers/logger.helpers");
const { User } = require("../models/user.modal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRECT_KEY = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY;
class UserController {
  /**
   * @desc Create a User
   * @route POST /api/vi/BlogPost
   * @access logged-in user (admin)
   */
  register = async (req, res) => {
    try {
      Logger.info(`Request received by ${req.method} ${req.url}`);

      const { firstName, lastName, email, password } = req.body;

      if (!firstName || !email || !password) {
        throw new HttpError(400, "Invalid submission");
      }

      // Check if user already exists
      const userExist = await User.findOne({ email });
      if (userExist) {
        throw new HttpError(400, "Email already exists");
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = await User.create({
        userInfo: {
          firstName,
          lastName,
        },
        email,
        password: hashedPassword,
      });

      Response(res)
        .status(201)
        .message("User Created")
        .body(await User.findById(user._id).select("-password"))
        .send();
    } catch (error) {
      Logger.error(error.message);

      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  };

  /**
   * @desc Login a User
   * @route POST /api/vi/BlogPost
   * @access logged-in user (admin)
   */

  login = async (req, res) => {
    try {
      Logger.info(`Request received by ${req.method} ${req.url}`);

      const { email, password } = req.body;

      if (!email || !password) {
        throw new HttpError(400, "Invalid submission");
      }

      // Check if user already exists
      const user = await User.findOne({ email });
      if (!user) {
        throw new HttpError(400, "Invalid Email or Password");
      }

      const isPasswordsValid = await bcrypt.compare(password, user.password);
      if (!isPasswordsValid) {
        throw new HttpError(400, "Invalid Email or Password");
      }

      const token = jwt.sign({ userId: user._id }, SECRECT_KEY, {
        expiresIn: JWT_EXPIRY,
        algorithm: "HS256",
      });

      Response(res)
        .status(201)
        .message("Login successful")
        .body({ token })
        .send();
    } catch (error) {
      Logger.error(error.message);

      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  };

  updateUser = async (req, res) => {
    try {
      Logger.info(`Request received by ${req.method} ${req.url}`);

      const { id } = req.params;
      const updatedUser = req.body;
      const user = await User.findByIdAndUpdate(id, { ...updatedUser }, { new: true, runValidators: true });
      if (!user) {
        throw new HttpError(404, "User not found");
      }
      Logger.info(`Updated user ${user}`);
      Response(res)
        .status(200)
        .message(`Updated user`)
        .body({ user })
        .send();
    } catch (error) {
      Logger.error(error.message);

      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  };
}
module.exports.UserController = new UserController();
