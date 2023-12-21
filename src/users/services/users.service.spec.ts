import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserRepository } from '../../database/repositories/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from 'src/database/entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;

  const mockCreateDto: CreateUserDto = {
    email: 'test@gmail.com',
    name: 'Test',
    password: 'test',
  };

  const mockUpdateDto: UpdateUserDto = {
    email: 'test@gmail.com',
    name: 'Test',
  };

  const mockUser: User = {
    id: 1,
    email: 'test@gmail.com',
    name: 'Test',
    password: 'Test',
    comments: [],
    posts: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useValue: {
            store: jest.fn().mockImplementation((createUserDto) => mockUser),
            findAll: jest.fn().mockImplementation(() => 'value'),
            findById: jest.fn().mockImplementation((id) => {
              return { userId: id };
            }),
            updateOne: jest
              .fn()
              .mockImplementation((id, updateDto) => mockUser),
            destroy: jest.fn().mockImplementation((id) => mockUser),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the same as userRepository for creatingUser', () => {
    const newUser = service.createUser(mockCreateDto);
    expect(newUser).resolves.toEqual(mockUser);
  });

  it('should return the same as userRepository for findAllUsers', () => {
    const users = service.findAllUsers();
    expect(users).resolves.toEqual('value');
  });

  it('should return the same as userRepository for findOneUser', () => {
    const user = service.findOneUser('1');
    expect(user).resolves.toEqual({ userId: 1 });
  });

  it('should return the same as userRepository for updateUser', () => {
    const updatedUser = service.updateUser(mockUpdateDto, '1');
    expect(updatedUser).resolves.toEqual(mockUser);
  });

  it('should return confirmation that the user is deleted', () => {
    const deleteResult = service.deleteUser('1');
    expect(deleteResult).resolves.toEqual('Deleted user #1');
  });
});
