import { CreditCard } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TEST_CARD_NUMBER } from '../../constants/booking.constants';

const TestCardNotice = () => (
  <Alert className="border-brand/20 bg-brand/5">
    <CreditCard className="text-brand" />
    <AlertTitle>No money moves. Pay with the Stripe test card.</AlertTitle>
    <AlertDescription>
      Card number{' '}
      <span className="font-mono text-foreground">{TEST_CARD_NUMBER}</span>, any
      future expiry date, any 3-digit code, any postcode.
    </AlertDescription>
  </Alert>
);

export default TestCardNotice;
