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

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { title: string; price: number; stock: number; category: string; image_url: string }) => Promise<void>;
  title?: string;
  titleIcon?: ReactNode;
}

const categories = ['Electronics', 'Audio', 'Wearables', 'Accessories', 'General'];

export default function AddProductModal({
  open,
  onClose,
  onSave,
  title = 'Add Product',
  titleIcon,
}: AddProductModalProps) {
  const [productTitle, setProductTitle] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('General');
  const [imageUrl, setImageUrl] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!productTitle.trim() || !price || !stock) return;
    setSaving(true);
    await onSave({
      title: productTitle,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      category,
      image_url:
        imageUrl ||
        'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400',
    });
    setSaving(false);
    setProductTitle('');
    setPrice('');
    setStock('');
    setCategory('General');
    setImageUrl('');
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
            label="Product Title"
            fullWidth
            required
            value={productTitle}
            onChange={(e) => setProductTitle(e.target.value)}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Price ($)"
              type="number"
              fullWidth
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              inputProps={{ step: '0.01', min: '0' }}
            />
            <TextField
              label="Stock"
              type="number"
              fullWidth
              required
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              inputProps={{ min: '0' }}
            />
          </Box>
          <TextField select label="Category" fullWidth value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Image URL (optional)"
            fullWidth
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://…"
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" disabled={saving || !productTitle.trim() || !price || !stock}>
          {saving ? 'Saving…' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
