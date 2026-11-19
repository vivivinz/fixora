import { ChevronRight, Wrench } from 'lucide-react';

export default function BookingCard({ booking, onOpen }) {
  return (
    <button className="booking-card" onClick={onOpen}>
      <div className="booking-top">
        <span className="booking-icon">
          <Wrench size={18} />
        </span>
        <span className="status status-blue">{booking.status}</span>
      </div>
      <b>{booking.appliance}</b>
      <p>{booking.issue}</p>
      <div className="booking-bottom">
        <small>
          {booking.id} · {booking.tech}
        </small>
        <ChevronRight size={18} />
      </div>
    </button>
  );
}
