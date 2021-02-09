// import { makeVar } from '@apollo/client';

const zipToCity = (value) => {
  return 'Kansas City, MO';
};

export const typePolicies = {
  User: {
    fields: {
      city: {
        read(_, { readField }) {
          const zip = readField('zip');
          const city = zipToCity(zip);
          return city;
        },
      },
    },
  },
};
