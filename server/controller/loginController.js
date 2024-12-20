const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/user")

const validatePassword = async (password, dbpassword) => {
  return await bcrypt.compare(password, dbpassword)
}
const generateJWT = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.jwt_secret_key,
    { expiresIn: '1h' }
  );

}
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Checking user in the database
  const existingUser = await User.findOne({
    $or: [{ username: username }, { email: username }],
    isVerified: true // Ensure the user is verified
  });

  if (!existingUser) return res.status(401).json({ error: 'Invalid credentials or account not verified' });

  // Checking the password
  const result = await validatePassword(password, existingUser.password);
  if (!result) return res.status(401).json({ error: 'Invalid credentials' });

  const data = {
    userId: existingUser._id,
    name: existingUser.username,
    email: existingUser.email
  };

  const jwtToken = generateJWT(existingUser);

  const response = {
    userData: data,
    token: jwtToken
  };

  if (response) res.status(200).json(response);
};
