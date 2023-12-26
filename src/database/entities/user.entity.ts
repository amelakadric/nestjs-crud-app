import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';
import { Comment } from './comment.entity';
import { Role } from 'src/utils/roles.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', nullable: false, unique: false })
  password: string;

  @OneToMany(() => Post, (post) => post.user, {
    // eager: true,
  })
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user, {
    // eager: true,
  })
  comments: Comment[];
}
