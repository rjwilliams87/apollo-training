import React from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';

import { Layout } from '../layout';

const useStyles = makeStyles({
  form: {
    width: '50%',
    height: '300px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
  },
  heading: {
    marginBottom: '1rem',
    fontSize: '2rem',
  },
  description: {
    marginBottom: '2rem',
    fontSize: '1rem',
  },
  input: {
    marginBottom: '2rem',
  },
  button: {
    marginBottom: '2rem',
  },
  footer: {
    fontSize: '0.8rem',
  },
  link: {
    textDecoration: 'none',
  },
  error: {
    color: 'red',
    fontStyle: 'italic',
  },
});

const QUERY_PET = gql`
  query queryPet($id: ID!) {
    pet(id: $id) {
      id
      name
      type
      breed
      userId
    }
  }
`;

const UPDATE_PET = gql`
  mutation updatePet($id: ID!, $props: PetInput!) {
    updatePet(id: $id, props: $props) {
      id
      name
      type
      breed
      userId
    }
  }
`;

export const Pet = () => {
  const styles = useStyles();
  const [name, setName] = React.useState('');
  const [type, setType] = React.useState('');
  const [breed, setBreed] = React.useState('');
  const [userId, setUserId] = React.useState('');

  const { id } = useParams();
  const pet = useQuery(QUERY_PET, { variables: { id } });

  const [update, response] = useMutation(UPDATE_PET, {
    variables: {
      id,
      props: {
        name,
        type,
        breed,
        userId,
      },
    },
    optimisticResponse: {
      id,
      name,
      type,
      breed,
      userId,
    },
  });

  React.useEffect(() => {
    if (pet?.data?.pet) {
      setName(pet.data.pet.name);
      setType(pet.data.pet.type);
      setBreed(pet.data.pet.breed);
      setUserId(pet.data.pet.userId);
    }
  }, [pet, setName, setType, setBreed]);

  return (
    <Layout>
      <Container>
        <Box className={styles.form}>
          <Typography variant="h1" className={styles.heading}>
            {pet?.data?.pet?.name}
          </Typography>
          <TextField
            label="name"
            variant="outlined"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="type"
            variant="outlined"
            className={styles.input}
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <TextField
            label="breed"
            variant="outlined"
            className={styles.input}
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            className={styles.button}
            onClick={update}
          >
            Save
          </Button>
          {response?.error?.message && (
            <Typography className={styles.error}>
              Error: {error.message}
            </Typography>
          )}
          {!response?.error && response?.data && <div>Success!</div>}
        </Box>
      </Container>
    </Layout>
  );
};
