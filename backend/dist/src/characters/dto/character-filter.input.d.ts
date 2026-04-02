import { CharacterGender } from '../../common/enums/character-gender.enum';
import { CharacterStatus } from '../../common/enums/character-status.enum';
export declare class CharacterFilterInput {
    status?: CharacterStatus;
    gender?: CharacterGender;
    search?: string;
}
