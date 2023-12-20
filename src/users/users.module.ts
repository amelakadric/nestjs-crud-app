import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { UsersService } from './services/users.service';
import { UserRepository } from 'src/database/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository])],
  providers: [UsersService, UserRepository],
  exports: [UsersService],
})
export class UsersModule {}
