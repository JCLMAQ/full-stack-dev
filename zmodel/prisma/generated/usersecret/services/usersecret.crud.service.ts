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
import { Prisma, UserSecret } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { PrismaService } from 'nestjs-prisma';
import { err, ok, Result } from 'neverthrow';

@Injectable()
export class UserSecretCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.UserSecretFindManyArgs,
  ): Promise<Result<PaginationModel<UserSecret>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.userSecret.findMany(filter),
        this.prismaService.userSecret.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get UserSecret Resources.`));
    }
  }

  async getById(id: string): Promise<Result<UserSecret, Error>> {
    try {
      const result = await this.prismaService.userSecret.findUniqueOrThrow({
        where: { id: id }
      });
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`UserSecret Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.UserSecretCreateInput): Promise<Result<UserSecret, Error>> {
    try {
      const result = await this.prismaService.userSecret.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create UserSecret Resource.`));
    }
  }

  async update(
    id: string,
    data: Prisma.UserSecretUpdateInput,
  ): Promise<Result<UserSecret, Error>> {
    try {
      const result = await this.prismaService.userSecret.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update UserSecret Resource ${id}.`,
      ));
    }
  }

  async delete(id: string): Promise<Result<UserSecret, Error>> {
    try {
      const result = await this.prismaService.userSecret.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete UserSecret Resource ${id}.`,
      ));
    }
  }
}