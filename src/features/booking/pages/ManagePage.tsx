import { useParams } from 'react-router';
import { Skeleton } from '@/components/ui/skeleton';
import DemoPage from '@/components/DemoPage';
import PageFooter from '@/components/PageFooter';
import { useThemeStore } from '@/stores/themeStore';
import { BOOKING_STACK } from '../constants/booking.constants';
import { useManageBooking } from '../hooks/useManageBooking';
import BookingDetailsCard from '../components/confirmed/BookingDetailsCard';
import EmailPreviewCard from '../components/confirmed/EmailPreviewCard';
import ManageActions from '../components/manage/ManageActions';
import { ApiErrorUtils } from '../utils/ApiErrorUtils';

const ManagePage = () => {
  const { token = '' } = useParams();
  const manage = useManageBooking(token);
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const latestEmail = manage.booking?.emails.at(-1);

  return (
    <DemoPage
      theme={theme}
      onToggleTheme={toggleTheme}
      backTo={{ to: '/booking', label: 'Back to booking' }}
    >
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Manage your booking
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          You got here through the link in your email. Nobody else has it.
        </p>
      </header>
      {manage.isLoading && <Skeleton className="h-40 rounded-2xl" />}
      {manage.isError && (
        <p className="rounded-xl bg-risk/10 p-4 text-sm text-risk">
          This link is not valid.
        </p>
      )}
      {manage.booking && (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:items-start">
          <ManageActions
            booking={manage.booking}
            slots={manage.slots}
            isLoadingSlots={manage.isLoadingSlots}
            selectedSlot={manage.selectedSlot}
            isRescheduling={manage.isRescheduling}
            isCancelling={manage.isCancelling}
            errorMessage={ApiErrorUtils.message(manage.error)}
            onSelectSlot={manage.selectSlot}
            onReschedule={manage.reschedule}
            onCancel={manage.cancel}
          />
          <BookingDetailsCard booking={manage.booking} />
        </div>
      )}
      {latestEmail && <EmailPreviewCard email={latestEmail} />}
      <PageFooter stack={BOOKING_STACK} />
    </DemoPage>
  );
};

export default ManagePage;
