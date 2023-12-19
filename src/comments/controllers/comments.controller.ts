import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { CreateCommentDto } from '../dtos/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  getComments() {
    return this.commentsService.getComments();
  }

  @Get(':id')
  getCommentsForUser(@Param('id') userId: string) {
    return this.commentsService.getUserComments(userId);
  }

  @Post()
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.createComment(createCommentDto);
  }
}
