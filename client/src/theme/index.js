import { createMuiTheme } from '@material-ui/core/styles';

const baseline = {
  padding: 0,
  margin: 0,
  boxSizing: 'border-box',
  fontFamily: 'Roboto, sans-serif',
};

const overrides = {
  MuiCssBaseline: {
    '@global': {
      '*': { ...baseline },
      html: { ...baseline },
      body: { ...baseline },
    },
  },
};

const _theme = { overrides };
export const theme = createMuiTheme(theme);
