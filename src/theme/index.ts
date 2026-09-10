import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5e35b1',
      light: '#8e24aa',
      dark: '#4527a0',
    },
    secondary: {
      main: '#ec407a',
      light: '#f06292',
      dark: '#d81b60',
    },
    background: {
      default: '#f4f5fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e1e2e',
      secondary: '#6b7280',
    },
    success: {
      main: '#26c281',
      light: '#2ec4b6',
    },
    warning: {
      main: '#ff9e0b',
    },
    error: {
      main: '#ef4444',
    },
    divider: '#e8eaf6',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none' },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: '#f4f5fa' },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          border: '1px solid #eceef5',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, fontWeight: 500 },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          margin: '2px 12px',
          transition: 'all 0.2s ease-in-out',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: { padding: 0 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, fontSize: '0.75rem' },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderBottom: '1px solid #f0f0f5' },
        head: {
          fontWeight: 600,
          color: '#6b7280',
          fontSize: '0.8125rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 16 },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': { borderRadius: 10 },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: { fontWeight: 600 },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': { backgroundColor: 'rgba(94, 53, 177, 0.08)' },
        },
      },
    },
  },
});

export default theme;
