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

interface AddOrderModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { customer_name: string; total_amount: number; status: string }) => Promise<void>;
  title?: string;
  titleIcon?: ReactNode;
}

const statuses = ['Pending', 'Shipped', 'Cancelled'];

export default function AddOrderModal({
  open,
  onClose,
  onSave,
  title = 'Add Order',
  titleIcon,
}: AddOrderModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [status, setStatus] = useState('Pending');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!customerName.trim() || !totalAmount) return;
    setSaving(true);
    await onSave({ customer_name: customerName, total_amount: parseFloat(totalAmount), status });
    setSaving(false);
    setCustomerName('');
    setTotalAmount('');
    setStatus('Pending');
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
          <TextField
            label="Customer Name"
            fullWidth
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Total Amount ($)"
              type="number"
              fullWidth
              required
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              inputProps={{ step: '0.01', min: '0' }}
            />
            <TextField select label="Status" fullWidth value={status} onChange={(e) => setStatus(e.target.value)}>
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
        <Button onClick={handleSave} variant="contained" disabled={saving || !customerName.trim() || !totalAmount}>
          {saving ? 'Saving…' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
