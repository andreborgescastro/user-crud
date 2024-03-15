import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserRepository } from '../user.repository';
import { UserRepositoryMock } from './mocks/user.repository.mock';
import { AddressServiceMock } from './mocks/address.service.mock';
import { AddressService } from './../../address/address.service';
import { AuthService } from './../../auth/auth.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: UserRepositoryMock,
        },
        {
          provide: AddressService,
          useValue: AddressServiceMock,
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
});
