import { BrowserRouter, Route, Routes } from 'react-router';
import OrdersDuplicatesPage from '@/features/orders-duplicates/pages/OrdersDuplicatesPage';
import BookingPage from '@/features/booking/pages/BookingPage';
import ConfirmedPage from '@/features/booking/pages/ConfirmedPage';
import CancelledPage from '@/features/booking/pages/CancelledPage';
import ManagePage from '@/features/booking/pages/ManagePage';
import AdminPage from '@/features/booking/pages/AdminPage';
import { useApplyTheme } from '@/hooks/useApplyTheme';

const App = () => {
  useApplyTheme();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OrdersDuplicatesPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/booking/confirmed" element={<ConfirmedPage />} />
        <Route path="/booking/cancelled" element={<CancelledPage />} />
        <Route path="/booking/manage/:token" element={<ManagePage />} />
        <Route path="/booking/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
