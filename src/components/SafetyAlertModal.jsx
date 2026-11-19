import { TriangleAlert, X } from 'lucide-react';

export default function SafetyAlertModal({ onClose, onRequestElectrician }) {
  return (
    <div className="modal-backdrop">
      <div className="safety-modal">
        <div className="safety-symbol">
          <TriangleAlert size={30} />
        </div>
        <button className="modal-close" onClick={onClose}>
          <X />
        </button>
        <h2>Stop. Safety alert.</h2>
        <p>Your answers indicate a possible electrical or fire hazard.</p>
        <ul>
          <li>Stop using the appliance immediately.</li>
          <li>Unplug it only if it is safe to do so.</li>
          <li>Turn off the breaker if you can do so safely.</li>
          <li>Keep away from water. Do not attempt repairs.</li>
          <li>Call emergency services if there is fire or injury.</li>
        </ul>
        <b>Do not touch exposed wires or open electrical equipment.</b>
        <button className="danger-btn full" onClick={onRequestElectrician}>
          Request an electrician
        </button>
      </div>
    </div>
  );
}
