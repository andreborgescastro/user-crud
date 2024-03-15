import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserRepository } from '../user.repository';
import { AddressService } from './../../address/address.service';
import { AuthService } from './../../auth/auth.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            save: jest.fn(),
            destroy: jest.fn(),
          },
        },
        {
          provide: AddressService,
          useValue: {
            updateAddress: jest.fn(),
            createAddress: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: () => {},
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getBirthdate', () => {
    it('should return birthdate when provided date is valid', () => {
      const date = '01/01/2000';
      const result = service.getBirthdate(date);
      expect(result).toEqual(new Date('2000-01-01T02:00:00.000Z'));
    });

    it('should throw HttpException when provided date is invalid', () => {
      const date = '01/01/invalid';
      expect(() => service.getBirthdate(date)).toThrowError(
        new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message:
              'A data ou formato informado é inválido(Formato aceito: DD/MM/YYYY)',
          },
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });
});
