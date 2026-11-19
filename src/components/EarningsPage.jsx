import PageTitle from './PageTitle.jsx';

export default function EarningsPage() {
  return (
    <section>
      <PageTitle title="Earnings overview">Illustrative calculation for the academic pilot.</PageTitle>
      <div className="metric-grid">
        <div className="metric">
          <small>Gross labor</small>
          <b>₱1,000</b>
        </div>
        <div className="metric">
          <small>Platform commission · 18%</small>
          <b>₱180</b>
        </div>
        <div className="metric">
          <small>Technician share</small>
          <b>₱820</b>
        </div>
      </div>
      <p className="disclaimer">Demo figures only. No real transactions or payouts are processed.</p>
      <div className="result-card">
        <h3>Coming soon</h3>
        <p>Technician Pro ₱299/month – Coming soon (not active).</p>
      </div>
    </section>
  );
}
