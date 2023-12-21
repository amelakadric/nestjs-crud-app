import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  const mockUpdateDto: UpdateUserDto = {
    email: 'test@gmail.com',
    name: 'Test',
  };
  const mockCreateDto: CreateUserDto = {
    email: 'test@gmail.com',
    name: 'Test',
    password: 'test',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAllUsers: jest.fn().mockImplementation(() => 'value'),
            findOneUser: jest.fn().mockImplementation((id) => id),
            updateUser: jest
              .fn()
              .mockImplementation((userUpdateDto) => userUpdateDto),
            createUser: jest
              .fn()
              .mockImplementation((createUserDto) => createUserDto),
            deleteUser: jest.fn().mockImplementation((id) => id),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the same value as service for findAllUsers', () => {
    const findAllUsers = controller.findAllUsers();
    expect(findAllUsers).resolves.toEqual('value');
  });

  it('should return the same value as service for findOneUser', () => {
    const findOneUser = controller.findUser('1');
    expect(findOneUser).resolves.toEqual('1');
  });

  it('should return the same value as service for updateUser', () => {
    const updateUser = controller.updateUser('1', mockUpdateDto);
    expect(updateUser).resolves.toEqual(mockUpdateDto);
  });

  it('should return the same value as service for createUser', () => {
    const createUser = controller.createUser(mockCreateDto);
    expect(createUser).resolves.toEqual(mockCreateDto);
  });

  it('should return the same value as service for deleteUser', () => {
    const deleteUser = controller.deleteUser('1');
    expect(deleteUser).resolves.toEqual('1');
  });
});
