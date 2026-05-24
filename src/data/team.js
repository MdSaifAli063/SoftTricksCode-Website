import { founders } from './founders';

export const team = [
  ...founders.map((f) => ({
    id: f.id,
    name: f.name,
    role: f.role,
    bio: f.bio,
    skills: f.skills,
    avatar: f.photo,
    imageVariant: f.imageVariant,
    phone: f.phone,
    phoneTel: f.phoneTel,
    social: f.social,
    github: f.social.github || null,
    youtube: f.social.youtube || null,
    hiring: false,
  })),
  {
    id: 'hire-1',
    name: "We're Hiring",
    role: 'Frontend · Backend · UI/UX & more',
    bio: 'Tap to view open roles and apply — we review every application.',
    skills: ['React', 'Node.js', 'Figma'],
    avatar: null,
    hiring: true,
    hiringPath: '/careers',
  },
];
