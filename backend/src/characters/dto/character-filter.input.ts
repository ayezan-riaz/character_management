import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CharacterGender } from '../../common/enums/character-gender.enum';
import { CharacterStatus } from '../../common/enums/character-status.enum';

@InputType()
export class CharacterFilterInput {
  @Field(() => CharacterStatus, { nullable: true })
  @IsOptional()
  @IsEnum(CharacterStatus)
  status?: CharacterStatus;

  @Field(() => CharacterGender, { nullable: true })
  @IsOptional()
  @IsEnum(CharacterGender)
  gender?: CharacterGender;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  search?: string;
}
