import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Button,
  Chip,
  Box,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { supabase } from '@/lib/supabase';
import type { User, UserStatus } from '@/types';
import PageHeader from '@/components/PageHeader';
import StatusPill from '@/components/StatusPill';
import AddUserModal from '@/components/AddUserModal';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('users').select('*').order('created_at', { ascending: false });
    if (!error && data) setUsers(data as User[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (data: { name: string; email: string; role: string; status: string }) => {
    const { error } = await supabase.from('users').insert({
      name: data.name,
      email: data.email,
      role: data.role,
      status: data.status,
      avatar_url: `https://i.pravatar.cc/150?u=${data.email}`,
    });
    if (!error) {
      setModalOpen(false);
      fetchUsers();
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    await supabase.from('users').delete().eq('id', selectedUser.id);
    setMenuAnchor(null);
    setSelectedUser(null);
    fetchUsers();
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Box>
      <PageHeader
        title="Users Management"
        subtitle="Manage all users, their roles and account status"
        action={
          <Button variant="contained" startIcon={<PersonAddIcon />} onClick={() => setModalOpen(true)}>
            Add User
          </Button>
        }
      />

      <Paper sx={{ borderRadius: 3, border: '1px solid #eceef5', overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #f0f0f5' }}>
          <TextField
            placeholder="Search by name or email…"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: { xs: '100%', sm: 320 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 20, color: '#9ca3af' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#fafbff' }}>
                <TableCell>Avatar</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                    <Typography color="#9ca3af">Loading users…</Typography>
                  </TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                    <Typography color="#9ca3af">No users found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((user) => (
                  <TableRow key={user.id} sx={{ '&:hover': { bgcolor: '#fafbff' }, transition: 'background-color 0.15s' }}>
                    <TableCell>
                      <Avatar
                        src={user.avatar_url ?? undefined}
                        sx={{ width: 40, height: 40, bgcolor: '#5e35b1', fontSize: '0.85rem' }}
                      >
                        {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </Avatar>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#1e1e2e' }}>{user.name}</TableCell>
                    <TableCell sx={{ color: '#6b7280' }}>{user.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.role}
                        size="small"
                        sx={{
                          bgcolor:
                            user.role === 'Admin'
                              ? 'rgba(94,53,177,0.1)'
                              : user.role === 'Editor'
                                ? 'rgba(38,194,129,0.1)'
                                : 'rgba(148,163,184,0.1)',
                          color: user.role === 'Admin' ? '#5e35b1' : user.role === 'Editor' ? '#1b8362' : '#64748b',
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <StatusPill status={user.status as UserStatus} />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          setSelectedUser(user);
                          setMenuAnchor(e.currentTarget);
                        }}
                      >
                        <MoreVertIcon fontSize="small" sx={{ color: '#6b7280' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <AddUserModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleAddUser} />

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => {
          setMenuAnchor(null);
          setSelectedUser(null);
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          onClick={() => {
            setMenuAnchor(null);
            setSelectedUser(null);
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: '#ef4444' }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" sx={{ color: '#ef4444' }} />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}
