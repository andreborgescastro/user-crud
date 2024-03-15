import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, { provide: JwtService, useValue: () => {} }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return a token if the credentials are correct', async () => {
      const mockToken = 'mocked_token';
      jest.spyOn(authService, 'signIn').mockResolvedValueOnce(mockToken);

      const signInDto = { username: 'testuser', password: 'testpassword' };
      const result = await controller.login(signInDto);

      expect(authService.signIn).toHaveBeenCalledWith(
        signInDto.username,
        signInDto.password,
      );

      expect(result).toEqual(mockToken);
    });

    it('should throw an error if the credentials are incorrect', async () => {
      const errorMessage = 'Invalid credentials';
      jest
        .spyOn(authService, 'signIn')
        .mockRejectedValueOnce(new Error(errorMessage));

      const signInDto = { username: 'testuser', password: 'testpassword' };

      await expect(controller.login(signInDto)).rejects.toThrowError(
        errorMessage,
      );
    });
  });
});
