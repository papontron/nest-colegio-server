import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);
export function getSalt(): string {
  return randomBytes(8).toString('hex');
}
export async function hashPassword(password: string): Promise<string> {
  return ((await scrypt(password, getSalt(), 32)) as Buffer).toString('hex');
}
