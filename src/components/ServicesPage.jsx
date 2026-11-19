import CategoryGrid from './CategoryGrid.jsx';
import PageTitle from './PageTitle.jsx';

export default function ServicesPage({ onPickCategory }) {
  return (
    <section>
      <PageTitle title="All services">Select a service to begin a guided assessment.</PageTitle>
      <CategoryGrid onPick={onPickCategory} />
    </section>
  );
}
