import { CharacterGender } from '../../common/enums/character-gender.enum';
import { CharacterStatus } from '../../common/enums/character-status.enum';
export declare class CharacterEntity {
    id: number;
    image: string;
    name: string;
    status: CharacterStatus;
    gender: CharacterGender;
    description: string;
}
