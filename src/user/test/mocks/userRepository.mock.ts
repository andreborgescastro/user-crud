export class UserRepositoryMock {
  // Mock dos métodos do repositório
  findAll = jest.fn();
  findOne = jest.fn();
  create = jest.fn();
  update = jest.fn();
  destroy = jest.fn();
}
