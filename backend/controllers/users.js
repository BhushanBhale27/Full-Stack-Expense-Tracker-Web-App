const User = require("../models/users");

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
    } else {
      // Check if the user already exists by searching for the email
      const existingUser = await User.findOne({ where: { email: email } });
      if (existingUser) {
        return res.status(409).json({ err: "User already exists" });
      } else {
        await User.create({ name, email, password });
        return res
          .status(201)
          .json({ message: "Successfully created a new user" });
      }
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (isstringinvalid(email) || isstringinvalid(password)) {
      return res
        .status(400)
        .json({ message: "Email or password is missing", success: false });
    }

    const user = await User.findOne({ where: { email } });

    if (user) {
      // If the user exists, compare the provided password with the stored password
      if (user.password === password) {
        return res
          .status(200)
          .json({ success: true, message: "User logged in successfully" });
      } else {
        // Incorrect password
        return res
          .status(401)
          .json({ success: false, err: "Email or Password is incorrect" });
      }
    } else {
      // User not found
      return res
        .status(404)
        .json({ success: false, err: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error, success: false });
  }
};
