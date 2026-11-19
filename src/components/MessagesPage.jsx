import { MessageCircle } from 'lucide-react';
import PageTitle from './PageTitle.jsx';

export default function MessagesPage() {
  return (
    <section>
      <PageTitle title="Messages">Simple local notes for this device demo.</PageTitle>
      <div className="empty-state">
        <MessageCircle size={34} />
        <h3>No conversations yet</h3>
        <p>
          Messages will appear here when a booking has an active technician conversation.
          Multi-device chat requires a connected backend.
        </p>
      </div>
    </section>
  );
}
