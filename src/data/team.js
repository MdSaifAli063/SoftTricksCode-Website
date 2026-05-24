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
    role: 'Full-Stack Developer',
    bio: 'Join our team and build the future of software with us.',
    skills: ['React', 'Node.js'],
    avatar: null,
    hiring: true,
  },
];
