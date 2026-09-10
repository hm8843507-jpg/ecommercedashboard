import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Avatar,
} from '@mui/material';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import { supabase } from '@/lib/supabase';
import type { Order, OrderStatus } from '@/types';
import PageHeader from '@/components/PageHeader';
import StatusPill from '@/components/StatusPill';
import AddOrderModal from '@/components/AddOrderModal';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (!error && data) setOrders(data as Order[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleAddOrder = async (data: { customer_name: string; total_amount: number; status: string }) => {
    const orderCount = orders.length + 1;
    const orderId = `#ORD-${String(orderCount).padStart(3, '0')}`;
    const { error } = await supabase.from('orders').insert({
      order_id: orderId,
      customer_name: data.customer_name,
      total_amount: data.total_amount,
      status: data.status,
    });
    if (!error) {
      setModalOpen(false);
      fetchOrders();
    }
  };

  const statuses = ['All', 'Pending', 'Shipped', 'Cancelled'];

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.order_id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = orders.filter((o) => o.status !== 'Cancelled').reduce((sum, o) => sum + Number(o.total_amount), 0);
  const pendingCount = orders.filter((o) => o.status === 'Pending').length;
  const shippedCount = orders.filter((o) => o.status === 'Shipped').length;
  const cancelledCount = orders.filter((o) => o.status === 'Cancelled').length;

  return (
    <Box>
      <PageHeader
        title="Orders Management"
        subtitle="Track and manage all customer orders"
        action={
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setModalOpen(true)}>
            Add Order
          </Button>
        }
      />

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        {[
          { label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, color: '#5e35b1', bg: 'rgba(94,53,177,0.08)' },
          { label: 'Pending', value: pendingCount, color: '#b5730a', bg: 'rgba(255,158,11,0.08)' },
          { label: 'Shipped', value: shippedCount, color: '#1b8362', bg: 'rgba(38,194,129,0.08)' },
          { label: 'Cancelled', value: cancelledCount, color: '#c62828', bg: 'rgba(239,68,68,0.08)' },
        ].map((card) => (
          <Box
            key={card.label}
            sx={{ flex: '1 1 140px', borderRadius: 3, bgcolor: card.bg, p: 2, border: '1px solid #eceef5' }}
          >
            <Typography sx={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 500, mb: 0.5 }}>
              {card.label}
            </Typography>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, color: card.color }}>{card.value}</Typography>
          </Box>
        ))}
      </Box>

      <Paper sx={{ borderRadius: 3, border: '1px solid #eceef5', overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #f0f0f5', display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search by order ID or customer…"
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
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {statuses.map((s) => (
              <Chip
                key={s}
                label={s}
                clickable
                onClick={() => setStatusFilter(s)}
                sx={{
                  bgcolor: statusFilter === s ? 'rgba(94,53,177,0.1)' : '#f4f5fa',
                  color: statusFilter === s ? '#5e35b1' : '#6b7280',
                  fontWeight: 600,
                  '&:hover': { bgcolor: 'rgba(94,53,177,0.08)' },
                }}
              />
            ))}
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#fafbff' }}>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                    <Typography color="#9ca3af">Loading orders…</Typography>
                  </TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                    <Typography color="#9ca3af">No orders found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((order) => (
                  <TableRow key={order.id} sx={{ '&:hover': { bgcolor: '#fafbff' } }}>
                    <TableCell sx={{ fontWeight: 600, color: '#5e35b1' }}>{order.order_id}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ width: 36, height: 36, bgcolor: '#5e35b1', fontSize: '0.8rem' }}>
                          {order.customer_name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                        </Avatar>
                        <Typography sx={{ fontWeight: 500, color: '#1e1e2e', fontSize: '0.875rem' }}>
                          {order.customer_name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: '#9ca3af', fontSize: '0.8125rem' }}>
                      {new Date(order.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#1e1e2e' }}>
                      ${Number(order.total_amount).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <StatusPill status={order.status as OrderStatus} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <AddOrderModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleAddOrder} />
    </Box>
  );
}
