import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log('Decoded JWT payload:', decoded);

      const userId = decoded.id || decoded._id;

      if (!userId) {
        console.log('User ID missing in token payload');
        return res.status(401).json({ message: 'User ID missing in token' });
      }

      const user = await User.findById(userId).select('-password');

      console.log('User fetched from DB:', user);

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Token verification failed:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    console.log('No authorization token found in headers');
    res.status(401).json({ message: 'No token, authorization denied' });
  }
};
