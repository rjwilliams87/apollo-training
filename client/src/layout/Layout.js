import React from 'react';
import { Link } from 'react-router-dom';
import { Box, makeStyles, MenuItem } from '@material-ui/core';

const useStyles = makeStyles({
  page: {
    display: 'flex',
  },
  menu: {
    margin: 0,
    paddingTop: '8vh',
    height: '100vh',
    width: '200px',
    borderRight: '1px solid lightgrey',
  },
  body: {
    width: 'calc(100vw - 200px)',
  },
  link: {
    textDecoration: 'none',
  },
});

export const Layout = ({ children }) => {
  const styles = useStyles();

  return (
    <Box className={styles.page}>
      <Box className={styles.menu}>
        <Link to={`/dashboard/test-default-user-001`} className={styles.link}>
          <MenuItem>My Pets</MenuItem>
        </Link>
        <MenuItem>Account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Box>
      <Box className={styles.body}>{children}</Box>
    </Box>
  );
};
