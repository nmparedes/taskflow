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
import { JwtAuthGuard } from 'src/helpers/guards/jwt-auth.guard';
import { RolesGuard } from 'src/helpers/guards/roles.guard';
import { Roles } from 'src/helpers/decorators/roles.decorator';
import { UserRole } from 'src/helpers/enums/user-role.enum';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { CreateUserDTO } from '../dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserProfileDTO } from 'src/dto/user-profile.dto';
import { UnauthorizedResponseDTO } from 'src/dto/unauthorized-response.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('user')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Invalid token or unauthorized access',
  type: UnauthorizedResponseDTO,
})
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get the authenticated user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile returned successfully',
    type: UserProfileDTO,
  })
  getProfile(@Req() req) {
    return req.user;
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'List all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users returned successfully',
  })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Find a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: Number })
  @ApiResponse({ status: 200, description: 'User found successfully' })
  async findOneById(@Param() id: number): Promise<User> {
    return this.userService.findOneById(id);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  async createUser(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return this.userService.create(createUserDTO);
  }

  @Patch()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update an existing user' })
  @ApiParam({ name: 'id', description: 'User ID to update', type: Number })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  async updateUser(
    @Param() id: number,
    @Body() updateUser: UpdateUserDTO,
  ): Promise<User> {
    return this.userService.update(id, updateUser);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', description: 'User ID to delete', type: Number })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  async deleteUser(@Param() id: number): Promise<void> {
    return this.userService.delete(id);
  }
}
