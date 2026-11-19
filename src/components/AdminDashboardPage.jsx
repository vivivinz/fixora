import { isActiveBooking } from '../data/bookings.js';
import PageTitle from './PageTitle.jsx';

export default function AdminDashboardPage({ bookings, technicians, onOpenTechnicians }) {
  return (
    <section>
      <PageTitle eyebrow="PILOT OPERATOR" title="Admin dashboard">
        Manage demo technicians, booking records, and indicative settings.
      </PageTitle>
      <div className="metric-grid">
        <div className="metric">
          <small>Total bookings</small>
          <b>{bookings.length}</b>
        </div>
        <div className="metric">
          <small>Active requests</small>
          <b>{bookings.filter(isActiveBooking).length}</b>
        </div>
        <div className="metric">
          <small>Pending verification</small>
          <b>{technicians.filter((tech) => !tech.verified).length}</b>
        </div>
      </div>

      <h2 className="subheading">Booking overview</h2>
      {bookings.slice(0, 5).map((booking) => (
        <div className="compact-row" key={booking.id}>
          <div>
            <b>{booking.id}</b>
            <small>
              {booking.appliance} · {booking.customer}
            </small>
          </div>
          <span className="status status-blue">{booking.status}</span>
        </div>
      ))}
      <button className="secondary-btn full" onClick={onOpenTechnicians}>
        Open technician verification queue
      </button>
    </section>
  );
}
