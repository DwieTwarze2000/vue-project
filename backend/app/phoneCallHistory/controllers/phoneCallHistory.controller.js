import PhoneCall from '../schemas/PhoneCall.schema';

export const getPhoneCallHistory = async (req, res) => {
  try {
    const phoneCalls = await PhoneCall.find({ user: req.user._id });
    return res.json(phoneCalls);
  } catch (error) {
    return res.status(404).json({ error: 'Nie znaleziono połączeń.' });
  }
};

export const getTodayPhoneCallAmount = async (req, res) => {
  try {
    const phoneCalls = await PhoneCall.find({
      createdAt: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lt: new Date().setHours(23, 59, 59, 999),
      },
      status: 'ANSWERED',
    });
    return res.json(phoneCalls.length || 0);
  } catch (error) {
    return res.status(404).json({ error: 'Nie znaleziono połączeń.' });
  }
};

export const addPhoneCall = async (req, res) => {
  const { phoneNumber, callDuration, status } = req.body;
  const phoneCall = new PhoneCall({
    phoneNumber,
    callDuration,
    status,
    user: req.user ? req.user._id : null,
  });
  try {
    const savedPhoneCall = await phoneCall.save();
    return res.json(savedPhoneCall);
  } catch (error) {
    return res.status(400).json({ error: 'Nie udało się dodać połączenia.' });
  }
};
