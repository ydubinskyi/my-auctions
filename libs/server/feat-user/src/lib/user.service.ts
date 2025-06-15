import {
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { UserEntity } from '@my-auctions/server/entities';
import {
  CreateUserDto,
  PaginationOptionsDto,
  PaginationService,
} from '@my-auctions/server/utils-common';

@Injectable()
export class UserService extends PaginationService<UserEntity> {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>
  ) {
    super(UserEntity.prototype, userRepo);
  }

  async findUser(
    find: FindOptionsWhere<UserEntity>
  ): Promise<UserEntity | null> {
    return this.userRepo.findOneBy(find);
  }

  async getUser(userId: string) {
    return await this.userRepo.findOneOrFail({ where: { id: userId } });
  }

  async getUsers(paginationOptions?: PaginationOptionsDto) {
    return this.paginate<UserEntity>(paginationOptions);
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepo.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException(`User could not be found!`);
    }

    return user;
  }

  async createUser(dto: CreateUserDto) {
    const user = this.userRepo.create({
      ...dto,
    });
    await user.save();

    return user;
  }

  async updateUser(userId: string, data: Partial<UserEntity>) {
    await this.userRepo.save({ id: userId, ...data });
    return await this.userRepo.findOneOrFail({ where: { id: userId } });
  }

  async deleteUser(userId: string): Promise<void> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      this.logger.log(
        `Request received to delete user ${userId} - but user does not exist!`
      );
      throw new UnprocessableEntityException(`Error deleting user`);
    }
    await user.remove();
  }
}
