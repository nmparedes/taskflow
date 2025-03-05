import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entity/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from 'src/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Email or password invalid');
  }

  async login(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    await this.updateRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async register(createUserDTO: CreateUserDTO) {
    const existingUser = await this.userService.findOneByEmail(
      createUserDTO.email,
    );
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }
    return this.userService.create(createUserDTO);
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedToken = await bcrypt.hash(refreshToken, 10);
    await this.userService.update(userId, { refreshToken: hashedToken });
  }

  async refreshAccessToken(refreshToken: string) {
    const user: User = await this.userService.findByRefreshToken(refreshToken);
    if (!user) throw new UnauthorizedException('Invalid token');

    const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isValid) throw new UnauthorizedException('Invalid token');

    const payload = { sub: user.id, email: user.email, role: user.role };
    const newAccressToken = this.jwtService.sign(payload, { expiresIn: '15m' });

    return { acessToken: newAccressToken };
  }
}
