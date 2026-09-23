import { useState } from 'react';
import { invoices } from '../data/mock';
import StatusBadge from '../components/StatusBadge';
import { type Page } from '../App';

interface InvoicesProps {
  onNavigate: (page: Page) => void;
}

export default function Invoices({ onNavigate }: InvoicesProps) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filtered = invoices.filter(inv =>
    (filterStatus === 'All' || inv.status === filterStatus) &&
    (inv.patient.toLowerCase().includes(search.toLowerCase()) || inv.id.includes(search))
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <input
            type="text"
            placeholder="Search by invoice ID or patient..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border outline-none"
            style={{ borderColor: 'var(--border)', background: 'white' }}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--muted-foreground)' }}>🔍</span>
        </div>
        {['All', 'Paid', 'Pending', 'Overdue'].map(s => (
          <button key={s} onClick={() => setFilterStatus(s)}
            className="px-3 py-2 rounded-lg text-sm font-medium border transition-all"
            style={{
              background: filterStatus === s ? 'var(--primary)' : 'white',
              color: filterStatus === s ? 'white' : 'var(--muted-foreground)',
              borderColor: filterStatus === s ? 'var(--primary)' : 'var(--border)',
            }}>
            {s}
          </button>
        ))}
        <button onClick={() => onNavigate('createInvoice')}
          className="ml-auto px-4 py-2 rounded-lg text-sm font-semibold"
          style={{ background: 'var(--primary)', color: 'white' }}>
          + New Invoice
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total', value: invoices.length, color: '#dbeafe', text: '#1d4ed8' },
          { label: 'Paid', value: invoices.filter(i => i.status === 'Paid').length, color: '#dcfce7', text: '#15803d' },
          { label: 'Pending / Overdue', value: invoices.filter(i => i.status !== 'Paid').length, color: '#fee2e2', text: '#b91c1c' },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-xl p-4 border flex items-center gap-4" style={{ borderColor: 'var(--border)' }}>
            <div className="text-3xl font-bold" style={{ color: c.text }}>{c.value}</div>
            <div className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>{c.label} Invoices</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--muted)' }}>
                {['Invoice No.', 'Patient', 'Doctor', 'Date', 'Amount', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: 'var(--muted-foreground)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(inv => (
                <tr key={inv.id} className="transition-colors" style={{ borderBottom: '1px solid var(--border)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <td className="px-4 py-3 font-mono text-xs font-bold text-blue-700">{inv.id}</td>
                  <td className="px-4 py-3 font-medium">{inv.patient}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted-foreground)' }}>{inv.doctor}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted-foreground)' }}>{inv.date}</td>
                  <td className="px-4 py-3 font-semibold">₹{inv.amount.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3"><StatusBadge status={inv.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button className="text-xs px-2 py-1 rounded border font-medium" style={{ borderColor: 'var(--border)', color: 'var(--primary)' }}>View</button>
                      <button className="text-xs px-2 py-1 rounded border font-medium" style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>⬇️</button>
                      <button className="text-xs px-2 py-1 rounded border font-medium" style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>🖨️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 text-xs border-t" style={{ color: 'var(--muted-foreground)', borderColor: 'var(--border)' }}>
          Showing {filtered.length} of {invoices.length} invoices · Total outstanding: ₹{invoices.filter(i => i.status !== 'Paid').reduce((a, b) => a + b.amount, 0).toLocaleString('en-IN')}
        </div>
      </div>
    </div>
  );
}
