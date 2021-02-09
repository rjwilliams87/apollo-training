import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '100vh',
    padding: '0',
    margin: '0',
    display: 'flex',
  },
  forms: {
    width: '50%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  copy: {
    width: '50%',
    height: '100%',
    background: '#3f51b5',
  },
});

export const Landing = ({ form: Form }) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.forms}>
        <Form />
      </div>
      <div className={styles.copy}></div>
    </div>
  );
};
