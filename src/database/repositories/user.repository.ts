import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UpdateUserDto } from 'src/users/dtos/update-user.dto';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { MetaDataDto } from 'src/users/dtos/paginated-response.dto';

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

  async findAll(page: number, pageSize: number) {
    const start = (page - 1) * pageSize;

    const result = await this.findAndCount({
      skip: start,
      take: pageSize,
    });
    if (result[0]?.length === 0) {
      throw new NotFoundException('No users found.');
    }
    return result;

    // const query = this.createQueryBuilder()
    //   .select('*')
    //   .from('users', 'u')
    //   .offset(start)
    //   .limit(pageSize);
    // return await query.getRawMany();
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException(`User with id #${id} not found.`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.findOneBy({ email: email });
    if (!user) {
      throw new NotFoundException(`User with email #${email} not found.`);
    }
    return user;
  }

  async store(user: CreateUserDto): Promise<User> {
    const userEmailAlreadyExists = await this.findOneBy({ email: user.email });
    if (userEmailAlreadyExists) {
      throw new BadRequestException('User with this email already exists');
    }

    const userNameAlreadyExists = await this.findOneBy({ name: user.name });
    if (userNameAlreadyExists) {
      throw new BadRequestException('User with this name already exists');
    }

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

  async destroy(id: number) {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.remove(user);
  }
}
