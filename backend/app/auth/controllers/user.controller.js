import User from '../schemas/user.schema';
import bcrypt from 'bcrypt';

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    return res.json(user);
  } catch (error) {
    return res.status(404).json({ error: 'Nie znaleziono użytkownika.' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { oldPassword, newPassword, mainPhoneNumber, phoneNumbers } =
      req.body;
    if (oldPassword && newPassword) {
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (isPasswordValid) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
      } else {
        return res.status(400).json({ error: 'Wrong password' });
      }
    }

    user.mainPhoneNumber = mainPhoneNumber;
    user.phoneNumbers = phoneNumbers;
    await user.save();
    return res.json(user);
  } catch (error) {
    return res.status(404).json({ error: 'Nie znaleziono użytkownika.' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      const deletionResult = await User.deleteOne({ _id: user._id });

      if (deletionResult.deletedCount === 1) {
        return res.status(200).json({ message: 'User has been deleted.' });
      }

      return res.status(500).json({ error: 'Failed to delete user.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete user.' });
  }
};
