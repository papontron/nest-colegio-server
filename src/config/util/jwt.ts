import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import assert from 'assert';
import { UserID, TokenPayload } from '../types/jwt';
import { JWT_DURATION, JWT_ISSUER } from '../var/jwt';
import { ObjectId } from 'mongodb';

config();

const JWT_SECRET = process.env.JWT_SECRET;

export const signToken = (payload: { _id: ObjectId }) => {
  return jwt.sign(payload, JWT_SECRET!, { expiresIn: JWT_DURATION, issuer: JWT_ISSUER });
};

export const verifyToken = (token: string): UserID => {
  const payload = jwt.verify(token, JWT_SECRET!) as TokenPayload;
  assert(payload, 'token inválido');
  return payload._id;
};
