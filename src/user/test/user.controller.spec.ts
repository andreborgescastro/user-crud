import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { UserRepository } from '../user.repository';
import { UserRepositoryMock } from './mocks/user.repository.mock';
import { AddressService } from './../../address/address.service';
import { AddressServiceMock } from './mocks/address.service.mock';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './../../auth/auth.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getUsers: jest.fn(),
            createUser: jest.fn(),
            getUser: jest.fn(),
            updateUser: jest.fn(),
            destroy: jest.fn(),
          },
        },
        { provide: UserRepository, useValue: UserRepositoryMock },
        { provide: AddressService, useValue: AddressServiceMock },
        { provide: JwtService, useValue: () => {} },
        { provide: AuthService, useValue: () => {} },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller.create).toBeDefined();
    expect(controller.findAll).toBeDefined();
    expect(controller.findOne).toBeDefined();
    expect(controller.update).toBeDefined();
    expect(controller.remove).toBeDefined();
  });

  describe('findAll', () => {
    it('should call userService.getUsers', () => {
      controller.findAll();
      expect(userService.getUsers).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should call userService.createUser with provided data', () => {
      const userDTO = {
        nome: 'Mrs. Robinson',
        cpf: '001231237987',
        data_nascimento: '25/08/1982',
        endereco: {
          rua: 'Avenida Carlos Gurgel do Santos',
          numero: '369',
          bairro: 'Jardim Europa',
          complemento: 'Sem complemento',
          cep: '85613-652',
        },
      };
      const headers = {
        authorization: 'Bearer ',
      };

      controller.create(userDTO, headers);
      expect(userService.createUser).toHaveBeenCalledWith(userDTO, headers);
    });
  });

  describe('findOne', () => {
    it('should call userService.getUser with provided id', () => {
      const id = '1';

      controller.findOne(id);
      expect(userService.getUser).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should call userService.updateUser with provided id and data', () => {
      const id = '1';
      const updateUserDto = {
        nome: 'Jhon Jones',
        cpf: '001231237987',
        data_nascimento: '25/08/1982',
        endereco: {
          rua: 'Avenida Carlos Gurgel do Santos',
          numero: '369',
          bairro: 'Jardim Europa',
          complemento: 'Sem complemento',
          cep: '85613-652',
        },
      };

      controller.update(id, updateUserDto);
      expect(userService.updateUser).toHaveBeenCalledWith(id, updateUserDto);
    });
  });

  describe('remove', () => {
    it('should call userService.destroy with provided id and headers', () => {
      const id = '1';
      const headers = {
        authorization: 'Bearer ',
      };

      controller.remove(id, headers);
      expect(userService.destroy).toHaveBeenCalledWith(id, headers);
    });
  });
});
