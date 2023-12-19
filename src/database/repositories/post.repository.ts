import { EntityRepository, Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from 'src/posts/dtos/create-post.dto';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class PostRepository extends Repository<Post> {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {
    super(
      postRepository.target,
      postRepository.manager,
      postRepository.queryRunner,
    );
  }
  async store(createPostDto: CreatePostDto, user: User) {
    const { content, date, userId } = createPostDto;

    const post = this.create({ user: user, content: content, date: date });
    return this.save(post);
  }

  async getPosts() {
    return this.find({ relations: { user: true } });
  }
}
