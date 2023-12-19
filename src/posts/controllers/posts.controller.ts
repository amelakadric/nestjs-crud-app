import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dtos/create-post.dto';

@Controller('posts')
export class PostsController {
  logger: Logger;
  constructor(private postsService: PostsService) {
    this.logger = new Logger(PostsController.name);
  }

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @Get()
  getPosts() {
    return this.postsService.getAllPosts();
  }
}
