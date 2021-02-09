const zipToCity = (value) => {
  if (value !== '64111') {
    return value;
  }
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
