import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from '../services/posts.service';
import { Post } from '../../database/entities/post.entity';
import { User } from '../../database/entities/user.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';

describe('PostsController', () => {
  let controller: PostsController;

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
        PostsController,
        {
          provide: PostsService,
          useValue: {
            createPost: jest
              .fn()
              .mockImplementation((createPostDto) => mockPost),
            getAllPosts: jest.fn().mockImplementation(() => 'value'),
            getPostById: jest.fn().mockImplementation((id) => mockUser),
            updatePost: jest
              .fn()
              .mockImplementation((id, updatePostDto) => mockUser),
            deletePost: jest.fn().mockImplementation((id) => 'Deleted user #1'),
          },
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the same as service for createPost', () => {
    const newPost = controller.createPost(mockCreateDto);
    expect(newPost).resolves.toEqual(mockPost);
  });

  it('should return the same as service for getAllPosts', () => {
    const posts = controller.getPosts();
    expect(posts).resolves.toEqual('value');
  });

  it('should return the same as service for getPostById', () => {
    const post = controller.getPostById('1');
    expect(post).resolves.toEqual(mockUser);
  });

  it('should return the same as service for updatePost', () => {
    const post = controller.updatePost('1', mockUpdateDto);
    expect(post).resolves.toEqual(mockUser);
  });

  it('should return the same as service for deletePost', () => {
    const post = controller.deletePost('1');
    expect(post).resolves.toEqual('Deleted user #1');
  });
});
