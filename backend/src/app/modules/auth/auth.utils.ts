import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import { IJwtPayload } from './auth.interface';

export const createToken = (
  jwtPayload: IJwtPayload,
  secret: Secret,
  expiresIn: string,
) => {
  if (!secret) {
    throw new Error('JWT secret is required');
  }

  return jwt.sign(jwtPayload, secret, { expiresIn } as SignOptions);
};

export const verifyToken = (token: string, secret: Secret) => {
  if (!secret) {
    throw new Error('JWT secret is required');
  }

  return jwt.verify(token, secret) as JwtPayload;
};
