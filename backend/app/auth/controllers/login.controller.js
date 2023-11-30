import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../schemas/user.schema';

export const loginController = async (req, res) => {
  const { login, password } = req.body;
  const user = await User.findOne({ login });

  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
      return res.status(200).json({ token });
    }
  }

  return res.status(400).json({ error: 'Wrong login or password' });
};
