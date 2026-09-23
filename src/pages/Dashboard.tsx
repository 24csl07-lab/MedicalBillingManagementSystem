import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { revenueData, invoices, patients } from '../data/mock';
import StatusBadge from '../components/StatusBadge';
import { type Page } from '../App';

const fmt = (n: number) => n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${(n / 1000).toFixed(0)}K`;

const statCards = [
  { label: 'Total Patients', value: '1,284', icon: '👤', color: '#dbeafe', iconBg: '#1d4ed8', change: '+12 this month' },
  { label: 'Total Invoices', value: '3,467', icon: '📄', color: '#f0fdf4', iconBg: '#16a34a', change: '+48 this month' },
  { label: 'Revenue Collected', value: '₹8.5L', icon: '💰', color: '#fefce8', iconBg: '#ca8a04', change: 'This month' },
  { label: 'Pending Amount', value: '₹1.2L', icon: '⏳', color: '#fef2f2', iconBg: '#dc2626', change: '12 invoices' },
  { label: 'Insurance Claims', value: '247', icon: '🏥', color: '#f5f3ff', iconBg: '#7c3aed', change: '18 pending' },
];

const recentPayments = [
  { patient: 'Priya Sharma', amount: 12500, time: '10:32 AM', method: 'UPI' },
  { patient: 'Meera Nair', amount: 5600, time: '09:15 AM', method: 'Card' },
  { patient: 'Kavya Reddy', amount: 4800, time: 'Yesterday', method: 'Cash' },
  { patient: 'Ananya Gupta', amount: 7300, time: 'Yesterday', method: 'Net Banking' },
  { patient: 'Deepak Singh', amount: 4000, time: '2 days ago', method: 'UPI' },
];

interface DashboardProps {
  onNavigate: (page: Page) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>Good Morning, Admin 👋</h2>
          <p className="text-sm mt-0.5" style={{ color: 'var(--muted-foreground)' }}>Here's what's happening at your clinic today.</p>
        </div>
        <button
          onClick={() => onNavigate('createInvoice')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
          style={{ background: 'var(--primary)', color: 'white' }}
        >
          <span>+</span> New Invoice
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-5 gap-4">
        {statCards.map((c) => (
          <div key={c.label} className="bg-white rounded-xl p-4 border" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                style={{ background: c.color }}
              >
                {c.icon}
              </div>
            </div>
            <div className="text-2xl font-bold mb-0.5" style={{ color: 'var(--foreground)' }}>{c.value}</div>
            <div className="text-xs font-medium mb-1" style={{ color: 'var(--muted-foreground)' }}>{c.label}</div>
            <div className="text-xs" style={{ color: '#10b981' }}>{c.change}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <div className="xl:col-span-2 bg-white rounded-xl p-5 border" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-sm">Revenue Overview</h3>
              <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>Apr – Sep 2026</p>
            </div>
            <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--muted-foreground)' }}>
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded bg-blue-500 inline-block"></span>Revenue</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded bg-emerald-400 inline-block"></span>Expenses</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v/100000}L`} />
              <Tooltip formatter={(v) => [`₹${(Number(v)/100000).toFixed(2)}L`]} contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Area type="monotone" dataKey="revenue" stroke="#1d4ed8" strokeWidth={2} fill="url(#revGrad)" />
              <Area type="monotone" dataKey="expenses" stroke="#10b981" strokeWidth={2} fill="url(#expGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent payments */}
        <div className="bg-white rounded-xl p-5 border" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">Recent Payments</h3>
            <button className="text-xs font-medium" style={{ color: 'var(--primary)' }} onClick={() => onNavigate('payments')}>View all</button>
          </div>
          <div className="space-y-3">
            {recentPayments.map((p, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700 flex-shrink-0">
                    {p.patient.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-xs font-medium">{p.patient}</div>
                    <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{p.time} · {p.method}</div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-green-600">+₹{p.amount.toLocaleString('en-IN')}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent patients */}
        <div className="bg-white rounded-xl border" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between p-5 pb-3">
            <h3 className="font-semibold text-sm">Recent Patients</h3>
            <button className="text-xs font-medium" style={{ color: 'var(--primary)' }} onClick={() => onNavigate('patients')}>View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Patient', 'Doctor', 'Last Visit', 'Status'].map(h => (
                    <th key={h} className="text-left px-5 py-2.5 font-semibold" style={{ color: 'var(--muted-foreground)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {patients.slice(0, 4).map(p => (
                  <tr key={p.id} className="transition-colors" style={{ borderBottom: '1px solid var(--border)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--muted)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <td className="px-5 py-3">
                      <div className="font-medium">{p.name}</div>
                      <div style={{ color: 'var(--muted-foreground)' }}>{p.id}</div>
                    </td>
                    <td className="px-5 py-3" style={{ color: 'var(--muted-foreground)' }}>{p.doctor}</td>
                    <td className="px-5 py-3" style={{ color: 'var(--muted-foreground)' }}>{p.lastVisit}</td>
                    <td className="px-5 py-3"><StatusBadge status={p.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent invoices */}
        <div className="bg-white rounded-xl border" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between p-5 pb-3">
            <h3 className="font-semibold text-sm">Recent Invoices</h3>
            <button className="text-xs font-medium" style={{ color: 'var(--primary)' }} onClick={() => onNavigate('invoices')}>View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Invoice', 'Patient', 'Amount', 'Status'].map(h => (
                    <th key={h} className="text-left px-5 py-2.5 font-semibold" style={{ color: 'var(--muted-foreground)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invoices.slice(0, 4).map(inv => (
                  <tr key={inv.id} className="transition-colors" style={{ borderBottom: '1px solid var(--border)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--muted)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <td className="px-5 py-3 font-mono font-semibold text-blue-700">{inv.id}</td>
                    <td className="px-5 py-3">{inv.patient}</td>
                    <td className="px-5 py-3 font-semibold">₹{inv.amount.toLocaleString('en-IN')}</td>
                    <td className="px-5 py-3"><StatusBadge status={inv.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
