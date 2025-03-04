import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserDTO } from './dto/update-user.dto';
import { LogService } from 'src/log/log.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly logService: LogService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findByRefreshToken(refreshToken: string): Promise<User> {
    return await this.userRepository.findOne({ where: { refreshToken } });
  }

  async create(userData: Partial<User>): Promise<User> {
    const existingUser = await this.findOneByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    userData.password = await bcrypt.hash(userData.password, 10);
    const newUser = this.userRepository.create(userData);
    const createdUser = await this.userRepository.save(newUser);
    await this.logService.createLog(
      'CREATE',
      'User',
      createdUser.id.toString(),
      createdUser.id,
      userData,
    );
    return createdUser;
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
    await this.logService.createLog('DELETE', 'User', id.toString(), id);
  }

  async update(id: number, updateUserDTO: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`Can't find user with ID ${id}`);
    Object.assign(user, updateUserDTO);
    const updatedUser = await this.userRepository.save(user);
    await this.logService.createLog(
      'UPDATE',
      'User',
      id.toString(),
      id,
      updateUserDTO,
    );
    return updatedUser;
  }
}
