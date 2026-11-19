export default function PageTitle({ eyebrow, title, children }) {
  return (
    <div className="page-title">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h1>{title}</h1>
      <p>{children}</p>
    </div>
  );
}
