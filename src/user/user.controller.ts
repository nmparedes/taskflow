import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from 'src/helpers/guards/jwt-auth.guard';
import { RolesGuard } from 'src/helpers/guards/roles.guarda';
import { Roles } from 'src/helpers/decorators/roles.decorator';
import { UserRole } from 'src/helpers/enums/user-role.enum';
import { UpdateUserDTO } from './dto/update-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @Roles(UserRole.ADMIN)
  getProfile(@Req() req) {
    return req.user;
  }

  @Get()
  @Roles(UserRole.ADMIN)
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  async findOneById(@Param() id: number): Promise<User> {
    return this.userService.findOneById(id);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  async createUser(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return this.userService.create(createUserDTO);
  }

  @Patch()
  @Roles(UserRole.ADMIN)
  async updateUser(
    @Param() id: number,
    @Body() updateUser: UpdateUserDTO,
  ): Promise<User> {
    return this.userService.update(id, updateUser);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async deleteUser(@Param() id: number): Promise<DeleteResult> {
    return this.userService.delete(id);
  }
}
