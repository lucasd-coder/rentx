import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-Memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUseCase';

let authenticateUseCase: AuthenticateUserUseCase;
let usersRepsositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepsositoryInMemory = new UsersRepositoryInMemory();
    authenticateUseCase = new AuthenticateUserUseCase(usersRepsositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepsositoryInMemory);
  });

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '008123',
      email: 'user@test.com',
      password: '1234',
      name: 'User Test',
    };
    await createUserUseCase.execute(user);

    const result = await authenticateUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate an nonexistent user', () => {
    expect(async () => {
      await authenticateUseCase.execute({
        email: 'false@email.com',
        password: '1234',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '9999',
        email: 'user@user.com',
        password: '1234',
        name: 'User Test Error',
      };

      await createUserUseCase.execute(user);

      await authenticateUseCase.execute({
        email: user.email,
        password: 'incorrectPassword',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
