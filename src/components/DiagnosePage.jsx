import { Activity, ArrowRight, Check, CircleCheck, ShieldCheck } from 'lucide-react';
import { APPLIANCES } from '../data/appliances.js';
import { SAFETY_WARNING_SIGNS, SYMPTOMS_BY_APPLIANCE } from '../data/symptoms.js';
import BackLink from './BackLink.jsx';
import PageTitle from './PageTitle.jsx';
import { DIAGNOSIS_DISCLAIMER } from '../data/constants.js';

// NOTE (kept from the original): "Not draining" is not a real symptom option,
// and only the first selected symptom decides the result.
function possibleProblem(firstSymptom) {
  if (firstSymptom === 'Not cooling') return 'Cooling system or airflow issue';
  if (firstSymptom === 'Not draining' || firstSymptom === 'Won’t drain') return 'Drainage or filter obstruction';
  return 'Component or connection issue';
}

function DiagnoseForm({ appliance, onApplianceChange, symptoms, onToggleSymptom, safetyFlags, onSafetyFlagsChange, onSubmit }) {
  const options = SYMPTOMS_BY_APPLIANCE[appliance] || SYMPTOMS_BY_APPLIANCE.Other;
  return (
    <>
      <PageTitle eyebrow="GUIDED ASSESSMENT · OFFLINE" title="Fixora Diagnose">
        Tell us what is happening. This gives preliminary guidance only.
      </PageTitle>
      <div className="progress">
        <span style={{ width: symptoms.length ? '70%' : '35%' }} />
      </div>

      <label className="field-label">1. What appliance needs repair?</label>
      <select className="field" value={appliance} onChange={(event) => onApplianceChange(event.target.value)}>
        {APPLIANCES.map((a) => (
          <option key={a}>{a}</option>
        ))}
      </select>

      <label className="field-label">
        2. What symptoms are you experiencing? <small>(Select all that apply)</small>
      </label>
      <div className="symptom-grid">
        {options.map((symptom) => {
          const selected = symptoms.includes(symptom);
          return (
            <button
              key={symptom}
              className={selected ? 'symptom selected' : 'symptom'}
              onClick={() => onToggleSymptom(symptom)}
            >
              {selected && <Check size={15} />} {symptom}
            </button>
          );
        })}
      </div>

      <label className="field-label">3. Any safety warning signs?</label>
      <div className="safety-options">
        {SAFETY_WARNING_SIGNS.map((sign) => (
          <label key={sign}>
            <input
              type="checkbox"
              checked={safetyFlags.includes(sign)}
              onChange={(event) =>
                onSafetyFlagsChange((flags) =>
                  event.target.checked ? [...flags, sign] : flags.filter((f) => f !== sign),
                )
              }
            />
            {sign}
          </label>
        ))}
      </div>

      <div className="notice-box">
        <ShieldCheck size={18} />
        <span>
          Never open live electrical parts. Only try harmless checks such as checking an accessible
          plug, cleaning a removable filter, or replacing a remote battery.
        </span>
      </div>
      <button className="primary-btn full" onClick={onSubmit}>
        See preliminary guidance <ArrowRight size={17} />
      </button>
    </>
  );
}

function DiagnoseResult({ t, appliance, symptoms, onFindTechnician, onEditAnswers }) {
  return (
    <>
      <div className="result-head">
        <span className="result-icon">
          <Activity />
        </span>
        <span className="eyebrow">PRELIMINARY RESULT</span>
        <h1>Possible issue identified</h1>
        <p>Based on the symptoms you selected: {symptoms.join(', ')}.</p>
      </div>

      <div className="result-card">
        <div className="result-row">
          <b>Possible problem</b>
          <span className="confidence">Medium confidence</span>
        </div>
        <h3>{possibleProblem(symptoms[0])}</h3>
        <p>
          Your answers may point to this issue, but other causes are possible. A technician needs
          to inspect the appliance.
        </p>
        <div className="result-row">
          <b>Recommended specialization</b>
          <span>{appliance}</span>
        </div>
        <div className="result-row">
          <b>Urgency</b>
          <span className="status status-warn">Medium · Arrange inspection</span>
        </div>
        <div className="result-row">
          <b>{t.cost}</b>
          <span>Not yet validated</span>
        </div>
        <small>Indicative estimate – final price set by the technician after inspection.</small>
      </div>

      <div className="notice-box">
        <CircleCheck size={18} />
        <span>
          Safe checks: confirm the appliance is plugged into an accessible, undamaged outlet; check
          user-removable filters or settings only.
        </span>
      </div>
      <p className="disclaimer">{DIAGNOSIS_DISCLAIMER}</p>
      <button className="primary-btn full" onClick={onFindTechnician}>
        Find a technician <ArrowRight size={17} />
      </button>
      <button className="secondary-btn full" onClick={onEditAnswers}>
        Edit answers
      </button>
    </>
  );
}

export default function DiagnosePage({ showResult, onBack, ...props }) {
  return (
    <section>
      <BackLink onClick={onBack} />
      {showResult ? <DiagnoseResult {...props} /> : <DiagnoseForm {...props} />}
    </section>
  );
}
