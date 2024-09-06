import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

// Extend the Express Request interface to include userId
interface AuthenticatedRequest extends Request {
  userId?: string;
}

// Define the expected shape of the JWT payload
interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

const auth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Ensure JWT_SECRET is available
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables.');
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as CustomJwtPayload;

    // Attach the userId to the request object
    req.userId = decoded.userId;

    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export default auth;
