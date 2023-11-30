export const logoutController = async (req, res) => {
  const { user } = req;
  user.tokenHash = null;
  await user.save();
  return res.status(200).json({ message: 'Logout success' });
};
