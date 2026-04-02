import { registerEnumType } from '@nestjs/graphql';

export enum CharacterGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNKNOWN = 'UNKNOWN',
}

registerEnumType(CharacterGender, {
  name: 'CharacterGender',
});
