import { Bell } from 'lucide-react';
import { LOGO_SRC } from '../data/constants.js';

export default function TopBar({ role, onNotifications, onAvatarClick }) {
  return (
    <header className="topbar">
      <div className="brand">
        <img src={LOGO_SRC} alt="FIXORA logo" />
        <div>
          <b>FIXORA</b>
          <small>Fix it Fast, Make it Last!</small>
        </div>
      </div>
      <div className="top-actions">
        <span className="pilot-pill">PILOT / PROTOTYPE</span>
        <button className="icon-btn" aria-label="Notifications" onClick={onNotifications}>
          <Bell size={19} />
        </button>
        <button className="avatar" onClick={onAvatarClick}>
          {role[0]}
        </button>
      </div>
    </header>
  );
}
