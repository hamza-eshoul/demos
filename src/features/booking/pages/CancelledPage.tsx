import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Button } from '@/components/ui/button';
import DemoPage from '@/components/DemoPage';
import PageFooter from '@/components/PageFooter';
import { useThemeStore } from '@/stores/themeStore';
import { BOOKING_STACK } from '../constants/booking.constants';
import { useCancelMutation } from '../hooks/useBookingMutations';

const CancelledPage = () => {
  const [params] = useSearchParams();
  const token = params.get('token') ?? '';
  const cancelMutation = useCancelMutation(token);
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const { mutate } = cancelMutation;

  useEffect(() => {
    if (token) mutate();
  }, [token, mutate]);

  return (
    <DemoPage
      theme={theme}
      onToggleTheme={toggleTheme}
      backTo={{ to: '/booking', label: 'Back to booking' }}
    >
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Payment cancelled
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          {cancelMutation.isSuccess
            ? 'The slot you were holding is free again for everyone.'
            : 'Releasing the slot you were holding.'}
        </p>
      </header>
      <Button
        className="w-fit bg-brand text-brand-foreground hover:bg-brand/90"
        asChild
      >
        <Link to="/booking">Try again</Link>
      </Button>
      <PageFooter stack={BOOKING_STACK} />
    </DemoPage>
  );
};

export default CancelledPage;
