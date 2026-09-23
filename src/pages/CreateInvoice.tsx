import { useState } from 'react';
import { type Page } from '../App';

interface CreateInvoiceProps {
  onNavigate: (page: Page) => void;
}

export default function CreateInvoice({ onNavigate }: CreateInvoiceProps) {
  const [patient, setPatient] = useState('Priya Sharma');
  const [doctor, setDoctor] = useState('Dr. Rajan Mehta');
  const [consultation, setConsultation] = useState(1500);
  const [lab, setLab] = useState(3200);
  const [medicine, setMedicine] = useState(2800);
  const [other, setOther] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(18);
  const [generated, setGenerated] = useState(false);

  const subtotal = consultation + lab + medicine + other;
  const discountAmt = (subtotal * discount) / 100;
  const taxAmt = ((subtotal - discountAmt) * tax) / 100;
  const total = subtotal - discountAmt + taxAmt;

  const invoiceId = `INV-${Math.floor(2009 + Math.random() * 100)}`;

  if (generated) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl p-8 border text-center" style={{ borderColor: 'var(--border)' }}>
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl mx-auto mb-4">✅</div>
          <h2 className="text-xl font-bold mb-1">Invoice Generated!</h2>
          <p className="text-sm mb-1" style={{ color: 'var(--muted-foreground)' }}>Invoice {invoiceId} has been created successfully.</p>
          <p className="text-2xl font-bold text-green-600 mb-6">₹{total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>

          <div className="bg-white border rounded-xl p-6 text-left mb-6" style={{ borderColor: 'var(--border)' }}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="font-bold text-lg">MedBill Pro</div>
                <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>City Health Clinic, Mumbai</div>
              </div>
              <div className="text-right">
                <div className="font-mono font-bold text-blue-700">{invoiceId}</div>
                <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{new Date().toLocaleDateString('en-IN')}</div>
              </div>
            </div>
            <div className="border-t pt-4 space-y-2 text-sm" style={{ borderColor: 'var(--border)' }}>
              <div className="flex justify-between"><span style={{ color: 'var(--muted-foreground)' }}>Patient</span><span className="font-medium">{patient}</span></div>
              <div className="flex justify-between"><span style={{ color: 'var(--muted-foreground)' }}>Doctor</span><span className="font-medium">{doctor}</span></div>
              <div className="flex justify-between"><span style={{ color: 'var(--muted-foreground)' }}>Consultation</span><span>₹{consultation.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between"><span style={{ color: 'var(--muted-foreground)' }}>Laboratory</span><span>₹{lab.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between"><span style={{ color: 'var(--muted-foreground)' }}>Medicine</span><span>₹{medicine.toLocaleString('en-IN')}</span></div>
              {other > 0 && <div className="flex justify-between"><span style={{ color: 'var(--muted-foreground)' }}>Other</span><span>₹{other.toLocaleString('en-IN')}</span></div>}
              {discount > 0 && <div className="flex justify-between text-red-600"><span>Discount ({discount}%)</span><span>-₹{discountAmt.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span></div>}
              <div className="flex justify-between"><span style={{ color: 'var(--muted-foreground)' }}>GST ({tax}%)</span><span>₹{taxAmt.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span></div>
              <div className="flex justify-between font-bold text-base pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                <span>Total</span><span>₹{total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <button className="px-5 py-2 rounded-lg text-sm font-medium border" style={{ borderColor: 'var(--border)' }}
              onClick={() => setGenerated(false)}>
              🖨️ Print
            </button>
            <button className="px-5 py-2 rounded-lg text-sm font-medium border" style={{ borderColor: 'var(--border)' }}
              onClick={() => setGenerated(false)}>
              ⬇️ Download PDF
            </button>
            <button className="px-5 py-2 rounded-lg text-sm font-semibold" style={{ background: 'var(--primary)', color: 'white' }}
              onClick={() => { setGenerated(false); onNavigate('invoices'); }}>
              View Invoices
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Patient details */}
        <div className="bg-white rounded-xl p-5 border" style={{ borderColor: 'var(--border)' }}>
          <h3 className="font-semibold text-sm mb-4">Patient & Doctor Details</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium block mb-1" style={{ color: 'var(--muted-foreground)' }}>Patient Name</label>
              <input value={patient} onChange={e => setPatient(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border outline-none"
                style={{ borderColor: 'var(--border)', background: 'var(--muted)' }} />
            </div>
            <div>
              <label className="text-xs font-medium block mb-1" style={{ color: 'var(--muted-foreground)' }}>Doctor Name</label>
              <select value={doctor} onChange={e => setDoctor(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border outline-none"
                style={{ borderColor: 'var(--border)', background: 'var(--muted)' }}>
                {['Dr. Rajan Mehta', 'Dr. Sunita Patel', 'Dr. Vivek Anand'].map(d => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium block mb-1" style={{ color: 'var(--muted-foreground)' }}>Date</label>
              <input type="date" defaultValue={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 text-sm rounded-lg border outline-none"
                style={{ borderColor: 'var(--border)', background: 'var(--muted)' }} />
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl p-5 border" style={{ borderColor: 'var(--border)' }}>
          <h3 className="font-semibold text-sm mb-4">Invoice Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span style={{ color: 'var(--muted-foreground)' }}>Consultation</span><span>₹{consultation.toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between"><span style={{ color: 'var(--muted-foreground)' }}>Laboratory</span><span>₹{lab.toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between"><span style={{ color: 'var(--muted-foreground)' }}>Medicine</span><span>₹{medicine.toLocaleString('en-IN')}</span></div>
            {other > 0 && <div className="flex justify-between"><span style={{ color: 'var(--muted-foreground)' }}>Other</span><span>₹{other.toLocaleString('en-IN')}</span></div>}
            <div className="flex justify-between text-xs pt-1 border-t" style={{ borderColor: 'var(--border)' }}>
              <span style={{ color: 'var(--muted-foreground)' }}>Subtotal</span><span className="font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-red-600 text-xs">
                <span>Discount ({discount}%)</span><span>-₹{discountAmt.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              </div>
            )}
            <div className="flex justify-between text-xs">
              <span style={{ color: 'var(--muted-foreground)' }}>GST ({tax}%)</span><span>₹{taxAmt.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="flex justify-between font-bold text-base pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
              <span>Total</span><span className="text-blue-700">₹{total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charges */}
      <div className="bg-white rounded-xl p-5 border" style={{ borderColor: 'var(--border)' }}>
        <h3 className="font-semibold text-sm mb-4">Charges Breakdown</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Consultation Fee (₹)', value: consultation, setter: setConsultation },
            { label: 'Laboratory Charges (₹)', value: lab, setter: setLab },
            { label: 'Medicine Charges (₹)', value: medicine, setter: setMedicine },
            { label: 'Other Services (₹)', value: other, setter: setOther },
            { label: 'Discount (%)', value: discount, setter: setDiscount },
            { label: 'GST (%)', value: tax, setter: setTax },
          ].map(f => (
            <div key={f.label}>
              <label className="text-xs font-medium block mb-1" style={{ color: 'var(--muted-foreground)' }}>{f.label}</label>
              <input
                type="number"
                value={f.value}
                onChange={e => f.setter(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-lg border outline-none"
                style={{ borderColor: 'var(--border)', background: 'var(--muted)' }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <button className="px-5 py-2.5 rounded-lg text-sm font-medium border" style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
          onClick={() => onNavigate('invoices')}>
          Cancel
        </button>
        <button className="px-5 py-2.5 rounded-lg text-sm font-semibold" style={{ background: 'var(--primary)', color: 'white' }}
          onClick={() => setGenerated(true)}>
          Generate Invoice →
        </button>
      </div>
    </div>
  );
}
