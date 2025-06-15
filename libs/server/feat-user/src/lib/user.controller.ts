import { Body, Controller, Delete, Get, Patch, Query } from '@nestjs/common';

import { UserRole } from '@my-auctions/shared/types';
import {
  ApiPaginatedOkResponse,
  Auth,
  PaginationOptionsDto,
  UpdateUserDto,
  UserDto,
  UUIDParam,
} from '@my-auctions/server/utils-common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  // private readonly logger = new Logger(UserController.name);
  constructor(private userService: UserService) {}

  @Get('')
  @Auth([UserRole.ADMIN])
  @ApiPaginatedOkResponse({ type: UserDto })
  async getUsers(@Query() paginationOptions: PaginationOptionsDto) {
    return this.userService.getUsers(paginationOptions);
  }

  @Get(':id')
  @Auth([UserRole.ADMIN])
  async getUser(@UUIDParam('id') userId: string) {
    return this.userService.getUser(userId);
  }

  @Patch(':id')
  @Auth([UserRole.ADMIN])
  async updateUser(
    @UUIDParam('id') userId: string,
    @Body() dto: UpdateUserDto
  ) {
    return this.userService.updateUser(userId, dto);
  }

  @Delete(':id')
  @Auth([UserRole.ADMIN])
  async deleteUser(@UUIDParam('id') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
