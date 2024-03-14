import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller.create).toBeDefined();
    expect(controller.findAll).toBeDefined();
    expect(controller.findOne).toBeDefined();
    expect(controller.update).toBeDefined();
    expect(controller.remove).toBeDefined();
  });
});
