/*
-----------------------------------------------------
THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
-----------------------------------------------------
*/

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { PrismaService } from 'nestjs-prisma';
import { err, ok, Result } from 'neverthrow';

@Injectable()
export class UserCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.UserFindManyArgs,
  ): Promise<Result<PaginationModel<User>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.user.findMany(filter),
        this.prismaService.user.count({ where: filter?.where }),
      ]);

      const take = filter?.take ? filter?.take : count;
      const skip = filter?.skip ? filter?.skip : 0;

      return ok({
        items: items,
        meta: {
          totalItems: count,
          items: items.length,
          totalPages: Math.ceil(count / take),
          page: skip / take + 1,
        },
      });
    }
    catch(e) {
      return err(new InternalServerErrorException(`Could not get User Resources.`));
    }
  }

  async getById(id: string): Promise<Result<User, Error>> {
    try {
      const result = await this.prismaService.user.findUniqueOrThrow({
        where: { id: id }
      });
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`User Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.UserCreateInput): Promise<Result<User, Error>> {
    try {
      const result = await this.prismaService.user.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create User Resource.`));
    }
  }

  async update(
    id: string,
    data: Prisma.UserUpdateInput,
  ): Promise<Result<User, Error>> {
    try {
      const result = await this.prismaService.user.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update User Resource ${id}.`,
      ));
    }
  }

  async delete(id: string): Promise<Result<User, Error>> {
    try {
      const result = await this.prismaService.user.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete User Resource ${id}.`,
      ));
    }
  }
}
