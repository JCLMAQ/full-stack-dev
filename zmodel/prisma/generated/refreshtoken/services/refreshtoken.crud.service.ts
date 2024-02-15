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
import { Prisma, RefreshToken } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { PrismaService } from 'nestjs-prisma';
import { err, ok, Result } from 'neverthrow';

@Injectable()
export class RefreshTokenCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.RefreshTokenFindManyArgs,
  ): Promise<Result<PaginationModel<RefreshToken>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.refreshToken.findMany(filter),
        this.prismaService.refreshToken.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get RefreshToken Resources.`));
    }
  }

  async getById(id: string): Promise<Result<RefreshToken, Error>> {
    try {
      const result = await this.prismaService.refreshToken.findUniqueOrThrow({
        where: { id: id }
      });
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`RefreshToken Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.RefreshTokenCreateInput): Promise<Result<RefreshToken, Error>> {
    try {
      const result = await this.prismaService.refreshToken.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create RefreshToken Resource.`));
    }
  }

  async update(
    id: string,
    data: Prisma.RefreshTokenUpdateInput,
  ): Promise<Result<RefreshToken, Error>> {
    try {
      const result = await this.prismaService.refreshToken.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update RefreshToken Resource ${id}.`,
      ));
    }
  }

  async delete(id: string): Promise<Result<RefreshToken, Error>> {
    try {
      const result = await this.prismaService.refreshToken.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete RefreshToken Resource ${id}.`,
      ));
    }
  }
}