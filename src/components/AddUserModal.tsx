import { useState, type ReactNode } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
  Typography,
  TextField,
  MenuItem,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { name: string; email: string; role: string; status: string }) => Promise<void>;
  title?: string;
  titleIcon?: ReactNode;
}

const roles = ['Admin', 'Editor', 'User'];
const statuses = ['Active', 'Inactive', 'Pending'];

export default function AddUserModal({ open, onClose, onSave, title = 'Add User', titleIcon }: AddUserModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('User');
  const [status, setStatus] = useState('Active');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !email.trim()) return;
    setSaving(true);
    await onSave({ name, email, role, status });
    setSaving(false);
    setName('');
    setEmail('');
    setRole('User');
    setStatus('Active');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 1 }}>
        {titleIcon}
        <Typography variant="h6" component="span" sx={{ fontWeight: 600, flex: 1 }}>
          {title}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 0.5 }}>
          <TextField label="Full Name" fullWidth required value={name} onChange={(e) => setName(e.target.value)} />
          <TextField
            label="Email Address"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField select label="Role" fullWidth value={role} onChange={(e) => setRole(e.target.value)}>
              {roles.map((r) => (
                <MenuItem key={r} value={r}>
                  {r}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Status"
              fullWidth
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {statuses.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" disabled={saving || !name.trim() || !email.trim()}>
          {saving ? 'Saving…' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
