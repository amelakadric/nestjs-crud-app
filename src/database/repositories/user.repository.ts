import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UpdateUserDto } from 'src/users/dtos/update-user.dto';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';

export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }

  async findAll(): Promise<User[]> {
    const users = await this.find({
      relations: { posts: true, comments: true },
    });
    if (users?.length === 0) {
      throw new NotFoundException('No users found.');
    }
    return users;
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException(`User with id #${id} not found.`);
    }
    return user;
  }

  async store(user: CreateUserDto): Promise<User> {
    const newUser = this.create(user);
    if (!newUser) {
      throw new HttpException('Error with the database', HttpStatus.GONE);
    }
    return this.save(newUser);
  }

  async updateOne(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // const user = await this.preload({ id: id, ...updateUserDto });
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id #${id} not found.`);
    }
    Object.assign(user, updateUserDto);
    console.log(user);
    return await this.save(user);
  }

  async destroy(id: number): Promise<void> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.remove(user);
  }
}
