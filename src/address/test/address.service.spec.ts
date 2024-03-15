import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from '../address.service';
import { AddressRepository } from '../address.repository';
import { AddressRepositoryMock } from './mocks/address.repository.mock';

describe('AddressService', () => {
  let service: AddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: AddressRepository,
          useValue: AddressRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
