import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UpdateUserDto } from 'src/users/dtos/update-user.dto';

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
    return this.find();
  }

  public async findById(id: number): Promise<User | null> {
    try {
      return this.findOneBy({ id: id });
    } catch (error) {
      throw new Error('User not found.');
    }
  }

  public async store(user: CreateUserDto): Promise<User> {
    const newUser = this.create(user);
    return this.save(newUser);
  }

  public async updateOne(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    const user = await this.userRepository.preload({
      id: Number(id),
      ...updateUserDto,
    });
    if (!user) return undefined;
    return this.save(user);
  }

  public async destroy(id: number): Promise<void> {
    await this.delete(id);
  }
}
