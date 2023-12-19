import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  commentId: number;

  @Column()
  commentText: string;

  @Column()
  date: Date;

  // @ManyToOne(() => User, (user) => user.comments)
  // user: User;

  // @ManyToOne(() => Post, (post) => post.comments)
  // @JoinColumn()
  // post: Post;
}
