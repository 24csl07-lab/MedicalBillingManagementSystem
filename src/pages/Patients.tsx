import { useState } from 'react';
import { patients } from '../data/mock';
import StatusBadge from '../components/StatusBadge';
import { type Page } from '../App';

interface PatientsProps {
  onNavigate: (page: Page) => void;
}

export default function Patients({ onNavigate }: PatientsProps) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selected, setSelected] = useState<typeof patients[0] | null>(null);

  const filtered = patients.filter(p =>
    (filterStatus === 'All' || p.status === filterStatus) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.id.includes(search))
  );

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <input
            type="text"
            placeholder="Search by name or patient ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border outline-none"
            style={{ borderColor: 'var(--border)', background: 'white' }}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--muted-foreground)' }}>🔍</span>
        </div>
        {['All', 'Paid', 'Pending', 'Overdue'].map(s => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className="px-3 py-2 rounded-lg text-sm font-medium border transition-all"
            style={{
              background: filterStatus === s ? 'var(--primary)' : 'white',
              color: filterStatus === s ? 'white' : 'var(--muted-foreground)',
              borderColor: filterStatus === s ? 'var(--primary)' : 'var(--border)',
            }}
          >
            {s}
          </button>
        ))}
        <button
          onClick={() => onNavigate('createInvoice')}
          className="ml-auto px-4 py-2 rounded-lg text-sm font-semibold"
          style={{ background: 'var(--primary)', color: 'white' }}
        >
          + Add Patient
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--muted)' }}>
                {['Patient ID', 'Name', 'Age', 'Phone', 'Insurance', 'Doctor', 'Last Visit', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: 'var(--muted-foreground)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="transition-colors" style={{ borderBottom: '1px solid var(--border)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-blue-700">{p.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700 flex-shrink-0">
                        {p.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3" style={{ color: 'var(--muted-foreground)' }}>{p.age}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--muted-foreground)' }}>{p.phone}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--muted-foreground)' }}>{p.insurance}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--muted-foreground)' }}>{p.doctor}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--muted-foreground)' }}>{p.lastVisit}</td>
                  <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelected(p)}
                        className="text-xs px-2.5 py-1 rounded-md border font-medium transition-colors"
                        style={{ borderColor: 'var(--border)', color: 'var(--primary)' }}
                      >
                        View
                      </button>
                      <button
                        onClick={() => onNavigate('createInvoice')}
                        className="text-xs px-2.5 py-1 rounded-md font-medium"
                        style={{ background: 'var(--primary)', color: 'white' }}
                      >
                        Bill
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 text-xs border-t" style={{ color: 'var(--muted-foreground)', borderColor: 'var(--border)' }}>
          Showing {filtered.length} of {patients.length} patients
        </div>
      </div>

      {/* Patient detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.4)' }}
          onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-lg">Patient Details</h3>
              <button onClick={() => setSelected(null)} className="text-xl" style={{ color: 'var(--muted-foreground)' }}>✕</button>
            </div>
            <div className="flex items-center gap-4 mb-5 p-4 rounded-xl" style={{ background: 'var(--muted)' }}>
              <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
                {selected.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="font-bold text-lg">{selected.name}</div>
                <div className="text-sm font-mono text-blue-700">{selected.id}</div>
                <StatusBadge status={selected.status} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { label: 'Age', value: `${selected.age} years` },
                { label: 'Phone', value: selected.phone },
                { label: 'Insurance', value: selected.insurance },
                { label: 'Doctor', value: selected.doctor },
                { label: 'Last Visit', value: selected.lastVisit },
              ].map(r => (
                <div key={r.label} className="p-3 rounded-lg" style={{ background: 'var(--muted)' }}>
                  <div className="text-xs font-medium mb-0.5" style={{ color: 'var(--muted-foreground)' }}>{r.label}</div>
                  <div className="font-semibold">{r.value}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button className="flex-1 py-2 rounded-lg text-sm font-semibold border" style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
                onClick={() => setSelected(null)}>
                Close
              </button>
              <button className="flex-1 py-2 rounded-lg text-sm font-semibold" style={{ background: 'var(--primary)', color: 'white' }}
                onClick={() => { setSelected(null); onNavigate('createInvoice'); }}>
                Create Bill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
