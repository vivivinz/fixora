import {
  Activity,
  CalendarDays,
  ClipboardList,
  House,
  MessageCircle,
  Settings,
  ShieldCheck,
  User,
  Wrench,
} from 'lucide-react';

// Tab labels are also page names. They are not translated in the original.
const NAV_ITEMS_BY_ROLE = {
  Customer: [
    ['Home', House],
    ['Diagnose', Activity],
    ['Bookings', ClipboardList],
    ['Messages', MessageCircle],
    ['Profile', User],
  ],
  Technician: [
    ['Jobs', ClipboardList],
    ['Bookings', CalendarDays],
    ['Earnings', Activity],
    ['Profile', User],
  ],
  Admin: [
    ['Admin', ShieldCheck],
    ['Bookings', ClipboardList],
    ['Technicians', Wrench],
    ['Settings', Settings],
  ],
};

export default function BottomNav({ role, page, onNavigate }) {
  const items = NAV_ITEMS_BY_ROLE[role] ?? NAV_ITEMS_BY_ROLE.Admin;
  return (
    <nav className="bottom-nav">
      {items.map(([label, Icon]) => (
        <button key={label} className={page === label ? 'active' : ''} onClick={() => onNavigate(label)}>
          <Icon size={19} />
          <small>{label}</small>
        </button>
      ))}
    </nav>
  );
}
