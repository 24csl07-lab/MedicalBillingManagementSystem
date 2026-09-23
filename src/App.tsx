import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import CreateInvoice from './pages/CreateInvoice';
import Invoices from './pages/Invoices';
import Payments from './pages/Payments';
import Claims from './pages/Claims';
import Reports from './pages/Reports';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

export type Page =
  | 'dashboard'
  | 'patients'
  | 'createInvoice'
  | 'invoices'
  | 'payments'
  | 'claims'
  | 'reports'
  | 'notifications'
  | 'settings';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard onNavigate={setCurrentPage} />;
      case 'patients': return <Patients onNavigate={setCurrentPage} />;
      case 'createInvoice': return <CreateInvoice onNavigate={setCurrentPage} />;
      case 'invoices': return <Invoices onNavigate={setCurrentPage} />;
      case 'payments': return <Payments />;
      case 'claims': return <Claims />;
      case 'reports': return <Reports />;
      case 'notifications': return <Notifications />;
      case 'settings': return <Settings />;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} onLogout={() => setLoggedIn(false)} />
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main
        className="scrollable overflow-y-auto"
        style={{ marginLeft: '15rem', paddingTop: '4rem', minHeight: '100vh' }}
      >
        <div className="p-6">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
