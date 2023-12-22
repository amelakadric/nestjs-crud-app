import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { PostRepository } from '../../database/repositories/post.repository';
import { Post } from '../../database/entities/post.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { User } from '../../database/entities/user.entity';
import { UpdatePostDto } from '../dtos/update-post.dto';

describe('MyService', () => {
  let controller: PostsService;

  const mockUser: User = {
    id: 1,
    email: 'test@gmail.com',
    name: 'Test',
    password: 'Test',
    comments: [],
    posts: [],
  };

  const mockPost: Post = {
    comments: [],
    content: 'test',
    date: new Date(),
    postId: 1,
    user: mockUser,
  };

  const mockCreateDto: CreatePostDto = {
    content: 'test',
    userId: 1,
  };

  const mockUpdateDto: UpdatePostDto = {
    content: 'test',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: PostRepository,
          useValue: {
            createPost: jest
              .fn()
              .mockImplementation((mockCreateDto) => mockPost),
            getPosts: jest.fn().mockImplementation((mockCreateDto) => mockPost),
            getPostById: jest.fn().mockImplementation((id) => mockPost),
            updatePost: jest
              .fn()
              .mockImplementation((mockUpdateDto) => mockPost),
            deletePost: jest.fn().mockImplementation((id) => 'value'),
          },
        },
      ],
    }).compile();

    controller = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
