import { type Page } from '../App';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

const navItems: { label: string; page: Page; icon: string }[] = [
  { label: 'Dashboard', page: 'dashboard', icon: '⊞' },
  { label: 'Patients', page: 'patients', icon: '👤' },
  { label: 'Invoices', page: 'invoices', icon: '📄' },
  { label: 'Payments', page: 'payments', icon: '💳' },
  { label: 'Claims', page: 'claims', icon: '🏥' },
  { label: 'Reports', page: 'reports', icon: '📊' },
  { label: 'Notifications', page: 'notifications', icon: '🔔' },
  { label: 'Settings', page: 'settings', icon: '⚙️' },
];

export default function Sidebar({ currentPage, onNavigate, onLogout }: SidebarProps) {
  return (
    <aside
      className="fixed left-0 top-0 h-full w-60 flex flex-col z-30"
      style={{ background: 'var(--sidebar)', borderRight: '1px solid var(--sidebar-border)' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b" style={{ borderColor: 'var(--sidebar-border)' }}>
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
          style={{ background: 'var(--primary)' }}
        >
          MB
        </div>
        <div>
          <div className="text-white font-semibold text-sm leading-tight">MedBill Pro</div>
          <div className="text-xs" style={{ color: 'var(--sidebar-text)' }}>Healthcare Billing</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto scrollable">
        <div className="px-3 mb-3">
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--sidebar-text)', opacity: 0.5 }}>
            Main Menu
          </span>
        </div>
        {navItems.slice(0, 6).map((item) => (
          <button
            key={item.page}
            onClick={() => onNavigate(item.page)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 text-left"
            style={{
              background: currentPage === item.page ? 'var(--sidebar-active)' : 'transparent',
              color: currentPage === item.page ? 'var(--sidebar-text-active)' : 'var(--sidebar-text)',
            }}
            onMouseEnter={e => {
              if (currentPage !== item.page) {
                (e.currentTarget as HTMLElement).style.background = 'var(--sidebar-hover)';
                (e.currentTarget as HTMLElement).style.color = '#e2e8f0';
              }
            }}
            onMouseLeave={e => {
              if (currentPage !== item.page) {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = 'var(--sidebar-text)';
              }
            }}
          >
            <span className="text-base w-5 text-center">{item.icon}</span>
            <span>{item.label}</span>
            {item.page === 'notifications' && (
              <span className="ml-auto text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center font-bold">3</span>
            )}
          </button>
        ))}

        <div className="px-3 pt-4 mb-3">
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--sidebar-text)', opacity: 0.5 }}>
            System
          </span>
        </div>
        {navItems.slice(6).map((item) => (
          <button
            key={item.page}
            onClick={() => onNavigate(item.page)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 text-left"
            style={{
              background: currentPage === item.page ? 'var(--sidebar-active)' : 'transparent',
              color: currentPage === item.page ? 'var(--sidebar-text-active)' : 'var(--sidebar-text)',
            }}
            onMouseEnter={e => {
              if (currentPage !== item.page) {
                (e.currentTarget as HTMLElement).style.background = 'var(--sidebar-hover)';
                (e.currentTarget as HTMLElement).style.color = '#e2e8f0';
              }
            }}
            onMouseLeave={e => {
              if (currentPage !== item.page) {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = 'var(--sidebar-text)';
              }
            }}
          >
            <span className="text-base w-5 text-center">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-t" style={{ borderColor: 'var(--sidebar-border)' }}>
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">AD</div>
          <div className="min-w-0">
            <div className="text-sm font-medium text-white truncate">Admin User</div>
            <div className="text-xs truncate" style={{ color: 'var(--sidebar-text)' }}>admin@medbill.in</div>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
          style={{ color: 'var(--sidebar-text)' }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = '#7f1d1d33';
            (e.currentTarget as HTMLElement).style.color = '#fca5a5';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = 'transparent';
            (e.currentTarget as HTMLElement).style.color = 'var(--sidebar-text)';
          }}
        >
          <span className="text-base w-5 text-center">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
