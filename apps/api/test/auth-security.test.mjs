import assert from 'node:assert/strict';
import { test } from 'node:test';
import { PasswordService } from '../dist/auth/password.service.js';

test('password service stores scrypt hashes instead of plain text', async () => {
  const service = new PasswordService();
  const password = 'SenhaSegura123';

  const hash = await service.hash(password);

  assert.notEqual(hash, password);
  assert.match(hash, /^scrypt\$/);
  assert.equal(await service.verify(password, hash), true);
  assert.equal(await service.verify('senha-errada', hash), false);
});
