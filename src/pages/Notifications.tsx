import { useState } from 'react';
import { notifications as initialNotifs } from '../data/mock';

const typeIcon: Record<string, string> = {
  payment: '💳',
  claim: '🏥',
  invoice: '📄',
  pending: '⚠️',
};

const typeBg: Record<string, string> = {
  payment: '#dcfce7',
  claim: '#f5f3ff',
  invoice: '#dbeafe',
  pending: '#fef9c3',
};

export default function Notifications() {
  const [notifs, setNotifs] = useState(initialNotifs);

  const markAllRead = () => setNotifs(n => n.map(x => ({ ...x, read: true })));
  const markRead = (id: number) => setNotifs(n => n.map(x => x.id === id ? { ...x, read: true } : x));
  const unread = notifs.filter(n => !n.read).length;

  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm font-medium">{unread} unread notifications</span>
        </div>
        {unread > 0 && (
          <button className="text-sm font-medium" style={{ color: 'var(--primary)' }} onClick={markAllRead}>
            Mark all as read
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifs.map(n => (
          <div
            key={n.id}
            className="bg-white rounded-xl p-4 border flex items-start gap-4 transition-all cursor-pointer"
            style={{ borderColor: n.read ? 'var(--border)' : 'var(--primary)', opacity: n.read ? 0.75 : 1 }}
            onClick={() => markRead(n.id)}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
              style={{ background: typeBg[n.type] ?? '#f1f5f9' }}
            >
              {typeIcon[n.type] ?? '🔔'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="font-semibold text-sm">{n.title}</div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{n.time}</span>
                  {!n.read && (
                    <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0"></div>
                  )}
                </div>
              </div>
              <p className="text-sm mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{n.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
