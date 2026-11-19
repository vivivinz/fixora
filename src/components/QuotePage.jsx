import { Fragment } from 'react';
import BackLink from './BackLink.jsx';
import PageTitle from './PageTitle.jsx';

const FIELDS = [
  ['labor', 'Labor (₱)', 'number'],
  ['parts', 'Parts (₱)', 'number'],
  ['extra', 'Extra fees (₱)', 'number'],
  ['warranty', 'Warranty terms', undefined],
];

export default function QuotePage({ quote, onQuoteChange, onBack, onSend }) {
  const total = Number(quote.labor || 0) + Number(quote.parts || 0) + Number(quote.extra || 0);

  return (
    <section>
      <BackLink onClick={onBack}>Back to jobs</BackLink>
      <PageTitle title="Prepare quotation">
        Send a transparent final quote for customer approval.
      </PageTitle>
      <div className="result-card">
        {FIELDS.map(([key, label, type]) => (
          <Fragment key={key}>
            <label className="field-label">{label}</label>
            <input
              className="field"
              type={type}
              value={quote[key]}
              onChange={(event) => onQuoteChange({ ...quote, [key]: event.target.value })}
            />
          </Fragment>
        ))}
        <div className="result-row total">
          <b>Total quote</b>
          <b>₱{total.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</b>
        </div>
        <button className="primary-btn full" onClick={onSend}>
          Send quote for approval
        </button>
      </div>
    </section>
  );
}
