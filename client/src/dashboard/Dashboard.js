import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import {
  Avatar,
  Box,
  CircularProgress,
  Fab,
  makeStyles,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import photo from '../assets/steve-brule.jpeg';
import { Layout } from '../layout';
import { Pets } from '../pets';

const useStyles = makeStyles({
  body: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '25%',
    background: '#3f51b5',
  },
  info: {
    display: 'flex',
    position: 'relative',
    left: '20px',
  },
  avatar: {
    position: 'relative',
    width: '150px',
    height: '150px',
    bottom: '35px',
  },
  userBox: {
    marginTop: '1rem',
    marginLeft: '1rem',
  },
  addButton: {
    marginLeft: '1.5rem',
  },
});

export const QUERY_USER = gql`
  query queryUser($id: ID!) {
    user(id: $id) {
      id
      name {
        first
        last
      }
      username
      pets {
        id
        name
      }
      zip
      city @client
    }
  }
`;

export const Dashboard = () => {
  const styles = useStyles();
  const { id } = useParams();
  const { data, loading, error } = useQuery(QUERY_USER, { variables: { id } });

  return (
    <Layout>
      <Box className={styles.body}>
        {error?.message && <div>This is very bad!</div>}
        {loading && !error && <CircularProgress />}
        {!loading && !error && data?.user && (
          <>
            <Box className={styles.image} />
            <Box className={styles.info}>
              <Avatar className={styles.avatar} src={photo} />
              <Box className={styles.userBox}>
                <Typography variant="h6">
                  {data?.user?.name?.first} {data?.user?.name?.last}
                </Typography>
                <Typography>{data?.user?.username}</Typography>
                <Typography>{data?.user?.city}</Typography>
              </Box>
            </Box>
            <Box>
              <Pets pets={data?.user?.pets} />
            </Box>
            <Link to={`/pet/new/${id}`} className={styles.addButton}>
              <Fab color="primary" aria-label="edit">
                <AddIcon />
              </Fab>
            </Link>
          </>
        )}
      </Box>
    </Layout>
  );
};
