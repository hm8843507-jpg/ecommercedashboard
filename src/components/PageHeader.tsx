import { Box, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export default function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2,
        mb: 3,
      }}
    >
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 600, fontSize: { xs: '1.5rem', sm: '1.75rem' } }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography sx={{ color: '#6b7280', mt: 0.5, fontSize: '0.875rem' }}>{subtitle}</Typography>
        )}
      </Box>
      {action}
    </Box>
  );
}
