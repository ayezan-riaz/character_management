import { CharactersService } from './characters.service';
import { CharacterFilterInput } from './dto/character-filter.input';
export declare class CharactersResolver {
    private readonly charactersService;
    constructor(charactersService: CharactersService);
    characters(filter?: CharacterFilterInput): Promise<{
        name: string;
        id: number;
        image: string;
        status: import("@prisma/client").$Enums.CharacterStatus;
        gender: import("@prisma/client").$Enums.CharacterGender;
        description: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
