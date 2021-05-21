import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-Memory/UsersRepositoryInMemory';
import { UsersTokenRepositoryInMemory } from '@modules/accounts/repositories/in-Memory/UsersTokenRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUseCase';

let authenticateUseCase: AuthenticateUserUseCase;
let usersRepsositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepsositoryInMemory = new UsersRepositoryInMemory();
    usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUseCase = new AuthenticateUserUseCase(
      usersRepsositoryInMemory,
      usersTokenRepositoryInMemory,
      dateProvider,
    );
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

  it('should not be able to authenticate an nonexistent user', async () => {
    await expect(
      authenticateUseCase.execute({
        email: 'false@email.com',
        password: '1234',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });

  it('should not be able to authenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      driver_license: '9999',
      email: 'user@user.com',
      password: '1234',
      name: 'User Test Error',
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUseCase.execute({
        email: user.email,
        password: 'incorrectPassword',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });
});
