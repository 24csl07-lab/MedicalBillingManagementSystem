import { useState } from 'react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('clinic');
  const [clinicName, setClinicName] = useState('City Health Clinic');
  const [email, setEmail] = useState('admin@medbill.in');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [gst, setGst] = useState('27AAACT2727Q1ZW');
  const [saved, setSaved] = useState(false);

  const tabs = ['clinic', 'users', 'billing', 'tax', 'payment', 'security'];

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl space-y-5">
      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white p-1 rounded-xl border overflow-x-auto" style={{ borderColor: 'var(--border)' }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className="px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all whitespace-nowrap"
            style={{
              background: activeTab === t ? 'var(--primary)' : 'transparent',
              color: activeTab === t ? 'white' : 'var(--muted-foreground)',
            }}>
            {t === 'clinic' ? 'Clinic Info' : t === 'users' ? 'User Mgmt' : t === 'billing' ? 'Billing' : t === 'tax' ? 'Tax' : t === 'payment' ? 'Payments' : 'Security'}
          </button>
        ))}
      </div>

      {activeTab === 'clinic' && (
        <div className="bg-white rounded-xl p-6 border space-y-4" style={{ borderColor: 'var(--border)' }}>
          <h3 className="font-semibold">Clinic / Hospital Information</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Clinic Name', value: clinicName, setter: setClinicName },
              { label: 'Admin Email', value: email, setter: setEmail },
              { label: 'Phone Number', value: phone, setter: setPhone },
              { label: 'GST Number', value: gst, setter: setGst },
            ].map(f => (
              <div key={f.label}>
                <label className="text-xs font-medium block mb-1.5" style={{ color: 'var(--muted-foreground)' }}>{f.label}</label>
                <input value={f.value} onChange={e => f.setter(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border outline-none"
                  style={{ borderColor: 'var(--border)', background: 'var(--muted)' }} />
              </div>
            ))}
            <div className="col-span-2">
              <label className="text-xs font-medium block mb-1.5" style={{ color: 'var(--muted-foreground)' }}>Address</label>
              <textarea rows={2} defaultValue="123, Main Street, Andheri West, Mumbai, Maharashtra 400058"
                className="w-full px-3 py-2 text-sm rounded-lg border outline-none resize-none"
                style={{ borderColor: 'var(--border)', background: 'var(--muted)' }} />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-white rounded-xl p-6 border space-y-4" style={{ borderColor: 'var(--border)' }}>
          <div className="flex justify-between">
            <h3 className="font-semibold">User Management</h3>
            <button className="text-sm px-3 py-1.5 rounded-lg font-semibold" style={{ background: 'var(--primary)', color: 'white' }}>+ Add User</button>
          </div>
          {[
            { name: 'Admin User', role: 'Administrator', email: 'admin@medbill.in', active: true },
            { name: 'Dr. Rajan Mehta', role: 'Doctor', email: 'rajan@medbill.in', active: true },
            { name: 'Dr. Sunita Patel', role: 'Doctor', email: 'sunita@medbill.in', active: true },
            { name: 'Reema Joshi', role: 'Billing Staff', email: 'reema@medbill.in', active: true },
            { name: 'Ankit Shah', role: 'Receptionist', email: 'ankit@medbill.in', active: false },
          ].map(u => (
            <div key={u.email} className="flex items-center justify-between py-3 border-b" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-700">
                  {u.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <div className="text-sm font-medium">{u.name}</div>
                  <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{u.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs px-2 py-0.5 rounded-md font-medium" style={{ background: 'var(--secondary)', color: 'var(--primary)' }}>{u.role}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${u.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {u.active ? 'Active' : 'Inactive'}
                </span>
                <button className="text-xs text-red-500 hover:text-red-700">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'tax' && (
        <div className="bg-white rounded-xl p-6 border space-y-4" style={{ borderColor: 'var(--border)' }}>
          <h3 className="font-semibold">Tax Settings</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'GST Rate (%)', value: '18' },
              { label: 'CGST (%)', value: '9' },
              { label: 'SGST (%)', value: '9' },
              { label: 'IGST (%)', value: '18' },
            ].map(f => (
              <div key={f.label}>
                <label className="text-xs font-medium block mb-1.5" style={{ color: 'var(--muted-foreground)' }}>{f.label}</label>
                <input defaultValue={f.value} type="number"
                  className="w-full px-3 py-2 text-sm rounded-lg border outline-none"
                  style={{ borderColor: 'var(--border)', background: 'var(--muted)' }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'payment' && (
        <div className="bg-white rounded-xl p-6 border space-y-4" style={{ borderColor: 'var(--border)' }}>
          <h3 className="font-semibold">Payment Methods</h3>
          {['Cash', 'UPI / QR Code', 'Credit / Debit Card', 'Net Banking', 'Insurance'].map(m => (
            <div key={m} className="flex items-center justify-between py-2 border-b" style={{ borderColor: 'var(--border)' }}>
              <span className="text-sm font-medium">{m}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-10 h-5 rounded-full peer-checked:bg-blue-600 bg-gray-300 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
              </label>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'security' && (
        <div className="bg-white rounded-xl p-6 border space-y-4" style={{ borderColor: 'var(--border)' }}>
          <h3 className="font-semibold">Security</h3>
          <div className="space-y-3">
            {[
              { label: 'Current Password', type: 'password' },
              { label: 'New Password', type: 'password' },
              { label: 'Confirm New Password', type: 'password' },
            ].map(f => (
              <div key={f.label}>
                <label className="text-xs font-medium block mb-1.5" style={{ color: 'var(--muted-foreground)' }}>{f.label}</label>
                <input type={f.type} placeholder="••••••••"
                  className="w-full px-3 py-2 text-sm rounded-lg border outline-none"
                  style={{ borderColor: 'var(--border)', background: 'var(--muted)' }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'billing' && (
        <div className="bg-white rounded-xl p-6 border space-y-4" style={{ borderColor: 'var(--border)' }}>
          <h3 className="font-semibold">Billing Settings</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Invoice Prefix', value: 'INV-' },
              { label: 'Starting Invoice #', value: '2001' },
              { label: 'Payment Due Days', value: '30' },
              { label: 'Default Currency', value: 'INR (₹)' },
            ].map(f => (
              <div key={f.label}>
                <label className="text-xs font-medium block mb-1.5" style={{ color: 'var(--muted-foreground)' }}>{f.label}</label>
                <input defaultValue={f.value}
                  className="w-full px-3 py-2 text-sm rounded-lg border outline-none"
                  style={{ borderColor: 'var(--border)', background: 'var(--muted)' }} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end gap-3">
        <button className="px-5 py-2.5 rounded-lg text-sm font-medium border" style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>
          Discard
        </button>
        <button className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all" style={{ background: saved ? '#10b981' : 'var(--primary)', color: 'white' }}
          onClick={save}>
          {saved ? '✓ Saved!' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
