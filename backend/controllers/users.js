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
        return res.status(201).json({ message: "Successfully created a new user" });
      }
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
