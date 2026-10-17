import { useThemeStore } from '@/stores/themeStore';
import ThemeToggle from '@/components/ThemeToggle';
import { useOrdersDemo } from '../hooks/useOrdersDemo';
import DemoHeader from '../components/header/DemoHeader';
import ScenarioActions from '../components/header/ScenarioActions';
import StateErrorCard from '../components/header/StateErrorCard';
import ComparisonGrid from '../components/comparison/ComparisonGrid';
import BrokenSideCard from '../components/comparison/BrokenSideCard';
import FixedSideCard from '../components/comparison/FixedSideCard';
import FixesSection from '../components/sections/FixesSection';
import OfferSection from '../components/sections/OfferSection';
import PageFooter from '../components/sections/PageFooter';

const OrdersDuplicatesPage = () => {
  const demo = useOrdersDemo();
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-12 md:py-20">
      <div className="flex flex-col gap-8">
        <div className="flex items-start justify-between gap-4">
          <DemoHeader />
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
        <ScenarioActions
          activeScenario={demo.activeScenario}
          onRun={demo.run}
        />
        {demo.isError && <StateErrorCard />}
      </div>
      <ComparisonGrid>
        <BrokenSideCard side={demo.broken} />
        <FixedSideCard side={demo.fixed} />
      </ComparisonGrid>
      <FixesSection />
      <OfferSection />
      <PageFooter />
    </main>
  );
};

export default OrdersDuplicatesPage;
