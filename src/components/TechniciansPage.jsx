import { Wrench } from 'lucide-react';
import PageTitle from './PageTitle.jsx';

export default function TechniciansPage({ technicians, onToggleVerified }) {
  return (
    <section>
      <PageTitle title="Technician verification">
        Only explicitly approved profiles can receive a Verified label. Demo profiles are not real
        people.
      </PageTitle>
      {technicians.map((tech) => (
        <div className="tech-card" key={tech.id}>
          <div className="tech-avatar">
            <Wrench />
          </div>
          <div className="tech-info">
            <b>{tech.name}</b>
            <small>
              {tech.skill} · {tech.years} years · {tech.area}
            </small>
            <span className={tech.verified ? 'verified' : 'pending'}>
              {tech.verified ? 'Verified by demo admin' : 'Pending verification'}
            </span>
            <small>Demo profile – not a real or verified technician</small>
          </div>
          <button className="secondary-btn" onClick={() => onToggleVerified(tech.id)}>
            {tech.verified ? 'Revoke' : 'Verify'}
          </button>
        </div>
      ))}
    </section>
  );
}
