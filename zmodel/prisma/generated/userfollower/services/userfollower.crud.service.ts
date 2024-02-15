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
import { Prisma, UserFollower } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { PrismaService } from 'nestjs-prisma';
import { err, ok, Result } from 'neverthrow';

@Injectable()
export class UserFollowerCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.UserFollowerFindManyArgs,
  ): Promise<Result<PaginationModel<UserFollower>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.userFollower.findMany(filter),
        this.prismaService.userFollower.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get UserFollower Resources.`));
    }
  }

  async getById(id: string): Promise<Result<UserFollower, Error>> {
    try {
      const result = await this.prismaService.userFollower.findUniqueOrThrow({
        where: { id: id }
      });
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`UserFollower Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.UserFollowerCreateInput): Promise<Result<UserFollower, Error>> {
    try {
      const result = await this.prismaService.userFollower.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create UserFollower Resource.`));
    }
  }

  async update(
    id: string,
    data: Prisma.UserFollowerUpdateInput,
  ): Promise<Result<UserFollower, Error>> {
    try {
      const result = await this.prismaService.userFollower.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update UserFollower Resource ${id}.`,
      ));
    }
  }

  async delete(id: string): Promise<Result<UserFollower, Error>> {
    try {
      const result = await this.prismaService.userFollower.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete UserFollower Resource ${id}.`,
      ));
    }
  }
}
