import { Args, Query, Resolver } from '@nestjs/graphql';
import { CharacterEntity } from './entities/character.entity';
import { CharactersService } from './characters.service';
import { CharacterFilterInput } from './dto/character-filter.input';

@Resolver(() => CharacterEntity)
export class CharactersResolver {
  constructor(private readonly charactersService: CharactersService) {}

  @Query(() => [CharacterEntity], {
    name: 'characters',
  })
  async characters(
    @Args('filter', { nullable: true }) filter?: CharacterFilterInput,
  ) {
    return this.charactersService.findAll(filter);
  }
}
