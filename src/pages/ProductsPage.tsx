import { useEffect, useState } from 'react';
import {
  Grid2,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Inventory2 as InventoryIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/types';
import PageHeader from '@/components/PageHeader';
import AddProductModal from '@/components/AddProductModal';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setProducts(data as Product[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (data: {
    title: string;
    price: number;
    stock: number;
    category: string;
    image_url: string;
  }) => {
    const { error } = await supabase.from('products').insert(data);
    if (!error) {
      setModalOpen(false);
      fetchProducts();
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from('products').delete().eq('id', id);
    fetchProducts();
  };

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  const filtered = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <Box>
      <PageHeader
        title="Products Management"
        subtitle="Browse and manage your product catalog"
        action={
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setModalOpen(true)}>
            Add Product
          </Button>
        }
      />

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Search products…"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: { xs: '100%', sm: 300 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 20, color: '#9ca3af' }} />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              clickable
              onClick={() => setCategoryFilter(cat)}
              sx={{
                bgcolor: categoryFilter === cat ? 'rgba(94,53,177,0.1)' : '#f4f5fa',
                color: categoryFilter === cat ? '#5e35b1' : '#6b7280',
                fontWeight: 600,
                '&:hover': { bgcolor: 'rgba(94,53,177,0.08)' },
              }}
            />
          ))}
        </Box>
      </Box>

      {loading ? (
        <Typography color="#9ca3af" sx={{ textAlign: 'center', py: 5 }}>
          Loading products…
        </Typography>
      ) : (
        <Grid2 container spacing={3}>
          {filtered.map((product) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.25s ease-in-out',
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={product.image_url ?? 'https://via.placeholder.com/400x300?text=No+Image'}
                  alt={product.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem', color: '#1e1e2e' }}>
                    {product.title}
                  </Typography>

                  <Chip
                    label={product.category}
                    size="small"
                    sx={{ alignSelf: 'flex-start', bgcolor: 'rgba(94,53,177,0.08)', color: '#5e35b1', fontWeight: 600 }}
                  />

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e1e2e', fontSize: '1.125rem' }}>
                      ${Number(product.price).toFixed(2)}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <InventoryIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                      <Typography
                        sx={{
                          fontSize: '0.8125rem',
                          color: product.stock < 15 ? '#c62828' : product.stock < 40 ? '#b5730a' : '#1b8362',
                          fontWeight: 600,
                        }}
                      >
                        {product.stock} in stock
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<EditIcon />}
                      sx={{ flex: 1, borderColor: '#eceef5', color: '#6b7280' }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(product.id)}
                      sx={{
                        flex: 1,
                        borderColor: '#fee8e8',
                        color: '#ef4444',
                        '&:hover': { borderColor: '#ef4444', bgcolor: 'rgba(239,68,68,0.05)' },
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      )}

      <AddProductModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleAddProduct} />
    </Box>
  );
}
