import { ThemeProvider, CssBaseline } from '@mui/material';
import { HashRouter, Routes, Route } from 'react-router-dom';
import theme from '@/theme';
import { LayoutProvider } from '@/context/LayoutContext';
import Layout from '@/components/Layout';
import DashboardPage from '@/pages/DashboardPage';
import UsersPage from '@/pages/UsersPage';
import ProductsPage from '@/pages/ProductsPage';
import OrdersPage from '@/pages/OrdersPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LayoutProvider>
        <HashRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/orders" element={<OrdersPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </LayoutProvider>
    </ThemeProvider>
  );
}

export default App;
