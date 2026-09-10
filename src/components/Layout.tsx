import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f4f5fa' }}>
      <Sidebar />
      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box
          component="main"
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            p: { xs: 1.5, sm: 2 },
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 728 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
