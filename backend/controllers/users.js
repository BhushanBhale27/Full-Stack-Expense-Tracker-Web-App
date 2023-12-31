const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function isstringinvalid(string) {
  if (string == undefined || string.length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("email", email);
    if (
      isstringinvalid(name) ||
      isstringinvalid(email || isstringinvalid(password))
    ) {
      return res
        .status(400)
        .json({ err: "Bad parameters . Something is missing" });
    }
    const salt = 11;
    bcrypt.hash(password, salt, async (err, hash) => {
      console.log(err);
      await User.create({ name, email, password: hash });
      res.status(201).json({ message: "Successfuly create new user" });
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const generateAccessToken = (id, name) => {
  return jwt.sign({ userId: id, name: name }, "secretkey");
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (isstringinvalid(email) || isstringinvalid(password)) {
      return res
        .status(400)
        .json({ message: "Email or password is missing", success: false });
    }

    const user = await User.findAll({ where: { email } });

    if (user) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (err) {
          throw new Error("Something went wrong");
        }
        if (result === true) {
          return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: generateAccessToken(user[0].id, user[0].name),
          });
        } else {
          return res
            .status(400)
            .json({ success: false, err: "Password is incorrect" });
        }
      });
    } else {
      return res
        .status(404)
        .json({ success: false, err: "User Doesnot exitst" });
    }
  } catch (error) {
    res.status(500).json({ message: error, success: false });
  }
};
