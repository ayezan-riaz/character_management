import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CharacterFilterInput } from './dto/character-filter.input';

@Injectable()
export class CharactersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filter?: CharacterFilterInput) {
    return this.prisma.character.findMany({
      where: this.buildWhereInput(filter),
      orderBy: {
        name: 'asc',
      },
    });
  }

  buildWhereInput(filter?: CharacterFilterInput): Prisma.CharacterWhereInput {
    const search = filter?.search?.trim();

    const conditions: Prisma.CharacterWhereInput[] = [];

    if (filter?.status) {
      conditions.push({ status: filter.status });
    }

    if (filter?.gender) {
      conditions.push({ gender: filter.gender });
    }

    if (search) {
      conditions.push({
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      });
    }

    if (conditions.length === 0) {
      return {};
    }

    return {
      AND: conditions,
    };
  }
}
