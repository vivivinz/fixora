import {
  Activity,
  ChevronRight,
  Download,
  FileText,
  Languages,
  Settings,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import PageTitle from './PageTitle.jsx';

// Used for both the "Profile" (Customer, Technician) and "Settings" (Admin) tabs.
export default function ProfilePage({
  page,
  role,
  lang,
  onToggleLang,
  largeText,
  onToggleLargeText,
  onToast,
  onResetDemo,
  onOpenAbout,
  onInstall,
}) {
  return (
    <section>
      <PageTitle title={page === 'Profile' ? 'Your profile' : 'Settings'}>
        Manage your local demo experience.
      </PageTitle>

      <div className="profile-card">
        {/* NOTE (kept from the original): always "Demo Customer", whatever the role. */}
        <div className="profile-avatar">DC</div>
        <div>
          <b>Demo Customer</b>
          <small>Local demo account · {role}</small>
        </div>
      </div>

      <div className="settings-list">
        {/* Only rendered when the app can be installed (hidden once installed). */}
        {onInstall && (
          <button onClick={onInstall}>
            <Download />Install FIXORA app <ChevronRight />
          </button>
        )}
        <button onClick={onToggleLang}>
          <Languages />Language <span>{lang === 'en' ? 'English' : 'Filipino'}</span>
        </button>
        <button onClick={onToggleLargeText}>
          <Smartphone />Large text <span>{largeText ? 'On' : 'Off'}</span>
        </button>
        <button
          onClick={() =>
            onToast('High contrast theme is enabled by the system color scheme in this pilot.')
          }
        >
          <Activity />Accessibility <ChevronRight />
        </button>
        <button onClick={() => onToast('Your demo data is stored locally in this browser on this device.')}>
          <ShieldCheck />Privacy &amp; data <ChevronRight />
        </button>
        <button onClick={onResetDemo}>
          <Settings />Reset demo data <ChevronRight />
        </button>
        <button onClick={onOpenAbout}>
          <FileText />About FIXORA <ChevronRight />
        </button>
      </div>
    </section>
  );
}
