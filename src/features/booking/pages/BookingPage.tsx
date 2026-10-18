import { Link } from 'react-router';
import DemoPage from '@/components/DemoPage';
import PageFooter from '@/components/PageFooter';
import { useThemeStore } from '@/stores/themeStore';
import { BOOKING_STACK } from '../constants/booking.constants';
import { useBookingFlow } from '../hooks/useBookingFlow';
import BookingHeader from '../components/header/BookingHeader';
import TestCardNotice from '../components/header/TestCardNotice';
import ServicePicker from '../components/services/ServicePicker';
import SlotPicker from '../components/slots/SlotPicker';
import BookingSummaryCard from '../components/summary/BookingSummaryCard';
import HowItsBuiltSection from '../components/sections/HowItsBuiltSection';
import BookingOfferSection from '../components/sections/BookingOfferSection';
import { ApiErrorUtils } from '../utils/ApiErrorUtils';

const BookingPage = () => {
  const flow = useBookingFlow();
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <DemoPage theme={theme} onToggleTheme={toggleTheme}>
      <div className="flex flex-col gap-6">
        <BookingHeader />
        <TestCardNotice />
        <p className="text-sm text-muted-foreground">
          Curious what the owner sees?{' '}
          <Link to="/booking/admin" className="underline underline-offset-4">
            Open the admin view
          </Link>
          .
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:items-start">
        <div className="flex flex-col gap-8">
          {flow.isServicesError && (
            <p className="rounded-xl bg-risk/10 p-4 text-sm text-risk">
              The booking API is not reachable right now.
            </p>
          )}
          <ServicePicker
            services={flow.services}
            selectedId={flow.service?.id ?? null}
            isLoading={flow.isLoadingServices}
            onSelect={flow.selectService}
          />
          <SlotPicker
            key={flow.service?.id ?? 'none'}
            title="2. Pick a slot"
            slots={flow.slots}
            isLoading={flow.isLoadingSlots}
            isEnabled={flow.service !== null}
            selected={flow.slot}
            onSelect={flow.selectSlot}
          />
        </div>
        <BookingSummaryCard
          service={flow.service}
          slot={flow.slot}
          customerName={flow.customerName}
          customerEmail={flow.customerEmail}
          isSubmitting={flow.isSubmitting}
          errorMessage={ApiErrorUtils.message(flow.submitError)}
          onNameChange={flow.setCustomerName}
          onEmailChange={flow.setCustomerEmail}
          onSubmit={flow.submit}
        />
      </div>
      <HowItsBuiltSection />
      <BookingOfferSection />
      <PageFooter stack={BOOKING_STACK} />
    </DemoPage>
  );
};

export default BookingPage;
