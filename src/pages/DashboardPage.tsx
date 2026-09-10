import { useEffect, useState, type ReactNode } from 'react';
import {
  Grid2,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  ArrowDropDown as ArrowDownIcon,
  ArrowDropUp as ArrowUpIcon,
  MoreHoriz as MoreIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Pending as PendingIcon,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { supabase } from '@/lib/supabase';
import type { Order } from '@/types';
import StatusPill from '@/components/StatusPill';

const monthlyData = [
  { month: 'Jan', value: 22 },
  { month: 'Feb', value: 40 },
  { month: 'Mar', value: 28 },
  { month: 'Apr', value: 55 },
  { month: 'May', value: 35 },
  { month: 'Jun', value: 65 },
  { month: 'Jul', value: 45 },
  { month: 'Aug', value: 78 },
  { month: 'Sep', value: 52 },
  { month: 'Oct', value: 88 },
  { month: 'Nov', value: 38 },
  { month: 'Dec', value: 70 },
];

interface MiniStatProps {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: ReactNode;
  iconBg: string;
  iconColor: string;
  extra: string;
}

function MiniStatCard({ title, value, trend, trendUp, icon, iconBg, iconColor, extra }: MiniStatProps) {
  return (
    <Card sx={{ borderRadius: '12px', border: '1px solid #eceef5', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
      <CardContent sx={{ p: '12px 14px', '&:last-child': { pb: '12px' } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.8 }}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: 1,
              bgcolor: iconBg,
              color: iconColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& svg': { fontSize: 16 },
            }}
          >
            {icon}
          </Box>
          <IconButton size="small" sx={{ p: 0, color: '#c4c4c4' }}>
            <MoreIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
        <Typography sx={{ fontSize: 11, color: '#909090', fontWeight: 500, mb: 0.3 }}>{title}</Typography>
        <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#17233b', lineHeight: 1.2 }}>{value}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', color: trendUp ? '#26c281' : '#ef4444' }}>
            {trendUp ? <ArrowUpIcon sx={{ fontSize: 14 }} /> : <ArrowDownIcon sx={{ fontSize: 14 }} />}
            <Typography sx={{ fontSize: 11, fontWeight: 600, color: trendUp ? '#26c281' : '#ef4444' }}>
              {trend}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: 11, color: '#909090' }}>{extra}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0, revenue: 0 });

  useEffect(() => {
    (async () => {
      const [{ count: userCount }, { count: productCount }, { data: orderData }] = await Promise.all([
        supabase.from('users').select('*', { count: 'exact', head: true }),
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*'),
      ]);

      if (orderData) {
        setRecentOrders(orderData.slice(0, 5) as Order[]);
        const totalRevenue = orderData
          .filter((o) => o.status !== 'Cancelled')
          .reduce((sum, o) => sum + Number(o.total_amount), 0);
        setStats({
          users: userCount ?? 0,
          products: productCount ?? 0,
          orders: orderData.length,
          revenue: Math.round(totalRevenue),
        });
      }
    })();
  }, []);

  return (
    <Box>
      {/* Metrics row */}
      <Grid2 container spacing={1.5} sx={{ mb: 1.5 }}>
        <Grid2 size={{ xs: 6, sm: 3 }}>
          <MiniStatCard
            title="Total Users"
            value={String(stats.users)}
            trend="12.5%"
            trendUp
            icon={<CheckCircleIcon />}
            iconBg="rgba(94,53,177,0.1)"
            iconColor="#673ab7"
            extra="vs prev month"
          />
        </Grid2>
        <Grid2 size={{ xs: 6, sm: 3 }}>
          <MiniStatCard
            title="Total Products"
            value={String(stats.products)}
            trend="8.2%"
            trendUp
            icon={<TrendingUpIcon />}
            iconBg="rgba(38,194,129,0.1)"
            iconColor="#26c281"
            extra="vs prev month"
          />
        </Grid2>
        <Grid2 size={{ xs: 6, sm: 3 }}>
          <MiniStatCard
            title="Total Orders"
            value={String(stats.orders)}
            trend="23%"
            trendUp
            icon={<PendingIcon />}
            iconBg="rgba(255,158,11,0.1)"
            iconColor="#ff9e0b"
            extra="vs prev week"
          />
        </Grid2>
        <Grid2 size={{ xs: 6, sm: 3 }}>
          <MiniStatCard
            title="Total Revenue"
            value={`$${stats.revenue.toLocaleString()}`}
            trend="18.2%"
            trendUp={false}
            icon={<TrendingDownIcon />}
            iconBg="rgba(236,64,122,0.1)"
            iconColor="#ec407a"
            extra="vs prev month"
          />
        </Grid2>
      </Grid2>

      {/* Chart + Popular Stocks */}
      <Grid2 container spacing={1.5}>
        <Grid2 size={{ xs: 12, lg: 8 }}>
          <Card sx={{ borderRadius: '12px', border: '1px solid #eceef5', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <CardContent sx={{ p: '12px 16px', '&:last-child': { pb: '12px' } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#17233b' }}>Monthly Chart</Typography>
                <Button
                  size="small"
                  endIcon={<ArrowDownIcon sx={{ fontSize: 16 }} />}
                  sx={{ fontSize: 11, color: '#909090', textTransform: 'none', minWidth: 'auto', py: 0 }}
                >
                  2025
                </Button>
              </Box>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={monthlyData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }} barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f5" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#909090' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#909090' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    cursor={{ fill: 'rgba(94,53,177,0.04)' }}
                    contentStyle={{
                      borderRadius: 8,
                      border: '1px solid #eceef5',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      fontSize: 11,
                      padding: '4px 8px',
                    }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {monthlyData.map((entry, idx) => (
                      <Cell key={idx} fill={idx === 9 ? '#673ab7' : '#ede7f6'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid2>

        <Grid2 size={{ xs: 12, lg: 4 }}>
          <Card sx={{ borderRadius: '12px', border: '1px solid #eceef5', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', height: '100%' }}>
            <CardContent sx={{ p: '12px 16px', '&:last-child': { pb: '12px' } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#17233b' }}>Popular Stocks</Typography>
                <IconButton size="small" sx={{ p: 0, color: '#c4c4c4' }}>
                  <MoreIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>
              <Box>
                {recentOrders.map((order, idx) => (
                  <Box
                    key={order.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      py: 1,
                      borderBottom: idx === recentOrders.length - 1 ? 'none' : '1px solid #f5f5f5',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: 1,
                          bgcolor:
                            order.status === 'Shipped'
                              ? 'rgba(38,194,129,0.12)'
                              : order.status === 'Pending'
                                ? 'rgba(255,158,11,0.12)'
                                : 'rgba(239,68,68,0.12)',
                          color:
                            order.status === 'Shipped'
                              ? '#26c281'
                              : order.status === 'Pending'
                                ? '#ff9e0b'
                                : '#ef4444',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          '& svg': { fontSize: 13 },
                        }}
                      >
                        {order.status === 'Shipped' ? (
                          <CheckCircleIcon />
                        ) : order.status === 'Pending' ? (
                          <PendingIcon />
                        ) : (
                          <CancelIcon />
                        )}
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: 11, fontWeight: 600, color: '#17233b' }}>
                          {order.order_id}
                        </Typography>
                        <Typography sx={{ fontSize: 10, color: '#909090' }}>{order.customer_name}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography sx={{ fontSize: 11, fontWeight: 600, color: '#17233b' }}>
                        ${Number(order.total_amount).toFixed(2)}
                      </Typography>
                      <StatusPill status={order.status as 'Pending' | 'Shipped' | 'Cancelled'} />
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
}
