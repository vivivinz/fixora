import BookingCard from './BookingCard.jsx';
import PageTitle from './PageTitle.jsx';

export default function BookingsPage({ bookings, statusFilter, onStatusFilterChange, onOpenBooking }) {
  const statuses = [...new Set(bookings.map((b) => b.status))];
  const visible = bookings.filter((b) => statusFilter === 'All' || b.status === statusFilter);

  return (
    <section>
      <PageTitle eyebrow="SERVICE REQUESTS" title="My bookings">
        Track every request and approval step.
      </PageTitle>
      <div className="filter-row">
        <select value={statusFilter} onChange={(event) => onStatusFilterChange(event.target.value)}>
          <option>All</option>
          {statuses.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
        <span>{visible.length} records</span>
      </div>
      {visible.map((booking) => (
        <BookingCard key={booking.id} booking={booking} onOpen={() => onOpenBooking(booking)} />
      ))}
    </section>
  );
}
