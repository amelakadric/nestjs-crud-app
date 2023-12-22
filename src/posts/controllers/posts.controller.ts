import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { Post as PostEntity } from '../../database/entities/post.entity';

@Controller('posts')
export class PostsController {
  logger: Logger;
  constructor(private postsService: PostsService) {
    this.logger = new Logger(PostsController.name);
  }

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postsService.createPost(createPostDto);
  }

  @Get()
  async getPosts(): Promise<PostEntity[]> {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<PostEntity> {
    return this.postsService.getPostById(id);
  }

  @Put(':id')
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    return this.postsService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(id);
  }

  @Get('topPosts/:id')
  async getUserWithTopPosts(@Param('id') id: string) {
    return this.postsService.getTopPostsOfUser(id);
  }
}
