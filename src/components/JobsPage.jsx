import { isActiveBooking } from '../data/bookings.js';
import PageTitle from './PageTitle.jsx';

export default function JobsPage({ bookings, onAccept, onDecline, onPrepareQuote }) {
  return (
    <section>
      <PageTitle eyebrow="TECHNICIAN WORKSPACE" title="Job inbox">
        Review customer requests and manage repair work.
      </PageTitle>
      {bookings.filter(isActiveBooking).map((job) => (
        <div className="job-card" key={job.id}>
          <div className="result-row">
            <b>{job.appliance}</b>
            <span className="status status-blue">{job.status}</span>
          </div>
          <p>{job.issue}</p>
          <small>
            {job.id} · {job.customer} · {job.date}
          </small>
          <div className="button-row">
            <button className="primary-btn" onClick={() => onAccept(job.id)}>
              Accept
            </button>
            <button className="secondary-btn" onClick={() => onDecline(job.id)}>
              Decline
            </button>
            <button className="secondary-btn" onClick={() => onPrepareQuote(job)}>
              Prepare quote
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}
