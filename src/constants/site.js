import { founders } from '../data/founders';

const saif = founders.find((f) => f.id === 'saif');
const ashwini = founders.find((f) => f.id === 'ashwini');

export const SITE = {
  phone: saif.phone,
  phoneTel: saif.phoneTel,
  email: 'softtrickscode@gmail.com',
  founderName: saif.name,
  founderPhoto: saif.photo,
  coFounder: {
    name: ashwini.name,
    photo: ashwini.photo,
    phone: ashwini.phone,
    phoneTel: ashwini.phoneTel,
  },
};

export { founders };
