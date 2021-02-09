import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Box, Card, makeStyles, Typography } from '@material-ui/core';

import catImg from '../assets/blackcat.jpeg';
import dogImg from '../assets/dog.png';

const _pets = [
  {
    id: '1234',
    name: 'Diogo',
    type: 'dog',
    breed: 'Pug',
  },
  {
    id: '2345',
    name: 'Zeke',
    type: 'dog',
    breed: 'German Shepard',
  },
  {
    id: '23sf',
    name: 'Fury',
    type: 'cat',
    breed: 'Calico',
  },
  {
    id: 'ewer',
    name: 'Zeke',
    type: 'dog',
    breed: 'German Shepard',
  },
  {
    id: 'asdf',
    name: 'Fury',
    type: 'cat',
    breed: 'Calico',
  },
];

const useStyles = makeStyles({
  container: {
    padding: '1.5rem',
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  link: {
    textDecoration: 'none',
    height: '100px',
    width: '30%',
    minWidth: '200px',
    margin: '0 0.5rem 1rem 0.5rem',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    height: '100px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  avatar: {
    margin: '0 1rem',
    width: '80px',
    height: '80px',
  },
});

export const Pets = ({ pets = _pets }) => {
  const styles = useStyles();

  return (
    <Box className={styles.container}>
      {pets.map((pet) => {
        let img;

        if (pet.type.toLowerCase() === 'dog') {
          img = dogImg;
        }
        if (pet.type === 'cat') {
          img = catImg;
        }

        return (
          <Link to={`/pet/${pet.id}`} key={pet.id} className={styles.link}>
            <Card className={styles.card}>
              <Avatar className={styles.avatar} src={img} />
              <Typography variant="h5">{pet.name}</Typography>
            </Card>
          </Link>
        );
      })}
    </Box>
  );
};
