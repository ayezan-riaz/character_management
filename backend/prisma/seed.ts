import { CharacterGender, CharacterStatus, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const characters = [
  {
    image: 'https://api.dicebear.com/9.x/adventurer/png?seed=Astra%20Vale',
    name: 'Astra Vale',
    status: CharacterStatus.ALIVE,
    gender: CharacterGender.FEMALE,
    description:
      'A celebrated starship medic known for calming crews in impossible situations and documenting every rescue mission.',
  },
  {
    image: 'https://api.dicebear.com/9.x/adventurer/png?seed=Marek%20Thorn',
    name: 'Marek Thorn',
    status: CharacterStatus.DEAD,
    gender: CharacterGender.MALE,
    description:
      'A legendary ranger remembered for defending the Ember Ridge outpost during the final siege.',
  },
  {
    image: 'https://api.dicebear.com/9.x/adventurer/png?seed=Sora%20Quinn',
    name: 'Sora Quinn',
    status: CharacterStatus.ALIVE,
    gender: CharacterGender.FEMALE,
    description:
      'A courier pilot who treats every storm front like a puzzle and every landing like a performance.',
  },
  {
    image: 'https://api.dicebear.com/9.x/adventurer/png?seed=Ivo%20Ledger',
    name: 'Ivo Ledger',
    status: CharacterStatus.UNKNOWN,
    gender: CharacterGender.MALE,
    description:
      'An archivist who vanished after decoding a vault of forbidden maps and leaving only annotated scraps behind.',
  },
  {
    image: 'https://api.dicebear.com/9.x/adventurer/png?seed=Nyla%20Rift',
    name: 'Nyla Rift',
    status: CharacterStatus.ALIVE,
    gender: CharacterGender.UNKNOWN,
    description:
      'A dimensional scout who studies unstable portals and speaks in calm, precise field reports.',
  },
  {
    image: 'https://api.dicebear.com/9.x/adventurer/png?seed=Corin%20Ash',
    name: 'Corin Ash',
    status: CharacterStatus.DEAD,
    gender: CharacterGender.MALE,
    description:
      'A tactician whose final stand bought enough time for an entire settlement to evacuate safely.',
  },
  {
    image: 'https://api.dicebear.com/9.x/adventurer/png?seed=Lyra%20Bloom',
    name: 'Lyra Bloom',
    status: CharacterStatus.ALIVE,
    gender: CharacterGender.FEMALE,
    description:
      'A botanist and healer who can identify medicinal plants from scent alone, even in moonlit forests.',
  },
  {
    image: 'https://api.dicebear.com/9.x/adventurer/png?seed=Orin%20Frost',
    name: 'Orin Frost',
    status: CharacterStatus.UNKNOWN,
    gender: CharacterGender.MALE,
    description:
      'A former engineer last seen tracking energy spikes beneath the northern ice fields.',
  },
  {
    image: 'https://api.dicebear.com/9.x/adventurer/png?seed=Veda%20Noor',
    name: 'Veda Noor',
    status: CharacterStatus.ALIVE,
    gender: CharacterGender.FEMALE,
    description:
      'A diplomatic envoy with a talent for turning tense negotiations into durable alliances.',
  },
  {
    image: 'https://api.dicebear.com/9.x/adventurer/png?seed=Jax%20Morrow',
    name: 'Jax Morrow',
    status: CharacterStatus.DEAD,
    gender: CharacterGender.MALE,
    description:
      'A daring smuggler whose last route through the blackwater channels still circulates as a rumor.',
  },
  {
    image: 'https://api.dicebear.com/9.x/adventurer/png?seed=Selene%20Hart',
    name: 'Selene Hart',
    status: CharacterStatus.ALIVE,
    gender: CharacterGender.FEMALE,
    description:
      'A front-line commander known for bold rescue operations and fierce loyalty to her squad.',
  },
  {
    image: 'https://api.dicebear.com/9.x/adventurer/png?seed=Echo%20Rune',
    name: 'Echo Rune',
    status: CharacterStatus.UNKNOWN,
    gender: CharacterGender.UNKNOWN,
    description:
      'A codebreaker whose messages continue to appear inside old relay stations long after disappearance.',
  },
  {
    image: 'https://api.dicebear.com/9.x/adventurer/png?seed=Kian%20Drake',
    name: 'Kian Drake',
    status: CharacterStatus.ALIVE,
    gender: CharacterGender.MALE,
    description:
      'A marine biologist mapping luminous creatures in subterranean oceans beneath the desert crust.',
  },
  {
    image: 'https://api.dicebear.com/9.x/adventurer/png?seed=Zuri%20Keene',
    name: 'Zuri Keene',
    status: CharacterStatus.DEAD,
    gender: CharacterGender.FEMALE,
    description:
      'An intelligence officer honored for exposing a sabotage ring before the capital launch ceremony.',
  },
  {
    image: 'https://api.dicebear.com/9.x/adventurer/png?seed=Tal%20Mercer',
    name: 'Tal Mercer',
    status: CharacterStatus.ALIVE,
    gender: CharacterGender.UNKNOWN,
    description:
      'A salvage diver who collects lost machines and restores them into useful companions.',
  },
  {
    image: 'https://api.dicebear.com/9.x/adventurer/png?seed=Iris%20Stone',
    name: 'Iris Stone',
    status: CharacterStatus.UNKNOWN,
    gender: CharacterGender.FEMALE,
    description:
      'A geologist following seismic whispers that may point to an entire city buried beneath basalt.',
  },
];

async function main() {
  await prisma.character.deleteMany();
  await prisma.character.createMany({
    data: characters,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error('Failed to seed characters:', error);
    await prisma.$disconnect();
    process.exit(1);
  });
