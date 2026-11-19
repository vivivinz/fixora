import { useEffect, useMemo, useState } from 'react';
import { HAZARD_KEYWORDS } from './data/symptoms.js';
import { SEED_TECHNICIANS } from './data/technicians.js';
import { SEED_BOOKINGS, isActiveBooking } from './data/bookings.js';
import { TRANSLATIONS } from './data/translations.js';
import { usePersistentState } from './hooks/usePersistentState.js';

import TopBar from './components/TopBar.jsx';
import RoleStrip from './components/RoleStrip.jsx';
import BottomNav from './components/BottomNav.jsx';
import Toast from './components/Toast.jsx';
import SafetyAlertModal from './components/SafetyAlertModal.jsx';
import BookingRequestModal from './components/BookingRequestModal.jsx';
import HomePage from './components/HomePage.jsx';
import DiagnosePage from './components/DiagnosePage.jsx';
import SnapPage from './components/SnapPage.jsx';
import BookingsPage from './components/BookingsPage.jsx';
import BookingDetailPage from './components/BookingDetailPage.jsx';
import JobsPage from './components/JobsPage.jsx';
import QuotePage from './components/QuotePage.jsx';
import EarningsPage from './components/EarningsPage.jsx';
import AdminDashboardPage from './components/AdminDashboardPage.jsx';
import TechniciansPage from './components/TechniciansPage.jsx';
import ServicesPage from './components/ServicesPage.jsx';
import MessagesPage from './components/MessagesPage.jsx';
import ProfilePage from './components/ProfilePage.jsx';
import AboutPage from './components/AboutPage.jsx';

const TOAST_DURATION_MS = 3200;
const HOME_PAGE_BY_ROLE = { Customer: 'Home', Technician: 'Jobs', Admin: 'Admin' };
const INITIAL_QUOTE = { labor: '650', parts: '0', extra: '0', warranty: '30 days' };

export default function App() {
  // Persisted in localStorage (same keys as the live site).
  const [role, setRole] = usePersistentState('fx-role', 'Customer');
  const [lang, setLang] = usePersistentState('fx-lang', 'en');
  const [bookings, setBookings] = usePersistentState('fx-bookings', SEED_BOOKINGS);
  const [technicians, setTechnicians] = usePersistentState('fx-techs', SEED_TECHNICIANS);

  // Navigation (no router: the URL never changes).
  const [page, setPage] = useState('Home');
  // NOTE (kept from the original): this holds a snapshot of the booking object, so
  // the detail page does not reflect status changes until it is reopened.
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Diagnose / Snap flow.
  const [appliance, setAppliance] = useState('Air conditioner');
  const [symptoms, setSymptoms] = useState([]);
  const [safetyFlags, setSafetyFlags] = useState([]);
  const [showDiagnosis, setShowDiagnosis] = useState(false);
  const [snapPhoto, setSnapPhoto] = useState(null);
  const [snapDescription, setSnapDescription] = useState('');
  const [snapConsent, setSnapConsent] = useState(false);
  const [snapSubmitted, setSnapSubmitted] = useState(false);

  // Modals.
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [safetyModalOpen, setSafetyModalOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState(SEED_TECHNICIANS[0]);

  // Misc.
  const [quote, setQuote] = useState(INITIAL_QUOTE);
  const [statusFilter, setStatusFilter] = useState('All');
  const [largeText, setLargeText] = useState(false);
  const [toast, setToast] = useState('');

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''), TOAST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [toast]);

  const activeBooking = bookings.find(isActiveBooking);

  // NOTE (kept from the original): "Outlets & wiring" technicians always match.
  const matchingTechs = useMemo(
    () =>
      technicians.filter(
        (tech) => tech.skill === appliance || appliance === 'Other' || tech.skill.includes('Outlets'),
      ),
    [technicians, appliance],
  );

  const hasHazard =
    safetyFlags.length > 0 ||
    symptoms.some((symptom) => HAZARD_KEYWORDS.some((k) => symptom.toLowerCase().includes(k)));

  // ---- Handlers -----------------------------------------------------------

  const toggleSymptom = (symptom) =>
    setSymptoms((prev) => (prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]));

  const submitDiagnosis = () => {
    if (hasHazard) setSafetyModalOpen(true);
    else if (symptoms.length) setShowDiagnosis(true);
    else setToast('Please select at least one symptom.');
  };

  const startDiagnosis = () => {
    setShowDiagnosis(false);
    setSymptoms([]);
    setSafetyFlags([]);
    setPage('Diagnose');
  };

  const pickCategory = (category) => {
    setAppliance(category);
    startDiagnosis();
  };

  const openBooking = (booking) => {
    setSelectedBooking(booking);
    setPage('Booking detail');
  };

  const updateBooking = (id, changes) =>
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, ...changes } : b)));

  const createBooking = () => {
    const booking = {
      id: 'FX-' + Math.floor(1000 + Math.random() * 9000),
      appliance,
      issue: symptoms.join(', ') || 'Needs inspection',
      tech: selectedTech.name,
      status: 'Requested',
      customer: role === 'Customer' ? 'Demo Customer' : 'Demo Presenter',
      owner: 'Own appliance',
      date: 'To be arranged',
      time: 'Preferred time pending',
      created: 'Local demo booking',
    };
    setBookings((prev) => [booking, ...prev]);
    setBookingModalOpen(false);
    setPage('Bookings');
    setShowDiagnosis(false);
    setSymptoms([]);
    setToast('Booking request saved on this device.');
  };

  const resetDemo = () => {
    if (!confirm('Reset all local demo data? This cannot be undone.')) return;
    setBookings(SEED_BOOKINGS);
    setTechnicians(SEED_TECHNICIANS);
    setRole('Customer');
    setToast('Demo data reset.');
  };

  const switchRole = (newRole) => {
    setRole(newRole);
    setPage(HOME_PAGE_BY_ROLE[newRole] ?? 'Admin');
    setToast('Demo role switched to ' + newRole + '.');
  };

  const toggleLang = () => setLang(lang === 'en' ? 'fil' : 'en');

  const toggleVerified = (id) =>
    setTechnicians((prev) => prev.map((tech) => (tech.id === id ? { ...tech, verified: !tech.verified } : tech)));

  const detailBooking = selectedBooking || bookings[0];

  // ---- Render -------------------------------------------------------------

  return (
    <div className={largeText ? 'app large-text' : 'app'}>
      <TopBar
        role={role}
        onNotifications={() => setToast('You are all caught up.')}
        onAvatarClick={() => setPage(role === 'Customer' ? 'Profile' : 'Settings')}
      />
      <RoleStrip t={t} role={role} onRoleChange={switchRole} lang={lang} onToggleLang={toggleLang} />

      <main className="content">
        {page === 'Home' && role === 'Customer' && (
          <HomePage
            t={t}
            activeBooking={activeBooking}
            onOpenSnap={() => {
              setPage('Snap');
              setSnapSubmitted(false);
            }}
            onStartDiagnosis={startDiagnosis}
            onOpenBooking={openBooking}
            onNavigate={setPage}
            onPickCategory={pickCategory}
          />
        )}

        {page === 'Diagnose' && (
          <DiagnosePage
            t={t}
            showResult={showDiagnosis}
            onBack={() => setPage('Home')}
            appliance={appliance}
            onApplianceChange={(value) => {
              setAppliance(value);
              setSymptoms([]);
            }}
            symptoms={symptoms}
            onToggleSymptom={toggleSymptom}
            safetyFlags={safetyFlags}
            onSafetyFlagsChange={setSafetyFlags}
            onSubmit={submitDiagnosis}
            onFindTechnician={() => {
              setSelectedTech(matchingTechs[0] || SEED_TECHNICIANS[0]);
              setBookingModalOpen(true);
            }}
            onEditAnswers={() => setShowDiagnosis(false)}
          />
        )}

        {page === 'Snap' && (
          <SnapPage
            appliance={appliance}
            onApplianceChange={setAppliance}
            photo={snapPhoto}
            onPhotoChange={setSnapPhoto}
            description={snapDescription}
            onDescriptionChange={setSnapDescription}
            consent={snapConsent}
            onConsentChange={setSnapConsent}
            submitted={snapSubmitted}
            onSubmit={() => setSnapSubmitted(true)}
            onBack={() => setPage('Home')}
            onStartDiagnosis={startDiagnosis}
          />
        )}

        {page === 'Bookings' && (
          <BookingsPage
            bookings={bookings}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            onOpenBooking={openBooking}
          />
        )}

        {page === 'Booking detail' && detailBooking && (
          <BookingDetailPage
            booking={detailBooking}
            onBack={() => setPage('Bookings')}
            onApproveQuote={(id) => {
              updateBooking(id, { status: 'Repair In Progress' });
              setToast('Quote approved in demo.');
            }}
            onDeclineQuote={(id) => {
              updateBooking(id, { status: 'Quote Declined' });
              setToast('Quote declined.');
            }}
          />
        )}

        {page === 'Jobs' && role === 'Technician' && (
          <JobsPage
            bookings={bookings}
            onAccept={(id) => {
              updateBooking(id, { status: 'Technician Accepted' });
              setToast('Request accepted.');
            }}
            onDecline={(id) => {
              updateBooking(id, { status: 'Declined' });
              setToast('Request declined.');
            }}
            onPrepareQuote={(job) => {
              setSelectedBooking(job);
              setPage('Quote');
            }}
          />
        )}

        {page === 'Quote' && (
          <QuotePage
            quote={quote}
            onQuoteChange={setQuote}
            onBack={() => setPage('Jobs')}
            onSend={() => {
              if (selectedBooking) updateBooking(selectedBooking.id, { status: 'Quote Sent' });
              setPage('Jobs');
              setToast('Quote sent to customer in demo.');
            }}
          />
        )}

        {page === 'Earnings' && <EarningsPage />}

        {page === 'Admin' && role === 'Admin' && (
          <AdminDashboardPage
            bookings={bookings}
            technicians={technicians}
            onOpenTechnicians={() => setPage('Technicians')}
          />
        )}

        {page === 'Technicians' && role === 'Admin' && (
          <TechniciansPage technicians={technicians} onToggleVerified={toggleVerified} />
        )}

        {page === 'Services' && <ServicesPage onPickCategory={pickCategory} />}

        {page === 'Messages' && <MessagesPage />}

        {(page === 'Profile' || page === 'Settings') && (
          <ProfilePage
            page={page}
            role={role}
            lang={lang}
            onToggleLang={toggleLang}
            largeText={largeText}
            onToggleLargeText={() => setLargeText(!largeText)}
            onToast={setToast}
            onResetDemo={resetDemo}
            onOpenAbout={() => setPage('About')}
          />
        )}

        {page === 'About' && <AboutPage />}
      </main>

      <BottomNav role={role} page={page} onNavigate={setPage} />
      <Toast message={toast} />

      {safetyModalOpen && (
        <SafetyAlertModal
          onClose={() => setSafetyModalOpen(false)}
          onRequestElectrician={() => {
            setSafetyModalOpen(false);
            setSelectedTech(SEED_TECHNICIANS[1]);
            setBookingModalOpen(true);
          }}
        />
      )}

      {bookingModalOpen && (
        <BookingRequestModal
          technicians={technicians}
          selectedTech={selectedTech}
          onSelectTechId={(id) => setSelectedTech(technicians.find((tech) => tech.id === id) || SEED_TECHNICIANS[0])}
          onClose={() => setBookingModalOpen(false)}
          onSubmit={createBooking}
        />
      )}
    </div>
  );
}
