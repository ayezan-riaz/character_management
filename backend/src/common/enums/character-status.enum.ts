import { registerEnumType } from '@nestjs/graphql';

export enum CharacterStatus {
  ALIVE = 'ALIVE',
  DEAD = 'DEAD',
  UNKNOWN = 'UNKNOWN',
}

registerEnumType(CharacterStatus, {
  name: 'CharacterStatus',
});
