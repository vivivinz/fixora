import { LOGO_SRC } from '../data/constants.js';

export default function AboutPage() {
  return (
    <section>
      <div className="about-logo">
        <img src={LOGO_SRC} alt="FIXORA logo" />
        <h1>FIXORA</h1>
        <p>Fix it Fast, Make it Last!</p>
      </div>
      <div className="result-card">
        <b>Academic startup prototype</b>
        <p>
          FIXORA is an AI-assisted mobile marketplace concept connecting customers with
          household-appliance and electrical repair technicians in Alangilan, Batangas City.
        </p>
        <p>Convenience · Transparency · Reliability</p>
        <p>
          Group 5: Alyza Mae O. Hernandez, Justine Dave P. Marticio, Hazelle Anne E. Pacia, Vinz C.
          Panganiban, Janelle Kyla Mae M. Paras.
        </p>
      </div>
      <p className="disclaimer">
        This pilot does not represent a commercially operating marketplace. Sample profiles,
        ratings, and prices are illustrative only.
      </p>
    </section>
  );
}
