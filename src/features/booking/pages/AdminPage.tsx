import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import DemoPage from '@/components/DemoPage';
import PageFooter from '@/components/PageFooter';
import { useThemeStore } from '@/stores/themeStore';
import { BOOKING_STACK } from '../constants/booking.constants';
import {
  useAdminBookingsQuery,
  useAdminSummaryQuery,
} from '../hooks/useBookingQueries';
import AdminStatTiles from '../components/admin/AdminStatTiles';
import WeekCalendar from '../components/admin/WeekCalendar';
import BookingsTable from '../components/admin/BookingsTable';
import { WeekCalendarUtils } from '../utils/WeekCalendarUtils';

const AdminPage = () => {
  const summaryQuery = useAdminSummaryQuery();
  const bookingsQuery = useAdminBookingsQuery();
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const bookings = bookingsQuery.data ?? [];

  return (
    <DemoPage
      theme={theme}
      onToggleTheme={toggleTheme}
      backTo={{ to: '/booking', label: 'Back to the booking page' }}
    >
      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-brand/10 text-brand">Owner view</Badge>
          <Badge variant="outline">Read-only, no login for the demo</Badge>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Bookings and revenue
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          What the business owner opens in the morning. Your own test booking
          shows up here the moment the webhook confirms it.
        </p>
      </header>
      {summaryQuery.data ? (
        <AdminStatTiles summary={summaryQuery.data} />
      ) : (
        <Skeleton className="h-24 rounded-lg" />
      )}
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">
          Next 7 days
        </h2>
        <WeekCalendar days={WeekCalendarUtils.upcomingWeek(bookings)} />
      </section>
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">
          All bookings
        </h2>
        {bookingsQuery.isLoading ? (
          <Skeleton className="h-48 rounded-xl" />
        ) : (
          <BookingsTable bookings={bookings} />
        )}
      </section>
      <PageFooter stack={BOOKING_STACK} />
    </DemoPage>
  );
};

export default AdminPage;
