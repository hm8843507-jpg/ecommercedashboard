import { NavLink } from 'react-router-dom';
import { Box, Divider, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import {
  Apps as AppsIcon,
  AssessmentOutlined as AnalyticsIcon,
  ArticleOutlined as BlogIcon,
  BarChartOutlined as ChartIcon,
  CalendarTodayOutlined as CalendarIcon,
  ChatBubbleOutline as ChatIcon,
  ContactPageOutlined as ContactIcon,
  DashboardOutlined as DashboardIcon,
  DescriptionOutlined as InvoiceIcon,
  GroupsOutlined as CustomerIcon,
  Inventory2Outlined as EcommerceIcon,
  ViewKanbanOutlined as KanbanIcon,
  MailOutline as MailIcon,
  PeopleOutline as UsersIcon,
  ReceiptLongOutlined as OrderIcon,
  SupportAgentOutlined as CrmIcon,
} from '@mui/icons-material';

interface MenuItem {
  label: string;
  icon: JSX.Element;
  path?: string;
  expandable?: boolean;
}

const primaryItems: MenuItem[] = [
  { label: 'Default', icon: <AppsIcon />, path: '/' },
  { label: 'Analytics', icon: <AnalyticsIcon />, path: '/orders' },
  { label: 'Invoice', icon: <InvoiceIcon />, path: '/orders' },
  { label: 'CRM', icon: <CrmIcon />, path: '/users' },
  { label: 'Blog', icon: <BlogIcon />, path: '/products' },
];

const widgetItems: MenuItem[] = [
  { label: 'Statistics', icon: <AnalyticsIcon />, path: '/' },
  { label: 'Data', icon: <InvoiceIcon />, path: '/users' },
  { label: 'Chart', icon: <ChartIcon />, path: '/' },
];

const applicationItems: MenuItem[] = [
  { label: 'Users', icon: <UsersIcon />, path: '/users', expandable: true },
  { label: 'Customer', icon: <CustomerIcon />, path: '/users', expandable: true },
  { label: 'Order', icon: <OrderIcon />, path: '/orders', expandable: true },
  { label: 'Chat', icon: <ChatIcon />, path: '/orders' },
  { label: 'Kanban', icon: <KanbanIcon />, path: '/orders' },
  { label: 'Mail', icon: <MailIcon />, path: '/orders' },
  { label: 'Calendar', icon: <CalendarIcon />, path: '/orders' },
  { label: 'Contact', icon: <ContactIcon />, path: '/users', expandable: true },
  { label: 'E-commerce', icon: <EcommerceIcon />, path: '/products', expandable: true },
  { label: 'Invoice', icon: <InvoiceIcon />, path: '/orders', expandable: true },
];

function MenuGroup({ items }: { items: MenuItem[] }) {
  return (
    <Box>
      {items.map((item) => (
        <ListItemButton
          key={item.label}
          component={NavLink}
          to={item.path ?? '/'}
          end={item.label === 'Default'}
          sx={{
            minHeight: 31,
            px: 0.75,
            mx: 0.5,
            my: 0.25,
            borderRadius: 1,
            '&.active': {
              bgcolor: 'rgba(103, 58, 183, 0.13)',
              '& .MuiListItemIcon-root, & .MuiListItemText-primary': { color: '#673ab7' },
            },
            '&:hover': { bgcolor: 'rgba(103, 58, 183, 0.08)' },
          }}
        >
          <ListItemIcon sx={{ minWidth: 25, color: '#657184', '& svg': { fontSize: 15 } }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{ fontSize: 10, color: '#536174', lineHeight: 1.2 }}
          />
          {item.expandable && <Typography sx={{ color: '#8792a3', fontSize: 12, mr: 0.3 }}>⌄</Typography>}
        </ListItemButton>
      ))}
    </Box>
  );
}

export default function SidebarContent() {
  return (
    <Box sx={{ height: '100%', bgcolor: '#fff', color: '#536174', overflow: 'hidden' }}>
      <Box sx={{ height: 34, display: 'flex', alignItems: 'center', gap: 0.7, px: 1.1 }}>
        <Box sx={{ color: '#283593', display: 'flex', alignItems: 'center' }}>
          <DashboardIcon sx={{ fontSize: 20 }} />
        </Box>
        <Typography sx={{ color: '#17233b', fontSize: 13, fontWeight: 800, letterSpacing: 0.2 }}>
          BERRY
        </Typography>
      </Box>

      <Box sx={{ px: 0.8, pt: 0.8, pb: 0.4 }}>
        <Typography sx={{ color: '#1d2a43', fontSize: 9.5, fontWeight: 700, mb: 0.5 }}>Dashboard</Typography>
        <MenuGroup items={primaryItems} />
      </Box>

      <Divider sx={{ mx: 0.8, borderColor: '#e6eaf0' }} />
      <Box sx={{ px: 0.8, py: 0.75 }}>
        <Typography sx={{ color: '#1d2a43', fontSize: 9.5, fontWeight: 700, mb: 0.5 }}>Widget</Typography>
        <MenuGroup items={widgetItems} />
      </Box>

      <Divider sx={{ mx: 0.8, borderColor: '#e6eaf0' }} />
      <Box sx={{ px: 0.8, py: 0.75 }}>
        <Typography sx={{ color: '#1d2a43', fontSize: 9.5, fontWeight: 700, mb: 0.5 }}>Application</Typography>
        <MenuGroup items={applicationItems} />
      </Box>
    </Box>
  );
}
