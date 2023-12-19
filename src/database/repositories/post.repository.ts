import { EntityRepository, Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from 'src/posts/dtos/create-post.dto';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdatePostDto } from 'src/posts/dtos/update-post.dto';

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

  async getPostById(id: number) {
    const post = await this.findOne({ where: { postId: id } });
    if (!post) {
      throw new NotFoundException(`Post with id #${id} not found.`);
    }
    return post;
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.findOneBy({ postId: id });
    if (!post) {
      throw new NotFoundException(`Post with id #${id} not found.`);
    }
    Object.assign(post, updatePostDto);
    return this.save(post);
  }

  async deletePost(id: number) {
    await this.delete(id);
  }
}
