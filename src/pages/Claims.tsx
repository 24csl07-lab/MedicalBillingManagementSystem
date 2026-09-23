import { useState } from 'react';
import { claims } from '../data/mock';
import StatusBadge from '../components/StatusBadge';

export default function Claims() {
  const [filterStatus, setFilterStatus] = useState('All');

  const filtered = claims.filter(c => filterStatus === 'All' || c.status === filterStatus);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Claims', value: claims.length, color: '#dbeafe', text: '#1d4ed8' },
          { label: 'Approved', value: claims.filter(c => c.status === 'Approved').length, color: '#dcfce7', text: '#15803d' },
          { label: 'Pending', value: claims.filter(c => c.status === 'Pending').length, color: '#fef9c3', text: '#92400e' },
          { label: 'Rejected', value: claims.filter(c => c.status === 'Rejected').length, color: '#fee2e2', text: '#b91c1c' },
          { label: 'Total Claimed', value: `₹${(claims.reduce((a, b) => a + b.amount, 0) / 1000).toFixed(0)}K`, color: '#f5f3ff', text: '#7c3aed' },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-xl p-4 border" style={{ borderColor: 'var(--border)' }}>
            <div className="text-2xl font-bold mb-1" style={{ color: c.text }}>{c.value}</div>
            <div className="text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>{c.label}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        {['All', 'Approved', 'Pending', 'Rejected'].map(s => (
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
      </div>

      <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--muted)' }}>
                {['Claim ID', 'Patient', 'Insurance Provider', 'Claim Amount', 'Submitted', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: 'var(--muted-foreground)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} className="transition-colors" style={{ borderBottom: '1px solid var(--border)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <td className="px-4 py-3 font-mono text-xs font-bold text-purple-700">{c.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-xs font-bold text-purple-700 flex-shrink-0">
                        {c.patient.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium">{c.patient}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted-foreground)' }}>{c.provider}</td>
                  <td className="px-4 py-3 font-semibold">₹{c.amount.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted-foreground)' }}>{c.submitted}</td>
                  <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button className="text-xs px-2 py-1 rounded border font-medium" style={{ borderColor: 'var(--border)', color: 'var(--primary)' }}>View</button>
                      {c.status === 'Rejected' && (
                        <button className="text-xs px-2 py-1 rounded font-medium" style={{ background: '#fee2e2', color: '#b91c1c' }}>Resubmit</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 text-xs border-t" style={{ color: 'var(--muted-foreground)', borderColor: 'var(--border)' }}>
          Showing {filtered.length} claims
        </div>
      </div>
    </div>
  );
}
