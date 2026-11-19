import { ArrowLeft } from 'lucide-react';

export default function BackLink({ onClick, children = 'Back' }) {
  return (
    <button className="back-link" onClick={onClick}>
      <ArrowLeft size={16} /> {children}
    </button>
  );
}
