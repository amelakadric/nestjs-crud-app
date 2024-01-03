import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PostRepository } from '../../database/repositories/post.repository';
import { UserRepository } from '../../database/repositories/user.repository';
import { Repository } from 'typeorm';
import { Post } from 'src/database/entities/post.entity';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { request } from 'http';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class PostsService {
  logger: Logger;
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {
    this.logger = new Logger(PostsService.name);
  }

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const user = await this.userRepository.findById(createPostDto.userId);
    const post = this.postRepository.createPost(createPostDto, user);
    this.logger.log('Post created', { post });
    return post;
  }

  async getAllPosts(): Promise<Post[]> {
    const cachedPosts = await this.cacheService.get<Promise<Post[]>>('posts');

    if (cachedPosts) {
      console.log('Getting data from cache');
      return cachedPosts;
    }
    const posts = await this.postRepository.getPosts();
    await this.cacheService.set('posts', posts);
    return posts;
  }

  async getPostById(id: string): Promise<Post> {
    return await this.postRepository.getPostById(Number(id));
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const updatedPost = await this.postRepository.updatePost(
      Number(id),
      updatePostDto,
    );
    this.logger.log('Post uploaded', { updatedPost });
    return updatedPost;
  }

  async deletePost(id: string) {
    const deletedPost = await this.postRepository.deletePost(Number(id));
    this.logger.log('Post deleted', { deletedPost });
    return `Delted post #${id}`;
  }

  getTopPostsOfUser(id: string) {
    return this.postRepository.getTopPostsOfUser(Number(id));
  }
}
