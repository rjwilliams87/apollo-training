import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Link, Redirect } from 'react-router-dom';
import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';

import { Landing } from '../Landing';

const useStyles = makeStyles({
  form: {
    width: '65%',
    height: '300px',
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
});

const LOGIN = gql`
  mutation loginUser($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

export const LoginForm = () => {
  const styles = useStyles();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [login, { data, loading, error }] = useMutation(LOGIN, {
    variables: {
      username,
      password,
    },
  });

  if (data?.login) {
    return <Redirect to={`/dashboard/${data?.login}`} />;
  }

  return (
    <Box className={styles.form}>
      <Typography variant="h1" className={styles.heading}>
        Login
      </Typography>
      <Typography variant="h1" className={styles.description}>
        Welcome back! Login to see some real cool shit.
      </Typography>
      <TextField
        label="username"
        variant="outlined"
        className={styles.input}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="password"
        variant="outlined"
        className={styles.input}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        className={styles.button}
        onClick={login}
      >
        Login
      </Button>
      <Typography className={styles.footer}>
        Not registered?{' '}
        <Link to="/signup" className={styles.link}>
          Sign up today.
        </Link>
      </Typography>
    </Box>
  );
};

export const Login = () => <Landing form={LoginForm} />;
