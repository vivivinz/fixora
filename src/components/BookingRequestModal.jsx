import { ArrowRight, FileText, X } from 'lucide-react';

// NOTE (kept from the original): date, contact number, ownership and the
// permission checkbox are uncontrolled and are not saved with the booking.
export default function BookingRequestModal({
  technicians,
  selectedTech,
  onSelectTechId,
  onClose,
  onSubmit,
}) {
  return (
    <div className="modal-backdrop">
      <div className="booking-modal">
        <button className="modal-close" onClick={onClose}>
          <X />
        </button>
        <span className="eyebrow">NEW SERVICE REQUEST</span>
        <h2>Request a booking</h2>
        <p>
          Choose a sample technician. This request is saved locally and is not sent to a real
          provider.
        </p>

        <label className="field-label">Technician</label>
        <select
          className="field"
          value={selectedTech.id}
          onChange={(event) => onSelectTechId(Number(event.target.value))}
        >
          {technicians.map((tech) => (
            <option key={tech.id} value={tech.id}>
              {tech.name} · {tech.skill}
            </option>
          ))}
        </select>

        <label className="field-label">Preferred date</label>
        <input className="field" type="date" defaultValue="2026-11-25" />

        <label className="field-label">Contact number</label>
        <input className="field" type="tel" placeholder="09XX XXX XXXX" />

        <label className="field-label">Ownership</label>
        <select className="field">
          <option>Own appliance</option>
          <option>Shared appliance</option>
          <option>Landlord-owned</option>
        </select>

        <label className="consent">
          <input type="checkbox" defaultChecked /> I confirm I have permission to request service
          for this appliance.
        </label>

        <div className="notice-box">
          <FileText size={18} />
          <span>
            Indicative estimate only. Placeholder inspection fee ₱49–₱99; final labor and parts are
            set after inspection and customer approval.
          </span>
        </div>

        <button className="primary-btn full" onClick={onSubmit}>
          Submit request <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}
