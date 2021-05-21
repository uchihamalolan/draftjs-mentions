import { MentionData } from '@draft-js-plugins/mention';
/**
 * The Actual Mentions List containing user data
 * Could fetch from server if needed. refer official docs for such examples
 */
export const mentions: Record<string, MentionData> = {
  1: {
    id: 1,
    name: 'Matthew Russell',
    link: 'https://twitter.com/mrussell247',
    avatar:
      'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
  },
  2: {
    id: 2,
    name: 'Julian Krispel-Samsel',
    link: 'https://twitter.com/juliandoesstuff',
    avatar: 'https://avatars2.githubusercontent.com/u/1188186?v=3&s=400',
  },
  3: {
    id: 3,
    name: 'Jyoti Puri',
    link: 'https://twitter.com/jyopur',
    avatar: 'https://avatars0.githubusercontent.com/u/2182307?v=3&s=400',
  },
  4: {
    id: 4,
    name: 'Max Stoiber',
    link: 'https://twitter.com/mxstbr',
    avatar: 'https://avatars0.githubusercontent.com/u/7525670?s=200&v=4',
  },
  5: {
    id: 5,
    name: 'Nik Graf',
    link: 'https://twitter.com/nikgraf',
    avatar: 'https://avatars0.githubusercontent.com/u/223045?v=3&s=400',
  },
  6: {
    id: 6,
    name: 'Pascal Brandt',
    link: 'https://twitter.com/psbrandt',
    avatar:
      'https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png',
  },
};
