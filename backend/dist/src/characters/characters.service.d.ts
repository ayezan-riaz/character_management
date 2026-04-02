import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CharacterFilterInput } from './dto/character-filter.input';
export declare class CharactersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(filter?: CharacterFilterInput): Promise<{
        name: string;
        id: number;
        image: string;
        status: import("@prisma/client").$Enums.CharacterStatus;
        gender: import("@prisma/client").$Enums.CharacterGender;
        description: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    buildWhereInput(filter?: CharacterFilterInput): Prisma.CharacterWhereInput;
}
