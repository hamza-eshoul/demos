import { Link, useSearchParams } from 'react-router';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import DemoPage from '@/components/DemoPage';
import PageFooter from '@/components/PageFooter';
import { useThemeStore } from '@/stores/themeStore';
import { BOOKING_STACK } from '../constants/booking.constants';
import { useConfirmedBooking } from '../hooks/useConfirmedBooking';
import ConfirmationSteps from '../components/confirmed/ConfirmationSteps';
import BookingDetailsCard from '../components/confirmed/BookingDetailsCard';
import EmailPreviewCard from '../components/confirmed/EmailPreviewCard';

const ConfirmedPage = () => {
  const [params] = useSearchParams();
  const token = params.get('token');
  const confirmed = useConfirmedBooking(token);
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const booking = confirmed.booking;
  const confirmationEmail = booking?.emails.find(
    (email) => email.kind === 'confirmation',
  );

  return (
    <DemoPage
      theme={theme}
      onToggleTheme={toggleTheme}
      backTo={{ to: '/booking', label: 'Book another slot' }}
    >
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {booking?.status === 'confirmed'
            ? 'Your booking is confirmed'
            : 'Thanks, checking your payment'}
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          This page polls the API until Stripe's webhook lands. Watch the steps
          turn green, then read the email below.
        </p>
      </header>
      {confirmed.isLoading && <Skeleton className="h-40 rounded-2xl" />}
      {(confirmed.isError || !token) && (
        <p className="rounded-xl bg-risk/10 p-4 text-sm text-risk">
          This link is not valid.
        </p>
      )}
      {booking && (
        <div className="grid gap-6 lg:grid-cols-2">
          <ConfirmationSteps
            booking={booking}
            isWaiting={confirmed.isWaiting}
            timedOut={confirmed.timedOut}
          />
          <BookingDetailsCard booking={booking} />
        </div>
      )}
      {confirmationEmail && <EmailPreviewCard email={confirmationEmail} />}
      {booking && token && (
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" asChild>
            <Link to={`/booking/manage/${token}`}>Reschedule or cancel</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/booking/admin">See it in the admin</Link>
          </Button>
        </div>
      )}
      <PageFooter stack={BOOKING_STACK} />
    </DemoPage>
  );
};

export default ConfirmedPage;
