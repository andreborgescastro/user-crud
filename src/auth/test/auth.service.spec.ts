import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, { provide: JwtService, useValue: () => {} }],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('encrypt', () => {
    it('should return a hashed value', async () => {
      const value = 'password';
      const hashedValue = await service.encrypt(value);

      expect(hashedValue).not.toEqual(value);
      expect(typeof hashedValue).toBe('string');
    });
  });

  describe('compareEncrypted', () => {
    it('should return true if the values match', async () => {
      const value = 'password';
      const hashedValue = await bcrypt.hash(value, 10);
      const result = await service.compareEncrypted(value, hashedValue);

      expect(result).toBe(true);
    });

    it('should return false if the values do not match', async () => {
      const value = 'password';
      const hashedValue = await bcrypt.hash('otherpassword', 10);
      const result = await service.compareEncrypted(value, hashedValue);

      expect(result).toBe(false);
    });
  });

  describe('parseJwt', () => {
    it('should parse a valid JWT token', () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMzFjY2U0OC0xNTk3LTQ4YmEtYmE5ZS0yYWNlYWRmMjBjYzEiLCJ1c2VybmFtZSI6InVzdWFyaW8wMSIsImlhdCI6MTcxMDUzNzQ3NiwiZXhwIjoxNzEwNTQxMDc2fQ.f_zAxJQgF-UZFX46Q7HJI9tpftLyiJwfI0p57AoYj_k';
      const result = service['parseJwt'](token);

      expect(result).toEqual({
        username: 'usuario01',
        iat: 1710537476,
        exp: 1710541076,
        sub: '031cce48-1597-48ba-ba9e-2aceadf20cc1',
      });
    });

    it('should throw an error for an invalid JWT token', () => {
      const token = 'invalidtoken';
      expect(() => service['parseJwt'](token)).toThrowError(
        'Não foi possível obter o token do cabeçalho',
      );
    });
  });

  describe('extractUsernameFromHeader', () => {
    it('should extract username from header', () => {
      const header = {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWF0IjoxNjQ1MzUyNzI0LCJleHAiOjE2NDUzNTYzMjR9.uimOqz1N1FtVnS8PMZB9zf9rIB_iHYSjHvMbYU_6ndc',
      };
      const result = service.extractUsernameFromHeader(header);

      expect(result).toEqual('testuser');
    });

    it('should throw an error if no authorization header is provided', () => {
      const header = {};
      expect(() => service.extractUsernameFromHeader(header)).toThrowError(
        'Não foi possível obter o token do cabeçalho',
      );
    });

    it('should throw an error if token is not provided in authorization header', () => {
      const header = { authorization: 'Bearer' };
      expect(() => service.extractUsernameFromHeader(header)).toThrowError(
        'Não foi possível obter o token do cabeçalho',
      );
    });

    it('should throw an error if username is not present in decoded JWT', () => {
      const header = {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDUzNTI3MjQsImV4cCI6MTY0NTM1NjMyNH0.4Cps60cYcy3U2Ibk6x8Eyz8G1z5DEx2CDmIEeap4RCg',
      };
      expect(() => service.extractUsernameFromHeader(header)).toThrowError(
        'Não foi possível identificar o usuário!',
      );
    });
  });
});
