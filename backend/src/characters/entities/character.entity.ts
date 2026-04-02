import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CharacterGender } from '../../common/enums/character-gender.enum';
import { CharacterStatus } from '../../common/enums/character-status.enum';

@ObjectType('Character')
export class CharacterEntity {
  @Field(() => ID)
  id!: number;

  @Field()
  image!: string;

  @Field()
  name!: string;

  @Field(() => CharacterStatus)
  status!: CharacterStatus;

  @Field(() => CharacterGender)
  gender!: CharacterGender;

  @Field()
  description!: string;
}
