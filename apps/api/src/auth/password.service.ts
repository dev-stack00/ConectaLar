import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { Injectable } from '@nestjs/common';

const scryptAsync = promisify(scrypt);
const keyLength = 64;

@Injectable()
export class PasswordService {
  async hash(password: string): Promise<string> {
    const salt = randomBytes(16);
    const derivedKey = (await scryptAsync(password, salt, keyLength)) as Buffer;
    return `scrypt$${salt.toString('base64url')}$${derivedKey.toString('base64url')}`;
  }

  async verify(password: string, storedHash: string): Promise<boolean> {
    const parts = storedHash.split('$');
    if (parts.length !== 3 || parts[0] !== 'scrypt') {
      return false;
    }

    const saltPart = parts[1];
    const keyPart = parts[2];
    if (saltPart === undefined || keyPart === undefined) {
      return false;
    }

    const salt = Buffer.from(saltPart, 'base64url');
    const expectedKey = Buffer.from(keyPart, 'base64url');
    const actualKey = (await scryptAsync(password, salt, keyLength)) as Buffer;
    return (
      expectedKey.length === actualKey.length &&
      timingSafeEqual(expectedKey, actualKey)
    );
  }
}
