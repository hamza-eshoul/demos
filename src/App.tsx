import OrdersDuplicatesPage from '@/features/orders-duplicates/pages/OrdersDuplicatesPage';
import { useApplyTheme } from '@/hooks/useApplyTheme';

const App = () => {
  useApplyTheme();

  return <OrdersDuplicatesPage />;
};

export default App;
