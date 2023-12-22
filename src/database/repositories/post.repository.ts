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
  async createPost(createPostDto: CreatePostDto, user: User) {
    const { content, userId } = createPostDto;

    const post = this.create({ user: user, content: content });
    return this.save(post);
  }

  async getPosts() {
    const posts = await this.find({
      relations: { user: true, comments: true },
    });
    if (posts?.length === 0) {
      throw new NotFoundException('No posts found.');
    }
    return posts;
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
    const post = await this.getPostById(id);
    if (!post) {
      throw new NotFoundException(`Post with id #${id} not found.`);
    }
    return await this.remove(post);
  }

  async getTopPostsOfUser(id: number): Promise<Post[]> {
    //Primer: Dohvatiti 5 postova od korisnika sa najviše komentara i sortirajte opadajuće
    const query = this.createQueryBuilder('posts')
      .select('posts.postId', 'postId')
      .addSelect('COUNT(comments.commentId) as commentCount')
      .leftJoin('comments', 'comments', 'posts.postId = comments.postPostId')
      .where('posts.userId = :id', { id: id })
      .groupBy('posts.postId')
      .orderBy('commentCount', 'DESC')
      .limit(5);

    return await query.getRawMany();
  }
}
