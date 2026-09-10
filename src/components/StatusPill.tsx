import { Chip } from '@mui/material';

type PillStatus = 'Active' | 'Inactive' | 'Pending' | 'Shipped' | 'Cancelled';

const config: Record<PillStatus, { color: string; bgcolor: string }> = {
  Active: { color: '#1b8362', bgcolor: '#e3f7ee' },
  Inactive: { color: '#8a92a6', bgcolor: '#eef0f6' },
  Pending: { color: '#b5730a', bgcolor: '#fff5e0' },
  Shipped: { color: '#1b8362', bgcolor: '#e3f7ee' },
  Cancelled: { color: '#c62828', bgcolor: '#fee8e8' },
};

export default function StatusPill({ status }: { status: PillStatus }) {
  const c = config[status] ?? { color: '#4b5563', bgcolor: '#f4f5fa' };
  return (
    <Chip
      label={status}
      size="small"
      sx={{
        color: c.color,
        bgcolor: c.bgcolor,
        fontWeight: 600,
        fontSize: '0.75rem',
        height: 24,
        '& .MuiChip-label': { px: 1.5 },
      }}
    />
  );
}
