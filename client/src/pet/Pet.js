import React from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Redirect, useParams } from 'react-router-dom';
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

const update_PET = gql`
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

const DELETE_PET = gql`
  mutation deletePet($id: ID!) {
    deletePet(id: $id)
  }
`;

// const removePetFromCache = (cache, response) => {
//   const id = response.data.deletePet;
//   cache.evict({
//     id: cache.identify({ id, __typename: 'Pet' }),
//   });
// };

export const Pet = () => {
  const styles = useStyles();
  const [name, setName] = React.useState('');
  const [type, setType] = React.useState('');
  const [breed, setBreed] = React.useState('');
  const [userId, setUserId] = React.useState('');

  const { id } = useParams();
  const pet = useQuery(QUERY_PET, { variables: { id } });

  const [updatePet, updateResponse] = useMutation(update_PET, {
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

  const [deletePet, deleteResponse] = useMutation(DELETE_PET, {
    variables: { id },
    // update: removePetFromCache,
  });

  React.useEffect(() => {
    if (pet?.data?.pet) {
      setName(pet.data.pet.name);
      setType(pet.data.pet.type);
      setBreed(pet.data.pet.breed);
      setUserId(pet.data.pet.userId);
    }
  }, [pet, setName, setType, setBreed]);

  if (deleteResponse?.data) {
    return <Redirect to="/dashboard/test-default-user-001" />;
  }

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
            onClick={updatePet}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={styles.button}
            onClick={deletePet}
          >
            Delete
          </Button>
          {updateResponse?.error?.message && (
            <Typography className={styles.error}>
              Error: {error.message}
            </Typography>
          )}
          {!updateResponse?.error && updateResponse?.data && (
            <div>Success!</div>
          )}
        </Box>
      </Container>
    </Layout>
  );
};
