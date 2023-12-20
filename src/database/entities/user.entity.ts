import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';
import { Comment } from './comment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string;

  @Column({ select: false, type: 'varchar', nullable: false, unique: false })
  password: string;

  @OneToMany(() => Post, (post) => post.user, {
    eager: true,
  })
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user, {
    eager: true,
  })
  comments: Comment[];
}
