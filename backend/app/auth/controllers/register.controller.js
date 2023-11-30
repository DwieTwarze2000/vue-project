import bcrypt from 'bcrypt';
import User from '../schemas/user.schema';
import _ from 'lodash';

export const registerController = async (req, res) => {
  const { login, password, mainPhoneNumber } = req.body;
  const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
  try {
    const user = await User.create({
      login,
      password: hashedPassword,
      mainPhoneNumber,
    });

    return res
      .status(200)
      .json(_.omit(user.toObject(), ['password', 'tokenHash']));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
