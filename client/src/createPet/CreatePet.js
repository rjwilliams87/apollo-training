import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Redirect, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';

import { Layout } from '../layout';
import { QUERY_USER } from '../dashboard';

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

const CREATE_PET = gql`
  mutation createPet($props: PetInput!) {
    createPet(props: $props) {
      id
      name
      type
      breed
      userId
    }
  }
`;

export const CreatePet = () => {
  const styles = useStyles();
  const { userId } = useParams();
  const [name, setName] = React.useState('');
  const [type, setType] = React.useState('');
  const [breed, setBreed] = React.useState('');
  const [create, { data, loading, error }] = useMutation(CREATE_PET, {
    variables: {
      props: {
        name,
        type,
        breed,
        userId,
      },
    },
    // awaitRefetchQueries: true,
    // refetchQueries: [
    //   {
    //     query: QUERY_USER,
    //     variables: {
    //       id: userId,
    //     },
    //   },
    // ],
  });

  if (data?.createPet?.id) {
    return <Redirect to={`/pet/${data.createPet.id}`} />;
  }

  return (
    <Layout>
      <Container>
        <Box className={styles.form}>
          <Typography variant="h1" className={styles.heading}>
            Add A New Pet
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
          {!loading && !error && (
            <Button
              variant="contained"
              color="primary"
              className={styles.button}
              onClick={create}
            >
              Create
            </Button>
          )}
          {!error && loading && <CircularProgress />}
          {error?.message && (
            <Typography className={styles.error}>
              Error: {error.message}
            </Typography>
          )}
        </Box>
      </Container>
    </Layout>
  );
};
