import { defaultTheme } from 'react-admin';

export const adminTheme = {
  ...defaultTheme,
  palette: {
    primary: {
      main: '#171717', // neutral-900 in your current theme
    },
    secondary: {
      main: '#525252', // neutral-600 in your current theme
    },
    background: {
      default: '#fafafa', // neutral-50 in your current theme
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0.375rem', // rounded-md in Tailwind
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          backgroundColor: '#171717',
          '&:hover': {
            backgroundColor: '#262626',
          },
        },
        outlined: {
          borderColor: '#d4d4d4',
          color: '#525252',
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '0.375rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          color: '#171717',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'white',
          borderRight: '1px solid #e5e5e5',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '0.25rem',
        },
      },
    },
  },
  typography: {
    fontFamily: 'inherit',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
};