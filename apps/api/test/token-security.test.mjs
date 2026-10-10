import assert from 'node:assert/strict';
import { test } from 'node:test';
import { TokenService } from '../dist/auth/token.service.js';

test('token service verifies signed bearer tokens and rejects tampering', () => {
  process.env.AUTH_TOKEN_SECRET = 'local-test-secret-change-before-production-123456';
  const service = new TokenService();
  const token = service.createAccessToken({
    id: 42,
    tipo: 'profissional',
  });

  const payload = service.verifyAccessToken(token.accessToken);
  assert.equal(payload?.sub, 42);
  assert.equal(payload?.tipo, 'profissional');

  const tampered = `${token.accessToken.slice(0, -3)}abc`;
  assert.equal(service.verifyAccessToken(tampered), null);
});
