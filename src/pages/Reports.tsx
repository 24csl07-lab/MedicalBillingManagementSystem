import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { revenueData, dailyRevenue } from '../data/mock';

const claimData = [
  { name: 'Approved', value: 3, color: '#10b981' },
  { name: 'Pending', value: 3, color: '#f59e0b' },
  { name: 'Rejected', value: 1, color: '#ef4444' },
];

export default function Reports() {
  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Daily Revenue (Today)', value: '₹63,000', sub: 'Friday highest this week', color: '#dcfce7', text: '#15803d' },
          { label: 'Monthly Revenue', value: '₹8.5L', sub: 'Sep 2026', color: '#dbeafe', text: '#1d4ed8' },
          { label: 'Outstanding Bills', value: '₹36,800', sub: '3 invoices pending', color: '#fee2e2', text: '#b91c1c' },
          { label: 'Claims Settled', value: '₹17,300', sub: '3 approved claims', color: '#f5f3ff', text: '#7c3aed' },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-xl p-4 border" style={{ borderColor: 'var(--border)' }}>
            <div className="text-xl font-bold mb-0.5" style={{ color: c.text }}>{c.value}</div>
            <div className="text-xs font-semibold mb-0.5">{c.label}</div>
            <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{c.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Monthly revenue bar */}
        <div className="xl:col-span-2 bg-white rounded-xl p-5 border" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">Monthly Revenue (Apr–Sep 2026)</h3>
            <button className="text-xs px-3 py-1.5 rounded-lg border font-medium" style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>
              ⬇️ Download Excel
            </button>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v/100000}L`} />
              <Tooltip formatter={(v) => [`₹${(Number(v)/100000).toFixed(2)}L`]} contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Bar dataKey="revenue" fill="#1d4ed8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Claims donut */}
        <div className="bg-white rounded-xl p-5 border" style={{ borderColor: 'var(--border)' }}>
          <h3 className="font-semibold text-sm mb-4">Claims Breakdown</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={claimData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                {claimData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {claimData.map(d => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }}></div>
                  <span style={{ color: 'var(--muted-foreground)' }}>{d.name}</span>
                </div>
                <span className="font-semibold">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily revenue */}
      <div className="bg-white rounded-xl p-5 border" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm">Daily Revenue — This Week</h3>
          <button className="text-xs px-3 py-1.5 rounded-lg border font-medium" style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>
            ⬇️ Download PDF
          </button>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={dailyRevenue} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v/1000}K`} />
            <Tooltip formatter={(v) => [`₹${Number(v).toLocaleString('en-IN')}`]} contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: 12 }} />
            <Bar dataKey="amount" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
