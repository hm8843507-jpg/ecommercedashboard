import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Drawer, Box } from '@mui/material';
import SidebarContent from './SidebarContent';
import { useLayout } from '@/context/LayoutContext';

const drawerWidth = 157;

export default function Sidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const { mobileOpen, setMobileOpen } = useLayout();

  return (
    <Box component="nav" sx={{ flexShrink: 0, width: { lg: drawerWidth } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen && isMobile}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', border: 'none' },
        }}
      >
        <SidebarContent />
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', lg: 'block' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            border: 'none',
            borderRight: '1px solid #e2e8ef',
          },
        }}
        open
      >
        <SidebarContent />
      </Drawer>
    </Box>
  );
}
