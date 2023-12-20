import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comments.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  postId: number;

  @Column()
  content: string;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.posts, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
