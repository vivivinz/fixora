import { BOOKING_STATUSES } from '../data/bookings.js';
import BackLink from './BackLink.jsx';
import PageTitle from './PageTitle.jsx';

export default function BookingDetailPage({ booking, onBack, onApproveQuote, onDeclineQuote }) {
  const currentStep = BOOKING_STATUSES.indexOf(booking.status);

  return (
    <section>
      <BackLink onClick={onBack}>All bookings</BackLink>
      <PageTitle eyebrow={booking.id} title={booking.appliance}>
        {booking.issue}
      </PageTitle>

      <div className="result-card">
        <div className="result-row">
          <b>Status</b>
          <span className="status status-blue">{booking.status}</span>
        </div>
        <div className="result-row">
          <b>Technician</b>
          <span>{booking.tech}</span>
        </div>
        <div className="result-row">
          <b>Preferred schedule</b>
          <span>
            {booking.date} · {booking.time}
          </span>
        </div>
        <div className="result-row">
          <b>Ownership</b>
          <span>{booking.owner}</span>
        </div>
        <p className="demo-warning">
          Demo profile – not a real or verified technician. Booking requests are not confirmed until
          accepted and required owner authorization is complete.
        </p>
      </div>

      <h2 className="subheading">Booking progress</h2>
      <div className="timeline">
        {BOOKING_STATUSES.map((status, index) => (
          <div key={status} className={'timeline-step ' + (currentStep >= index ? 'done' : '')}>
            <span />
            {status}
          </div>
        ))}
      </div>

      {booking.status === 'Quote Sent' && (
        <div className="quote-card">
          <h3>Technician quotation</h3>
          {/* NOTE (kept from the original): fixed amounts, not the technician's actual quote. */}
          <p>Labor ₱650 · Parts ₱0 · Extra fees ₱0</p>
          <small>
            Review all costs and terms before approving. No repair work starts without your
            approval.
          </small>
          <div className="button-row">
            <button className="primary-btn" onClick={() => onApproveQuote(booking.id)}>
              Approve quote
            </button>
            <button className="secondary-btn" onClick={() => onDeclineQuote(booking.id)}>
              Decline
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
