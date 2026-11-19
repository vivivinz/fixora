import { ArrowRight, Camera } from 'lucide-react';
import { APPLIANCES } from '../data/appliances.js';
import BackLink from './BackLink.jsx';
import PageTitle from './PageTitle.jsx';
import { DIAGNOSIS_DISCLAIMER } from '../data/constants.js';

export default function SnapPage({
  appliance,
  onApplianceChange,
  photo,
  onPhotoChange,
  description,
  onDescriptionChange,
  consent,
  onConsentChange,
  submitted,
  onSubmit,
  onBack,
  onStartDiagnosis,
}) {
  return (
    <section>
      <BackLink onClick={onBack} />
      <PageTitle eyebrow="BETA FEATURE" title="Fixora Snap">
        Attach a photo and describe the issue. Offline mode uses your answers only, not image
        recognition.
      </PageTitle>

      {submitted ? (
        <div className="result-card">
          <span className="beta-pill">OFFLINE FALLBACK</span>
          <h2>Guidance based on your description</h2>
          <p>
            Photo analysis is not active in offline mode; guidance is based on your answers.{' '}
            {photo ? 'Your selected photo was not uploaded or analyzed.' : ''}
          </p>
          <h3>{appliance}</h3>
          <p>{description || 'No written description provided.'}</p>
          <div className="confidence">Low confidence · Needs confirmation</div>
          <p className="disclaimer">{DIAGNOSIS_DISCLAIMER}</p>
          <button className="primary-btn full" onClick={onStartDiagnosis}>
            Answer a few questions
          </button>
        </div>
      ) : (
        <>
          <label className="field-label">Choose appliance</label>
          <select className="field" value={appliance} onChange={(event) => onApplianceChange(event.target.value)}>
            {APPLIANCES.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>

          <label className="upload-zone">
            <Camera size={27} />
            <b>{photo ? photo.name : 'Add a photo (optional)'}</b>
            <small>Up to 3 images · stored on this device in demo mode</small>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => onPhotoChange(event.target.files?.[0] || null)}
            />
          </label>

          <label className="field-label">Describe the problem</label>
          <textarea
            className="field textarea"
            placeholder="Example: The air conditioner is running but not cooling..."
            value={description}
            onChange={(event) => onDescriptionChange(event.target.value)}
          />

          <label className="consent">
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => onConsentChange(event.target.checked)}
            />{' '}
            I understand that any media stays on this device in offline demo mode. Sending media to
            an external AI service would require separate explicit consent.
          </label>

          <button
            className="primary-btn full"
            disabled={!consent || (!description.trim() && !photo)}
            onClick={onSubmit}
          >
            Generate preliminary guidance <ArrowRight size={17} />
          </button>
        </>
      )}
    </section>
  );
}
