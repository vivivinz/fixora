import { APPLIANCES, APPLIANCE_EMOJIS } from '../data/appliances.js';

export default function CategoryGrid({ limit = APPLIANCES.length, onPick }) {
  return (
    <div className="category-grid">
      {APPLIANCES.slice(0, limit).map((appliance, index) => (
        <button key={appliance} className="category" onClick={() => onPick(appliance)}>
          <span>{APPLIANCE_EMOJIS[index]}</span>
          <small>{appliance}</small>
        </button>
      ))}
    </div>
  );
}
