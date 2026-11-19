import { Languages } from 'lucide-react';
import { ROLES } from '../data/constants.js';

export default function RoleStrip({ t, role, onRoleChange, lang, onToggleLang }) {
  return (
    <div className="role-strip">
      <span>
        <span className="live-dot" /> {t.demo}
      </span>
      <select
        aria-label="Switch demo role"
        value={role}
        onChange={(event) => onRoleChange(event.target.value)}
      >
        {ROLES.map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>
      <button onClick={onToggleLang} className="lang-btn">
        <Languages size={15} />
        {lang === 'en' ? 'EN' : 'FIL'}
      </button>
    </div>
  );
}
