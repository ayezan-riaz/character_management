import { CharacterGender, CharacterStatus } from '../common/enums';
import { PrismaService } from '../prisma/prisma.service';
import { CharactersService } from './characters.service';

describe('CharactersService', () => {
  const prisma = {
    character: {
      findMany: jest.fn(),
    },
  } as unknown as PrismaService;

  let service: CharactersService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new CharactersService(prisma);
  });

  it('builds a combined Prisma filter for status, gender, and search', () => {
    const where = service.buildWhereInput({
      status: CharacterStatus.ALIVE,
      gender: CharacterGender.FEMALE,
      search: 'medic',
    });

    expect(where).toEqual({
      AND: [
        { status: CharacterStatus.ALIVE },
        { gender: CharacterGender.FEMALE },
        {
          OR: [
            {
              name: {
                contains: 'medic',
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: 'medic',
                mode: 'insensitive',
              },
            },
          ],
        },
      ],
    });
  });

  it('requests characters sorted by name', async () => {
    const findManyMock = jest.fn().mockResolvedValue([]);
    prisma.character.findMany = findManyMock;

    await service.findAll();

    expect(findManyMock).toHaveBeenCalledWith({
      where: {},
      orderBy: {
        name: 'asc',
      },
    });
  });
});
