import { useState } from 'react';
import { payments } from '../data/mock';

export default function Payments() {
  const [receipt, setReceipt] = useState<typeof payments[0] | null>(null);

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Total Collected', value: `₹${payments.reduce((a, b) => a + b.amount, 0).toLocaleString('en-IN')}`, color: '#dcfce7', text: '#15803d' },
          { label: 'Transactions', value: payments.length, color: '#dbeafe', text: '#1d4ed8' },
          { label: 'UPI Payments', value: payments.filter(p => p.method === 'UPI').length, color: '#f5f3ff', text: '#7c3aed' },
          { label: 'Outstanding', value: '₹36,800', color: '#fee2e2', text: '#b91c1c' },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-xl p-4 border" style={{ borderColor: 'var(--border)' }}>
            <div className="text-2xl font-bold mb-1" style={{ color: c.text }}>{c.value}</div>
            <div className="text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>{c.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
        <div className="p-5 pb-0">
          <h3 className="font-semibold text-sm mb-4">Payment History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--muted)' }}>
                {['Payment ID', 'Patient', 'Invoice', 'Amount', 'Method', 'Date', 'Receipt'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: 'var(--muted-foreground)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id} className="transition-colors" style={{ borderBottom: '1px solid var(--border)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <td className="px-4 py-3 font-mono text-xs font-bold text-blue-700">{p.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-xs font-bold text-green-700 flex-shrink-0">
                        {p.patient.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium">{p.patient}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-blue-600">{p.invoice}</td>
                  <td className="px-4 py-3 font-bold text-green-600">₹{p.amount.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-md text-xs font-medium" style={{ background: 'var(--muted)', color: 'var(--muted-foreground)' }}>
                      {p.method}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted-foreground)' }}>{p.date}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setReceipt(p)}
                      className="text-xs px-2.5 py-1 rounded-md font-medium"
                      style={{ background: 'var(--secondary)', color: 'var(--primary)' }}
                    >
                      View Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Receipt modal */}
      {receipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.4)' }}
          onClick={() => setReceipt(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl mx-auto mb-3">🧾</div>
              <h3 className="font-bold text-lg">Payment Receipt</h3>
              <div className="text-xs font-mono text-blue-700 mt-1">{receipt.receipt}</div>
            </div>
            <div className="space-y-3 text-sm">
              {[
                { label: 'Payment ID', value: receipt.id },
                { label: 'Patient', value: receipt.patient },
                { label: 'Invoice', value: receipt.invoice },
                { label: 'Amount Paid', value: `₹${receipt.amount.toLocaleString('en-IN')}` },
                { label: 'Method', value: receipt.method },
                { label: 'Date', value: receipt.date },
              ].map(r => (
                <div key={r.label} className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--border)' }}>
                  <span style={{ color: 'var(--muted-foreground)' }}>{r.label}</span>
                  <span className="font-semibold">{r.value}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button className="flex-1 py-2 rounded-lg text-sm font-medium border" style={{ borderColor: 'var(--border)' }}
                onClick={() => setReceipt(null)}>Close</button>
              <button className="flex-1 py-2 rounded-lg text-sm font-semibold" style={{ background: 'var(--primary)', color: 'white' }}>
                🖨️ Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
