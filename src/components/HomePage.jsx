import { Activity, ArrowRight, Camera, MapPin, ShieldCheck, Wrench } from 'lucide-react';
import BookingCard from './BookingCard.jsx';
import CategoryGrid from './CategoryGrid.jsx';

export default function HomePage({
  t,
  activeBooking,
  onOpenSnap,
  onStartDiagnosis,
  onOpenBooking,
  onNavigate,
  onPickCategory,
}) {
  return (
    <section>
      <div className="welcome">
        <div>
          <span className="eyebrow">GOOD DAY, DEMO CUSTOMER</span>
          <h1>{t.hello}</h1>
          <p>{t.find}. Transparent costs, clear updates, and repair records.</p>
        </div>
        <div className="welcome-icon">
          <Wrench size={34} />
        </div>
      </div>

      <div className="location">
        <MapPin size={15} />
        {t.nearby}
        <span>Change</span>
      </div>

      <div className="hero-actions">
        <button className="hero-card snap-card" onClick={onOpenSnap}>
          <span className="hero-icon">
            <Camera />
          </span>
          <span className="hero-tag">BETA</span>
          <b>{t.snap}</b>
          <small>Get guidance from a photo and your answers</small>
          <strong>
            Try Snap <ArrowRight size={16} />
          </strong>
        </button>
        <button className="hero-card diagnose-card" onClick={onStartDiagnosis}>
          <span className="hero-icon">
            <Activity />
          </span>
          <b>Fixora Diagnose</b>
          <small>Answer a few questions about the problem</small>
          <strong>
            {t.start} <ArrowRight size={16} />
          </strong>
        </button>
      </div>

      {activeBooking && (
        <>
          <div className="section-head">
            <h2>{t.active}</h2>
            <button onClick={() => onNavigate('Bookings')}>{t.view}</button>
          </div>
          <BookingCard booking={activeBooking} onOpen={() => onOpenBooking(activeBooking)} />
        </>
      )}

      <div className="section-head">
        <h2>{t.services}</h2>
        <button onClick={() => onNavigate('Services')}>{t.view}</button>
      </div>
      <CategoryGrid limit={8} onPick={onPickCategory} />

      <div className="safety-tip">
        <ShieldCheck />
        <div>
          <b>{t.safety}</b>
          <p>
            If you notice smoke, sparks, burning smell, or electric shock, stop using the appliance
            and seek qualified help.
          </p>
        </div>
      </div>
    </section>
  );
}
