import { AppBar, Toolbar, IconButton, Box, Typography } from '@mui/material';
import { Menu as MenuIcon, NotificationsNone as BellIcon, SettingsOutlined as GearIcon, PersonOutline as UserIcon } from '@mui/icons-material';
import { useLayout } from '@/context/LayoutContext';

export default function Header() {
  const { toggleSidebar } = useLayout();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: '#fff',
        borderBottom: '1px solid #e6eaf0',
        boxShadow: 'none',
        zIndex: (t) => t.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ minHeight: '34px !important', px: '10px' }}>
        <IconButton onClick={toggleSidebar} sx={{ color: '#909090', p: '3px', mr: '4px' }}>
          <MenuIcon sx={{ fontSize: 16 }} />
        </IconButton>

        <Box sx={{ flex: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <IconButton sx={{ color: '#909090', p: '4px' }}>
            <UserIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <IconButton sx={{ color: '#909090', p: '4px' }}>
            <GearIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <IconButton sx={{ color: '#909090', p: '4px' }}>
            <BellIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <Box
            sx={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              bgcolor: '#e8eaf6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              ml: '4px',
            }}
          >
            <Typography sx={{ fontSize: 9, color: '#555', fontWeight: 700 }}>U</Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
