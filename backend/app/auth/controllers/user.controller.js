import User from '../schemas/user.schema';

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
    Object.assign(user, req.body);
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
