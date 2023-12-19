import { Module } from '@nestjs/common';
import { ServicesService } from './services/services.service';
import { CommentsController } from './controllers/comments.controller';

@Module({
  providers: [ServicesService],
  controllers: [CommentsController],
})
export class CommentsModule {
  exports: [];
}
