import { type Page } from '../App';

const pageTitles: Record<string, string> = {
  dashboard: 'Dashboard',
  patients: 'Patient Management',
  invoices: 'Invoices',
  createInvoice: 'Create Invoice',
  payments: 'Payments',
  claims: 'Insurance Claims',
  reports: 'Reports',
  notifications: 'Notifications',
  settings: 'Settings',
};

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <header
      className="fixed top-0 right-0 z-20 flex items-center justify-between px-6 h-16 bg-white border-b"
      style={{ left: '15rem', borderColor: 'var(--border)' }}
    >
      <div>
        <h1 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>{pageTitles[currentPage]}</h1>
        <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search patients, invoices..."
            className="pl-9 pr-4 py-2 text-sm rounded-lg border outline-none transition-all"
            style={{ background: 'var(--muted)', borderColor: 'var(--border)', color: 'var(--foreground)', width: '240px' }}
            onFocus={e => (e.target.style.borderColor = 'var(--primary)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border)')}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--muted-foreground)' }}>🔍</span>
        </div>

        {/* Notification bell */}
        <button
          onClick={() => onNavigate('notifications')}
          className="relative w-9 h-9 rounded-lg flex items-center justify-center border transition-colors"
          style={{ borderColor: 'var(--border)' }}
        >
          <span>🔔</span>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">3</span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 pl-2 border-l" style={{ borderColor: 'var(--border)' }}>
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">AD</div>
          <div>
            <div className="text-sm font-medium leading-tight">Admin</div>
            <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Administrator</div>
          </div>
        </div>
      </div>
    </header>
  );
}
