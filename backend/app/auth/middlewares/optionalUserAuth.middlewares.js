import jwt from 'jsonwebtoken';
import User from '../schemas/user.schema';

export const optionalUserAuthorization = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    req.user = null;
    next();
  } else {
    const token = auth.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        req.user = null;
        next();
      } else {
        const user = await User.findById(decoded._id);
        if (!user) {
          req.user = null;
        } else {
          req.user = user;
        }
        next();
      }
    });
  }
};
